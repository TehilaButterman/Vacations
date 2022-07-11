import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotyfService";
import adminService from "../../../Services/AdminService";
import './AddVacation.css'
import { useState } from "react";


function AddVacation(): JSX.Element {

    const { handleSubmit, formState, register } = useForm<VacationModel>();

    const navigate = useNavigate();

    const [fromDate, setFromDate] = useState<string>();

    async function send(vacation: VacationModel): Promise<void> {

        await adminService.addVacation(vacation)
            .then(success => {
                notifyService.success('Vacation added');
                navigate('/admin-page')
            })
            .catch(err => notifyService.error(err))

    }
    return (
        <div className="wrapper">
            <div className="wrapper-header">
                <p>Add Vacation</p>
                <div className="addForm-wrapper">
                    <div className="addForm">
                        <form onSubmit={handleSubmit(send)}>
                            
                            <label>Description</label>
                            <span className="error">{formState.errors.description?.message}</span>
                            <textarea
                                className="text-input" {...register('description', {
                                    required: { value: true, message: "Missing  description", },
                                    minLength: { value: 10, message: 'Description is too short' },
                                    maxLength: { value: 1000, message: 'Description is too long' }
                                })} />

                            <label>Target</label>
                            <span className="error">{formState.errors.target?.message}</span>
                            <input type="text" {...register('target', {
                                required: { value: true, message: 'Missing target' }
                            })} />

                            <label className="label-input">From Date</label>
                            <span className="error">{formState.errors.fromDate?.message}</span>
                            <input type="date" className="text-input" placeholder="From date"  {...register('fromDate', {
                                required: { value: true, message: "Missing start date" },
                                min: { value: new Date().toISOString(), message: "Start date cant be before today" }
                            })} onBlur={e => { setFromDate(e.currentTarget.value) }} />4

                            <label className="label-input">To Date</label>
                            <span className="error">{formState.errors.toDate?.message}</span>
                            <input type="date" className="text-input" placeholder="to date"  {...register('toDate', {
                                required: { value: true, message: "Missing end date" },
                                min: { value: fromDate, message: "Vacation cant end before it has begun" }
                            })} />

                            <label className="label-input">Price</label>
                            <span className="error">{formState.errors.price?.message}</span>
                            <input type="number" className="text-input" placeholder="price" {...register('price', {
                                required: { value: true, message: 'Missing price' },
                                min: { value: 1, message: 'Price must be positive' },
                                max: { value: 1000000, message: 'Price limited to 1,000,000 ILS' }
                            })} />

                            <label className="label-input">Image</label>
                            <span className="error">{formState.errors.image?.message}</span>
                            <input type="file" className="text-input" placeholder="Image" {...register('image', {
                                required: { value: true, message: 'Missing image' }
                            })} />

                            <button>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddVacation;
