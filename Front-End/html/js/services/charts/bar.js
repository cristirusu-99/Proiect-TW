google.charts.load('current', { packages: ['corechart', 'bar'] });
import * as CONSTANTS from "../../constants/constants.js";

const CARS_API = CONSTANTS.API.CARS_API;
const kw = CONSTANTS.URL_KEY_WORDS;


export function barCount(input, containerId) {
    var materialOptions = {
        chart: {
            title: 'Numarul total de masini din judetele',
        },
        bars: 'vertical',
        legend: { position: "none" },
        with: '100%',
        height: '100%'
    };

    function getCountByJudet(list) {
        let res = [];
        list.forEach(judet => {
            res.push(
                fetch(CARS_API + "count?judet=" + judet).then(res => res.json())
            );
        });
        return Promise.all(res);
    }

    getCountByJudet(input).then(v => {
        let barValues = [];
        let name = ['Judet', "Numar masini"];
        let values = [];
        barValues.push(name);
        for (var i = 0; i < input.length; i++) {
            barValues.push(Array(input[i], v[i]));
        }
        var data = google.visualization.arrayToDataTable(barValues);

        var materialChart = new google.charts.Bar(document.getElementById(containerId));
        materialChart.draw(data, materialOptions);;
    });
}

export function getMarciByJudete(listaCuJudeteSelectate, listaCuMarciSelectate, containerId) {
    var materialOptions = {
        'chartType': 'ColumnChart',
        chart: {
            title: 'Numarul total de masini din judetele',
        },
        bars: 'vertical',
        legend: { position: "none" }

    };
    function callForData(marci) {
        let res = [];
        listaCuJudeteSelectate.forEach(judet => {
            let local = [judet];
            marci.forEach(marca => {
                local.push(
                    fetch(CARS_API + "count?marca=" + marca + "&judet=" + judet).then(res => res.json()).then(values => {
                        return values;
                    })
                );
            })
            res.push(Promise.all(local));
        });
        return Promise.all(res);
    }

    callForData(listaCuMarciSelectate).then(res => {
        var barData = [];
        var nume = ["judet"];
        listaCuMarciSelectate.forEach(a => nume.push(a));
        barData.push(nume);
        let i = 0;
        res.forEach(raspuns => {
            barData.push(raspuns);
        })
        console.log(barData);
        var data = google.visualization.arrayToDataTable(barData);

        var materialChart = new google.charts.Bar(document.getElementById(containerId));
        materialChart.draw(data, materialOptions);;

    });
}
