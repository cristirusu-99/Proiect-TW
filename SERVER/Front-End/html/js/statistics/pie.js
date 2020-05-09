
var drawPieChart = function(data, colors) {
 
};

var calculatePercent = function(value, total) {
  
  return (value / total * 100).toFixed(2);
};

var getTotal = function(data) {
  var sum = 0;
  for(var i=0; i<data.length; i++) {
    sum += data[i].value;
  }
      
  return sum;
};

var calculateStart = function(data, index, total) {
  if(index === 0) {
    return 0;
  }
  
  return calculateEnd(data, index-1, total);
};

var calculateEndAngle = function(data, index, total) {
  var angle = data[index].value / total * 360;
  var inc = ( index === 0 ) ? 0 : calculateEndAngle(data, index-1, total);
  
  return ( angle + inc );
};

var calculateEnd = function(data, index, total) {
  
  return degreeToRadians(calculateEndAngle(data, index, total));
};

var degreeToRadians = function(angle) {
  return angle * Math.PI / 180
}

var data = [
  { label: 'Mercedes', value: 1023 },
  { label: 'Bmw', value: 1220 },
  { label: 'Audi', value: 8220 },
  { label: 'Honda', value: 1204},
  { label: 'Honda', value: 1204},
  { label: 'Honda', value: 1204},
  { label: 'Honda', value: 1204}

];
var colors = [ 'red', 'white', 'pink', 'aqua','green','black','gray' ];

var pieChart  = function(data,colors,id){
  this.data= data;
  this.colors = colors;
  this.canvas = document.getElementById(id);
  var ctx = this.canvas.getContext('2d');
  var x = this.canvas.width / 2;
      y = this.canvas.height / 2;
  var color,
      startAngle,
      endAngle,
      total = getTotal(data);
  

  this.drawPieChart = function(){
    for(var i=0; i<this.data.length; i++) {
      color =this.colors[i];
      startAngle = calculateStart(this.data, i, total);
      endAngle = calculateEnd(this.data, i, total);
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.moveTo(x, y);
      ctx.arc(x, y, y-100, startAngle, endAngle);
      ctx.fill();
      ctx.rect(this.canvas.width - 200, y - i * 30, 12, 12);
      ctx.fill();
      ctx.font = "13px sans-serif";
      ctx.fillText(this.data[i].label + " - " + this.data[i].value + " (" + calculatePercent(this.data[i].value, total) + "%)", this.canvas.width - 200 + 20, y - i * 30 + 10);
    }
  }

}
var pieDraw;

window.addEventListener('DOMContentLoaded', (event) => {
  pieDraw1 = new pieChart(data,colors,'pie1');
  pieDraw2 = new pieChart(data,colors,'pie2');

  pieDraw1.drawPieChart();
  pieDraw2.drawPieChart();
}
);
