import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import Item from '../Cards/Cards'

function VacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(() => {
        vacationService.fetchAllVacations()
        setVacations(store.getState().vacationsState.allVacationsState)
        const unsubscribe = store.subscribe(() => {
            const dup = [...store.getState().vacationsState.allVacationsState]
            setVacations(dup)
            console.log(dup);
        })
        return () => {
            unsubscribe();
        }
    }, [])
    return (

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>

            {
                vacations.map(v => <Item key={v.vacationId}><VacationCard key={v.vacationId}
                    vacation={v} /></Item>)
            }
        </Box>

    );
}

export default VacationList;
