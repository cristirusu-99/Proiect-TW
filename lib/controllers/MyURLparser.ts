import { IncomingMessage, ServerResponse } from 'http'
import { raw } from 'body-parser';


export class MyURLparser {
    private getParam(params: string) {
        var raspuns: string;
        var values: { [key: string]: string } = {};
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

    public getInput(req: IncomingMessage) {
        const parametrii = req.url.split("?")[1];
        if (parametrii === undefined) return { _ID: 'obiectGol' };
        return this.getParam(parametrii);
    }

}