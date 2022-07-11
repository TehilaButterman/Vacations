class ModalService {

    public openModal(): boolean {
        return true;
    }

    public closeModal(): boolean {
        return false;
    }

}
const modalService = new ModalService();
export default modalService;