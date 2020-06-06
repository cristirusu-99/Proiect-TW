

google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawDualX);

import * as CONSTANTS from "../../constants/constants.js";
import { List_judete as lJudete } from "../../constants/judete.js";

const CARS_API = CONSTANTS.API.CARS_API;
const kw = CONSTANTS.URL_KEY_WORDS;
var materialOptions = {
    chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
    width: 400,
    height: 400,
};

async function barCount(input) {
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
        let name = ['judet', "nr masini"];
        let values = [];
        barValues.push(name);
        for (var i = 0; i < input.length; i++) {
            barValues.push(Array(input[i], v[i]));
        }
        var data = google.visualization.arrayToDataTable(barValues);

        var materialChart = new google.charts.Bar(document.getElementById('chart_div'));
        materialChart.draw(data, materialOptions);;
    });
}

async function getMarciByJudete() {
    function com(marci) {
        let res = [];
        ["Galati", "Alba", "Iasi", "Bucuresti"].forEach(judet => {
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

    com(input2).then(res => {
        var barData = [];
        var nume = ["judet"];
        input2.forEach(a => nume.push(a));
        barData.push(nume);
        let i = 0;
        res.forEach(raspuns => {
            barData.push(raspuns);
        })
        console.log(barData);
        var data = google.visualization.arrayToDataTable(barData);

        var materialChart = new google.charts.Bar(document.getElementById('chart_div'));
        materialChart.draw(data, materialOptions);;

    });
}

const input = ["galati", "braila", "botosani", "bucuresti", "cluj"];
const input2 = ["dacia", "audi", "bmw", "opel"];

function drawDualX() {
    barCount(input);
    //getMarciByJudete();
}


