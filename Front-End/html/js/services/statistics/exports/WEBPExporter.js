


function exportToWebp(doc) {
    var canvas = document.getElementById(doc);
    var webp = canvas.toDataURL("image/webp");
    var a = document.createElement('a');
    a.href = webp;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}





export { exportToWebp }