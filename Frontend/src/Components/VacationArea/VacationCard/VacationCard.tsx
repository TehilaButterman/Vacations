import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import config from '../../../Utils/Config';
import { VacationModel } from '../../../Models/VacationModel';
import store from '../../../Redux/Store';
import vacationService from '../../../Services/VacationService'
import FollowModel from '../../../Models/FollowModel';
import notifyService from '../../../Services/NotyfService';
import { useState } from 'react';


interface VacationDetailsProps {
    vacation: VacationModel
};

function VacationCard({ vacation }: VacationDetailsProps) {

    async function follow_unFollow() {
        try {

            const follow: FollowModel = {
                userId: store.getState().authState.user.userId,
                vacationId: vacation.vacationId
            };

            await vacationService.followVacation(follow);

        }
        catch (err: any) {

            notifyService.error(err);

        }

    }
    const [follow, setFollow] = useState<string>(vacation.follow ? 'red' : 'grey');

    return (
        <div className="card" id="vacation_card">
            <div className="image">
                <img src={config.vacationImageUrl + vacation.imageName} />
            </div>
            <p>
                <>
                    {store.getState().authState.user.role === "User" &&
                        <>
                            <IconButton sx={{ display: "inline-start", width: "50px", height: "50px" }}
                                onClick={() => {
                                    follow_unFollow();
                                    setFollow(follow === 'grey' ? 'red' : 'grey')
                                }}>
                                <FavoriteIcon style={{ color: follow, fontSize: "30px" }} />
                            </IconButton>
                            <br />
                        </>
                    }

                    <b>Target: </b> {vacation.target}<br />
                    <b>About: </b> {vacation.description}<br />
                    <b>Dates: </b>  {new Date(vacation.fromDate).toLocaleDateString()} - {new Date(vacation.toDate).toLocaleDateString()}<br />
                    <b>Price: </b> {vacation.price} ILS<br />
                    {vacation.allFollowers > 1 &&
                        <b><span>{vacation.allFollowers} people follow this vacation.</span></b>
                    }
                    {
                        vacation.allFollowers <= 1 &&
                        <b><span>{vacation.allFollowers} person follow this vacation.</span></b>
                    }
                </>
            </p>
        </div >

    );
}
export default VacationCard;