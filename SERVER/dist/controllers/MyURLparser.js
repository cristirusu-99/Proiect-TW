"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyURLparser {
    getParam(params) {
        var raspuns;
        var values = {};
        params.split("&").forEach(parametru => {
            if (parametru.includes("=")) {
                var valori = parametru.split("=");
                if (!valori[0].match("_id")) {
                    valori[0] = valori[0].toUpperCase();
                }
                values[valori[0]] = valori[1].replace(/%20/g, " ").toUpperCase();
            }
        });
        return values;
    }
    getInput(req) {
        const parametrii = req.url.split("?")[1];
        if (parametrii === undefined)
            return { _ID: 'obiectGol' };
        return this.getParam(parametrii);
    }
}
exports.MyURLparser = MyURLparser;
//# sourceMappingURL=MyURLparser.js.map