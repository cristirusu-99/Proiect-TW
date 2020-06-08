import {IncomingMessage} from 'http'


export class MyURLparser {              //clasa ce implemeteaza functionalitati pentru parsarea de URL-uri

    static readonly id_name = "_id";
    static readonly query_start = "&";
    static readonly query_eql = "=";
    static readonly order_by = "ORDER_BY_";
    static readonly field_name = "FIELD_";

    private static isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    private static getCommandCode(name: string): Number {
        if (name.startsWith(MyURLparser.order_by)) {
            return 1;
        }
        if (name.startsWith(MyURLparser.field_name)) {
            return 2;
        }
        return 0;
    }
                                                //functie ce determina parametrii dintr-un URL
    private getParam(params: string) {
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

                switch (MyURLparser.getCommandCode(camp)) {
                    case 0:
                        if (camp == "AN" || camp == "TOTALVEHICULE")
                            values[camp] = Number.parseInt(valoare.replace(/%20/g, " ").toUpperCase());
                        else
                            values[camp] = valoare.replace(/%20/g, " ").toUpperCase();
                        break;
                    case 1:
                        orderBy[camp.split(MyURLparser.order_by)[1]] = parseInt(valoare);
                        break;
                    case 2:
                        if (valoare == undefined)
                            fields[camp.split(MyURLparser.field_name)[1]] = 1;
                        else
                            fields[camp.split(MyURLparser.field_name)[1]] = parseInt(valoare);

                        break;
                }
            }
        });
        return [values, fields, orderBy];
    }
                                                //functie ce returneaza detaliile query-ului pentru BD dintr-un URL
    public getInput(req: IncomingMessage) {
        const parametrii = req.url.split("?")[1];
        if (parametrii === undefined) return [{nu_fa_nimic: "adevarat"}, {}, {}];
        let rezult = this.getParam(parametrii);
        if (MyURLparser.isEmpty(rezult[0]))
            rezult[0] = {nu_fa_nimic: "adevarat"};
        return rezult;
    }

}

