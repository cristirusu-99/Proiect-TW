


export function allReady(event) {

    const data = event.target.id.split("button_svg_")[1].split("_");
    const id = data[1] + "_" + data[0];
    let e = document.getElementById(id);
    console.log(id);
    let text = e.getElementsByTagName('svg')[0].outerHTML;



    text = text.replace(">", ` version="1.1" xmlns="http://www.w3.org/2000/svg" >`);
    var filename = "export.svg";

    var blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}


document.getElementById("button_svg_totalMasini_barchart").addEventListener("click", allReady);