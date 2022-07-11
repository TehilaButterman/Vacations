import FollowModel from "../Models/FollowModel";
import GraphModel from "../Models/GraphModel";
import { VacationModel } from "../Models/VacationModel";

export class VacationState {
    public allVacationsState: VacationModel[] = [];
    public followedVacations: number[] = [];
    public reportState: GraphModel[] = []
};

export enum VacationsActionType {
    FetchAllVacations = "FetchAllVacations",
    FetchReports = "FetchReports",
    FollowVacation = "FollowVacation",
    UnFollowVacation = "UnFollowVacation",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    InitState = "InitState"
};

export interface VacationAction {
    type: VacationsActionType;
    payload?: any;
}

export function FetchAllVacations(vacations: VacationModel[]): VacationAction {
    const action: VacationAction = {
        type: VacationsActionType.FetchAllVacations,
        payload: vacations
    }
    return action
};

export function AddAction(vacation: VacationModel): VacationAction {
    const action = { type: VacationsActionType.AddVacation, payload: vacation }
    return action;

}

export function UpdateAction(vacation: VacationModel): VacationAction {
    const action = { type: VacationsActionType.UpdateVacation, payload: vacation }
    return action;

}

export function DeleteAction(id: number): VacationAction {
    const action = { type: VacationsActionType.DeleteVacation, payload: id }
    return action;

}

export function FollowVacation(vacationId: number): VacationAction {
    const action: VacationAction = {
        type: VacationsActionType.FollowVacation,
        payload: vacationId
    }
    return action
};

export function UnFollowVacation(indexToDelete: number): VacationAction {
    const action: VacationAction = {
        type: VacationsActionType.UnFollowVacation,
        payload: indexToDelete
    }
    return action
};

export function FetchReports(graphData: GraphModel[]): VacationAction {
    const action = {
        type: VacationsActionType.FetchReports,
        payload: graphData
    }
    return action;
}

export function InitState(): VacationAction {
    const action = {
        type: VacationsActionType.InitState
    }
    return action;
}

export function vacationReducer(currentState: VacationState = new VacationState(), action: VacationAction): VacationState {
    const newState = { ...currentState };
    switch (action.type) {
        case VacationsActionType.FetchAllVacations:
            newState.allVacationsState = action.payload;
            break;
        case VacationsActionType.AddVacation:
            newState.allVacationsState.push(action.payload);
            break;
        case VacationsActionType.UpdateVacation:
            const index = newState.allVacationsState.findIndex(v => v.vacationId === +action.payload.vacationId)
            newState.allVacationsState[index] = action.payload;
            break;
        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.allVacationsState.findIndex(v => v.vacationId === action.payload.vacationId)
            newState.allVacationsState.splice(indexToDelete, 1);
            break;
        case VacationsActionType.UnFollowVacation:
            newState.followedVacations.splice(action.payload, 1)
            break;
        case VacationsActionType.FollowVacation:
            newState.followedVacations.push(action.payload)
            break;
        case VacationsActionType.FetchReports:
            newState.reportState = action.payload
            break;
        case VacationsActionType.InitState:
            newState.allVacationsState = [];
            newState.followedVacations = [];
            newState.reportState = [];
            break;
    }
    return newState;
}


