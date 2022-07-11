import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import vacationService from "../../../Services/VacationService";
import "./AdminHomePage.css";
import Item from '../../VacationArea/Cards/Cards'
import AdminCard from "../AdminCard/AdminCard";
import adminService from "../../../Services/AdminService";
import { NavLink } from "react-router-dom";
import { usePagination } from "react-use-pagination";


function AdminHomePage(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])
    const { startIndex, endIndex } = usePagination({ totalItems: vacations.length, initialPageSize: 9 });
    useEffect(() => {
        adminService.fetchReport();
        setVacations(store.getState().vacationsState.allVacationsState)
        if (vacations.length === 0) {
            vacationService.fetchAllVacations()
                .then(vacationsFromDB => setVacations(vacationsFromDB))
        }
        const unsubscribe = store.subscribe(() => {
            const dup = [...store.getState().vacationsState.allVacationsState]
            setVacations(dup)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="Admin">
            <div className="admin-link">
                <NavLink to="/admin-page/add-vacation">Add Vacation</NavLink>
                <NavLink to="/admin-page/live-reports">View live reports</NavLink>
            </div>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {
                    vacations.map(v => <Item key={v.vacationId}><AdminCard key={v.vacationId} vacation={v} /></Item>)
                }
            </Box>

        </div>
    );
}

export default AdminHomePage;
/*
const { startIndex, endIndex } = usePagination({ totalItems: data.length, initialPageSize: 1 });

return (
    <ul>
        {data.slice(startIndex, endIndex).map((item) => (
            <li>{item}</li>
        ))}
    </ul>
);

*/