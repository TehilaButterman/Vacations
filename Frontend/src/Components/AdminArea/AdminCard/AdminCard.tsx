import VacationCard from "../../VacationArea/VacationCard/VacationCard";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from "../EditModal/EditModal";
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { VacationModel } from '../../../Models/VacationModel';
import DeleteModal from "../DeleteModal/DeleteModal";
import store from "../../../Redux/Store";
import { Box, IconButton } from "@mui/material";

interface VacationDetailsProps {
    vacation: VacationModel
}

function AdminCard({ vacation }: VacationDetailsProps): JSX.Element {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const styleIcon = { width: "50px", height: "50px", marginLeft: "25%", marginButton: "20px" };
    const styleModal = {
        content: {
            width: "580px",
            marginLeft: "35%"
        }
    }
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setEditModal(store.getState().modalState.editModal)
            setDeleteModal(store.getState().modalState.deleteModal)
        })
        return (() => {
            unsubscribe()
        })
    }, [])
    return (
        <div className="AdminCard">
            <IconButton style={styleIcon} onClick={() => setEditModal(true)}>
                <EditIcon />
            </IconButton>
            <IconButton style={styleIcon} onClick={() => setDeleteModal(true)}>
                <DeleteIcon />
            </IconButton>
            <VacationCard vacation={vacation} />
            <Modal sx={styleModal} open={editModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <EditModal vacation={vacation} />
                </Box>
            </Modal>
            <Modal sx={styleModal} open={deleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box>
                    <DeleteModal vacation={vacation} />
                </Box>
            </Modal>
        </div>
    );
}

export default AdminCard;
