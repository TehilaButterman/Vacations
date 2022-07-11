export class ModalState {
    public editModal: boolean = false;
    public deleteModal: boolean = false;
}

export enum ModalActionType {
    SetEditModal = "SetEditModal",
    SetDeleteModal = "SetDeleteModal",
};

export interface ModalAction {
    type: ModalActionType,
    payload: boolean;
};


export function SetEditModal(set: boolean): ModalAction {
    const action: ModalAction = {
        type: ModalActionType.SetDeleteModal,
        payload: set
    };
    return action;
};

export function SetDeleteModal(set: boolean): ModalAction {
    const action: ModalAction = {
        type: ModalActionType.SetDeleteModal,
        payload: set
    };
    return action;
};

export function modalReducer(currentState: ModalState = new ModalState(), action: ModalAction): ModalState {
    const newState = { ...currentState };
    switch (action.type) {
        case ModalActionType.SetDeleteModal:
            newState.deleteModal = action.payload;
            break;
        case ModalActionType.SetEditModal:
            newState.editModal = action.payload;
            break;
    };
    return newState;
}