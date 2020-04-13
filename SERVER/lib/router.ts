import { IncomingMessage, ServerResponse } from 'http'

export class MyRouter {

    private static mapGet: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};
    private static mapPost: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};
    private static mapPut: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};
    private static mapDelete: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};


    public static get(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapGet[path] = functie;
    }

    public static post(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapPost[path] = functie;
    }

    public static put(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapPut[path] = functie;
    }

    public static delete(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapDelete[path] = functie;
    }


    public static route(request: IncomingMessage, response: ServerResponse): void {

        switch (request.method) {
            default: { response.end("Eroare"); response.writeHead(404, "Eroare"); } break;
            case "GET": { this.check(this.mapGet, request, response); } break;
            case "POST": { this.check(this.mapPost, request, response); } break;
            case "PUT": { this.check(this.mapPut, request, response); } break;
            case "DELETE": { this.check(this.mapDelete, request, response); } break;
        }
    }

    public static check(map: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } }, request: IncomingMessage, response: ServerResponse): void {
        let path = request.url.split("?");
        console.log(path);
        if (map[path[0]] == undefined) {
            console.log('file not found: ' + request.url);
            response.writeHead(404, "Not Found");
            response.end();
        } else {
            map[path[0]](request, response);
        }
    }


}



