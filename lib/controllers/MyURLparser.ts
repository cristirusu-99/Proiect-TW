import { IncomingMessage, ServerResponse } from 'http'
import { raw } from 'body-parser';


export class MyURLparser {

    static readonly id_name = "_id";
    static readonly query_start = "&";
    static readonly query_eql = "=";
    static readonly order_by = "ORDER_BY_";
    static readonly field_name = "FIELD_";

    private dummyName(name: string): Number {
        if (name.startsWith(MyURLparser.order_by)) {
            return 1;
        }
        if (name.startsWith(MyURLparser.field_name)) {
            return 2;
        }
        return 0;
    }

    private getParam(params: string) {
        let raspuns: string;
        let values: { [key: string]: {} } = {};
        let orderBy: { [key: string]: {} } = {};
        let fields: { [key: string]: {} } = {};
        params.split("&").forEach(parametru => {
            if (parametru.includes("=")) {
                const parametrii = parametru.split("=");
                let camp = parametrii[0];
                let valoare = parametrii[1];

                if (!camp.match(MyURLparser.id_name)) {
                    camp = camp.toUpperCase();
                }

                switch (this.dummyName(camp)) {
                    case 0:
                        values[camp] = valoare.replace(/%20/g, " ").toUpperCase();
                        break;
                    case 1:
                        orderBy[camp.split(MyURLparser.order_by)[1]] = parseInt(valoare);
                        break;
                    case 2:
                        fields[camp.split(MyURLparser.field_name)[1]] = parseInt(valoare);
                        break;
                }
            }
        });
        return [values, fields, orderBy];
    }

    public getInput(req: IncomingMessage) {
        const parametrii = req.url.split("?")[1];
        if (parametrii.includes("$")) {
            return { _ID: 'obiectGol' };
        }
        if (parametrii === undefined) return { _ID: 'obiectGol' };
        return this.getParam(parametrii);
    }

}