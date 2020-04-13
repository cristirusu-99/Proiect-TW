"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyRouter {
    static get(path, functie) {
        this.mapGet[path] = functie;
    }
    static post(path, functie) {
        this.mapPost[path] = functie;
    }
    static put(path, functie) {
        this.mapPut[path] = functie;
    }
    static delete(path, functie) {
        this.mapDelete[path] = functie;
    }
    static route(request, response) {
        switch (request.method) {
            default:
                {
                    response.end("Eroare");
                    response.writeHead(404, "Eroare");
                }
                break;
            case "GET":
                {
                    this.check(this.mapGet, request, response);
                }
                break;
            case "POST":
                {
                    this.check(this.mapPost, request, response);
                }
                break;
            case "PUT":
                {
                    this.check(this.mapPut, request, response);
                }
                break;
            case "DELETE":
                {
                    this.check(this.mapDelete, request, response);
                }
                break;
        }
    }
    static check(map, request, response) {
        let path = request.url.split("?");
        console.log(path);
        if (map[path[0]] == undefined) {
            console.log('file not found: ' + request.url);
            response.writeHead(404, "Not Found");
            response.end();
        }
        else {
            map[path[0]](request, response);
        }
    }
}
exports.MyRouter = MyRouter;
MyRouter.mapGet = {};
MyRouter.mapPost = {};
MyRouter.mapPut = {};
MyRouter.mapDelete = {};
//# sourceMappingURL=router.js.map