import "./DeleteModal.css";
import Typography from '@mui/material/Typography';
import adminService from "../../../Services/AdminService";
import notifyService from "../../../Services/NotyfService";
import { VacationModel } from '../../../Models/VacationModel'
import { useNavigate } from "react-router-dom";
import { SetDeleteModal } from "../../../Redux/ModalState";
import store from "../../../Redux/Store";

interface VacationProps {
    vacation: VacationModel
};

function DeleteModal({ vacation }: VacationProps): JSX.Element {
    const navigate = useNavigate();
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        fontSize: "35px",
        color: "black",
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
    async function deleteVac() {
        console.log(vacation);
        await adminService.deleteVacation(vacation.vacationId)
            .then(success => {
                notifyService.success('Vacation deleted successfully!');
                store.dispatch(SetDeleteModal(false))
                navigate('/admin-page')
            })
    }
    return (
        <>
            <Typography sx={style} className="DeleteVacation">
                Are you sure you want to delete this vacation?
                Vacation to: {vacation.target}
                <button className="btnModal" onClick={deleteVac}>Delete</button>
                <button className="btnModal" onClick={() => store.dispatch(SetDeleteModal(false))}>Cancel</button>

            </Typography>
        </>
    );
}

export default DeleteModal;
