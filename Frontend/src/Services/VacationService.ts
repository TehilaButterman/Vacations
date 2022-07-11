import axios from "axios";
import FollowModel from "../Models/FollowModel";
import { VacationModel } from "../Models/VacationModel";
import store from "../Redux/Store";
import { FetchAllVacations, FollowVacation, UnFollowVacation } from "../Redux/VacationState";
import config from "../Utils/Config";

class VacationService {

    public async fetchAllVacations() {
        // get vacation from state - if user is login already
        let allVacations = store.getState().vacationsState.allVacationsState;
        console.log(allVacations);

        if (allVacations.length === 0) { // user is not login yet - fetch vacations from DB
            const response = await axios.get<VacationModel[]>(config.vacationsUrl);
            allVacations = response.data;
            store.dispatch(FetchAllVacations(allVacations));

            // dispatch followed vacations state
            allVacations.forEach(v => {
                v.follow === 1 && store.dispatch(FollowVacation(v.vacationId));
            })
        }

        return allVacations;
    };

    public async followVacation(followVacation: FollowModel): Promise<number> {

        // check if user follow this vacation:
        const followState = store.getState().vacationsState.followedVacations;
        const index = followState.findIndex(id => id === followVacation.vacationId);

        if (index !== -1) { // user doesn't follow this vacation --> follow

            store.dispatch(UnFollowVacation(index));
            await axios.delete(config.vacationsUrl, { data: followVacation });

        } else {   //  user follow this vacation already --> unFollow

            store.dispatch(FollowVacation(followVacation.vacationId));
            await axios.post(config.vacationsUrl, followVacation);

        }
        return index;
    }

}
const vacationService = new VacationService();
export default vacationService;