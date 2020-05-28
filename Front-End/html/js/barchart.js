var myCanvas = document.getElementById("myCanvasChart");
myCanvas.width = 300;
myCanvas.height = 300;
  
var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY,color){   //<ctx> = reference to the drawing context(canvas?)
  ctx.save();                   //saves current color settings
  ctx.strokeStyle = color;      //sets the color to <color> for the stroke/line drawing mode
  ctx.beginPath();              //enter drawing mode
  ctx.moveTo(startX,startY);    //set start point coords
  ctx.lineTo(endX,endY);        //set end point coords
  ctx.stroke();                 //draw a stroke/line between start and end points
  ctx.restore();                //restore the color settings previously saved
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){   //<ctx> = reference to the drawing context
  ctx.save();                                                       //saves current color settings
  ctx.fillStyle=color;                                              //sets the color to <color> for the fill drawing mode
  ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);     //draws and fills a rectangle starting at the upper left corner coords with width <width> and height <height>
  ctx.restore();                                                    //restore the color settings previously saved
}

var myDataSet = {
  "Dacia" : 168,
  "Renault" : 120,
  "Mercedes" : 300,
  "Ford" : 52,
  "HONDA":13,
  "BMW":132,
  "sdas":123,
  "2ass":123,
  "Da2cia" : 168,
  "Re2nault" : 120,
  "Me2rcedes" : 300,
  "Fo2rd" : 52,
  "HON2":132,
  "sd2as":123,
  "2a2ss":123
}

var Barchart = function(options){
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;

  this.draw = function(){
      var maxValue = 0;
      for (var categ in this.options.data){
          maxValue = Math.max(maxValue,this.options.data[categ]);
      }
      var canvasActualHeight = this.canvas.height - this.options.padding * 2;
      var canvasActualWidth = this.canvas.width - this.options.padding * 2;

      //drawing the grid lines
      var gridValue = 0;
      while (gridValue <= maxValue){
          var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
          drawLine(
              this.ctx,
              0,
              gridY,
              this.canvas.width,
              gridY,
              this.options.gridColor
          );
           
          //writing grid markers
          this.ctx.save();
          this.ctx.fillStyle = this.options.gridColor;
          this.ctx.font = "bold 10px Arial";
          this.ctx.fillText(gridValue, 10,gridY - 2);
          this.ctx.restore();

          gridValue+=this.options.gridScale;
      }

      //drawing the bars
      var numberOfBars = Object.keys(this.options.data).length;
      var barIndex = 0;
      var barSize = (canvasActualWidth)/(numberOfBars*2);

      for (categ in this.options.data){
          var val = this.options.data[categ];
          var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
          drawBar(
              this.ctx,
              this.options.padding + 1.5 * (barIndex + 1) * barSize,
              this.canvas.height - barHeight - this.options.padding,
              barSize,
              barHeight,
              this.colors[barIndex%this.colors.length]
          );

          barIndex++;
      }

      //drawing series names
      this.ctx.save();
      this.ctx.textBaseline="bottom";
      this.ctx.textAlign="left";
      this.ctx.fillStyle = "#000000";
      this.ctx.font = "bold 14px Arial";
      this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
      this.ctx.restore();

      //draw legend
      barIndex = 0;
      var legend = document.querySelector("legend[for='myCanvasChart']");
      legend.remove("ul");
      var ul = document.createElement("ul");
      legend.append(ul);
      for (categ in this.options.data){
          var li = document.createElement("li");
          li.style.listStyle = "none";
          li.style.borderBottomWidth = "10px";
          li.style.borderLeft = "10px solid " + this.colors[barIndex%this.colors.length];
          li.style.padding = "5px";
          li.textContent = categ;
          ul.append(li);
          barIndex++;
      }
  }
}

var myBarchart = new Barchart(
  {
      canvas:myCanvas,
      seriesName:"Cars",
      padding:30,
      gridScale:10,
      gridColor:"#000",
      data:myDataSet,
      colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743","eb9743","#eb9743","#a55ca5","#67b6c7", "#bccd7a","#eb9743","eb9743","#eb9743"]
  }
);
myBarchart.draw();