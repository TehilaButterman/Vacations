class ClientError {
    public status: number;
    public message: string;

    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    };

}

export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(400, message)
    }
}
export class UnAuthorizedError extends ClientError {
    public constructor(message: string) {
        super(401, message)
    }
}

export class RouteNotFound extends ClientError {
    public constructor(method: string, url: string) {
        super(404, `Route ${url} in method ${method} is not exist`)
    }
}