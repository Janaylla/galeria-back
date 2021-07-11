export class UnauthorizedError extends Error {
    public code: number;
    constructor() {
        super("Unauthorized user");
        this.code = 401;
    }
}