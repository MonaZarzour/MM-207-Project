export function EnsureValid(responseValue, res, errMessage, code = 400){
    if(!responseValue)
        return res.status(code).json(new ErrorResponse(errMessage));
}



export class ErrorResponse {
    constructor(message) {
        this.message = message; // use lowercase (JS convention)
    }
}


