//clasa folosita pentru retinerea codurilor HTTP intr-un format usor de folosit

export class HttpCodes {
    //200
    public static readonly HttpStatus_OK = 200;
    public static readonly HttpStatus_Created = 201;
    public static readonly HttpStatus_NoContent = 204;
    //300

    //400
    public static readonly HttpStatus_BadRequest = 400;
    public static readonly HttpStatus_Forbidden = 403
    public static readonly HttpStatus_NotFound = 404;
    //500
   public static readonly HttpStatus_InternalServerError = 500;
}