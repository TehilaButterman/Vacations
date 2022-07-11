import "./EditModal.css";
import { VacationModel } from "../../../Models/VacationModel";
import { useForm } from "react-hook-form";
import adminService from "../../../Services/AdminService";
import notifyService from "../../../Services/NotyfService";
import { useNavigate } from "react-router-dom";
import config from "../../../Utils/Config";
import store from "../../../Redux/Store";
import { SetEditModal } from "../../../Redux/ModalState";
import { useState } from "react";


interface UpdateVacationProps {
    vacation: VacationModel;
};

function EditModal({ vacation }: UpdateVacationProps): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    const navigate = useNavigate();

    const [fromDate, setFromDate] = useState<string>();

    async function update(updatedVacation: VacationModel) {

        updatedVacation.vacationId = vacation.vacationId;
        console.log(updatedVacation.vacationId);

        if (updatedVacation.image.item(0) === null) {
            delete updatedVacation.image
            updatedVacation.imageName = vacation.imageName;
        }

        await adminService.updateVacation(updatedVacation)
            .then(success => {
                notifyService.success('vacation updated successfully!');
                store.dispatch(SetEditModal(false));
                navigate('/admin-page');
            })
            .catch(err => notifyService.error(err));

    }

    return (
        <form className="editForm" onSubmit={handleSubmit(update)}>
            <h2>Edit vacation</h2>
            <label>Description:</label>
            <span>{formState.errors.description?.message}</span>
            <textarea defaultValue={vacation.description}
                {...register('description', {
                    required: { value: true, message: "Missing description" },
                    maxLength: { value: 300, message: "Description is too long" },
                })} />
            <label>Target:</label>
            <span>{formState.errors.target?.message}</span>
            <input defaultValue={vacation.target} type="text"
                {...register('target', {
                    required: { value: true, message: "Missing target" },
                    minLength: { value: 2, message: "Target is too short" },
                    maxLength: { value: 30, message: "Target is too long" }
                })} />

            <label>From date:</label>
            <span>{formState.errors.fromDate?.message}</span>
            <input type="date"
                defaultValue={vacation.fromDate.slice(0, 10)}
                {...register('fromDate', {
                    required: { value: true, message: "Missing start date" },
                    min: { value: new Date().toISOString(), message: "Start date cant be before today" }
                })} onBlur={e => { setFromDate(e.currentTarget.value) }} />
            <label>To date:</label>
            <span>{formState.errors.toDate?.message}</span>
            <input type="date"
                defaultValue={vacation.toDate.slice(0, 10)}
                {...register('toDate', {
                    required: { value: true, message: "Missing end date" },
                    min: { value: fromDate, message: "Vacation cant end before it has been started" }
                })} />
            <label>Price:</label>
            <span>{formState.errors.price?.message}</span>
            <input type="number" defaultValue={vacation.price}
                {...register('price', {
                    required: { value: true, message: "Missing price" },
                    max: { value: 1000000, message: "Price must be 1-1000000" }
                })} />
            <img src={config.vacationImageUrl + vacation.imageName} />
            <label>Set image - optional:</label>
            <input type="file" {...register('image')} />
            <button className="update">Edit</button>
            <button className="update" onClick={() => store.dispatch(SetEditModal(false))}>Cancel</button>
        </form>
    );
}

export default EditModal;

