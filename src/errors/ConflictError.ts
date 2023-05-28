import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
    constructor(
        message: string = "Conflito. Tentativa de criar um registro já existente."
    ) {
        super(409, message)
    }
}