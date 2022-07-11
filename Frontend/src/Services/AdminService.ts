import { VacationModel } from "../Models/VacationModel";
import axios from 'axios';
import config from '../Utils/Config';
import store from '../Redux/Store';
import { AddAction, DeleteAction, FetchReports, UpdateAction } from '../Redux/VacationState';
import GraphModel from "../Models/GraphModel";

class AdminService {

    public async addVacation(vacation: VacationModel) {
        // set form data to server
        const vacationForm = new FormData();
        vacationForm.append('description', vacation.description);
        vacationForm.append('target', vacation.target);
        vacationForm.append('price', vacation.price.toString());
        vacationForm.append('fromDate', vacation.fromDate.toString());
        vacationForm.append('toDate', vacation.toDate.toString());
        vacationForm.append('image', vacation.image.item(0));
        const response = await axios.post<VacationModel>(config.addVacationUrl, vacationForm);
        const addedVacation = response.data;

        store.dispatch(AddAction(addedVacation));

    };

    public async updateVacation(vacation: VacationModel) {

        const vacationForm = new FormData();
        vacationForm.append('vacationId', vacation.vacationId.toString());
        vacationForm.append('description', vacation.description);
        vacationForm.append('target', vacation.target);
        vacationForm.append('price', vacation.price.toString());
        vacationForm.append('fromDate', vacation.fromDate.toString());
        vacationForm.append('toDate', vacation.toDate.toString());
        vacation.image ? vacationForm.append('image', vacation.image.item(0)) :
            vacationForm.append('imageName', vacation.imageName);
        const response = await axios.put<VacationModel>(config.adminUrl, vacationForm);
        const vacationUpdated = response.data;

        store.dispatch(UpdateAction(vacationUpdated));

    };

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete<number>(`${config.adminUrl}/${id}`);
        store.dispatch(DeleteAction(id));
    };

    public async fetchReport() {
        const vacationsStatus = await axios.get<GraphModel[]>(config.liveReportUrl);
        const liveReportObj = vacationsStatus.data;
        store.dispatch(FetchReports(liveReportObj));
    };


}

const adminService = new AdminService();
export default adminService;