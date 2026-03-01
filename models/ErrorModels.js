export class ValidationError{
    constructor(message) {}
}

export class AuthenticationError{
    constructor(email, message) {
        this.message = message; this.email = email;
    }
}