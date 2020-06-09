
// var buttonWEBP = document.getElementById('export-webp');

// buttonWEBP.onclick = function (){
//     exportToWebp("result.webp");
   
// }
export function exportToWebp(filename) {

    var canvas = document.getElementById("");
    var webp = canvas.toDataURL("image/webp");
   var a = document.createElement('a');
    a.href = webp;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
