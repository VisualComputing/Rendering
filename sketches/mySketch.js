var anchoVentana = 1200, alturaVentana = 500;
var anchoBoton = 35, alturaBoton = 35;
var minimoLadosPoligono = 3, maximoLadosPoligono = 15;
var minimoPixeles = 15, maximoPixeles = 25;
var minimoPixelesSobremuestra = 1, maximoPixelesSobremuestra = 4;

var numeroLadosPoligono = minimoLadosPoligono;
var numeroPixelesLado = minimoPixeles;
var numeroPixelesSobremuestra = minimoPixelesSobremuestra;

class G_HorizontalScrollBar{
  //var swidth, sheight;    // width and height of bar
  //var xpos, ypos;       // x and y position of bar
  //var spos, newspos;    // x position of slider
  //var sposMin, sposMax; // max and min values of slider
  //var loose;              // how loose/heavy
  //var over;           // is the mouse over the slider?
  //var locked;
  //var ratio;
  
  constructor(xp, yp, sw, sh, l){
    this.swidth = sw;
    this.sheight = sh;
    this.widthtoheight = sw - sh;
    this.ratio = sw / this.widthtoheight;
    this.xpos = xp;
    this.ypos = yp - this.sheight / 2;
    this.spos = this.xpos + this.swidth / 2 - this.sheight / 2;
    this.newspos = this.spos;
    this.sposMin = this.xpos;
    this.sposMax = this.xpos + this.swidth - this.sheight;
    this.loose = l;
  }
  
  overEvent(){
    if(mouseX > this.xpos && mouseX < this.xpos + this.swidth && mouseY > this.ypos && mouseY < this.ypos + this.sheight){
      return true;
    }else{
      return false;
    }
  }

  update(){
    if(this.overEvent() === true){
      this.over = true;
    }else{
      this.over = false;
    }
    if(this.over === true){
      this.locked = true;
    }else{
      this.locked = false;
    }
    if(this.locked === true){
      this.newspos = this.constrain(mouseX - this.sheight / 2, this.sposMin, this.sposMax);
    }
    if(Math.abs(this.newspos - this.spos) > 1){
      this.spos = this.spos + (this.newspos - this.spos) / this.loose;
    }
  }

  constrain(val, minv, maxv){
    return Math.min(Math.max(val, minv), maxv);
  }

  display(){
    noStroke();
    fill(204);
    rect(this.xpos, this.ypos, this.swidth, this.sheight);
    if(this.over === true && this.locked === true){
      fill(0, 0, 0);
    }else{
      fill(102, 102, 102);
    }
    rect(this.spos, this.ypos, this.sheight, this.sheight);
  }

  getPos(){
    // Convert spos to be values between
    // 0 and the total width of the scrollbar
    return this.spos * this.ratio;
  }
}

var hs1, hs2, hs3;
var puntosX;
var puntosY;
var margen = 10, dist = 10;
var muestrasLado = 3;

var noAnti, anti, siAnti;
  
var numeroLadosPoligono = 1;
var numeroPixelesLado = 1;
var longitudVistaPrevia = 220;
  
var a = 2 * Math.PI / numeroLadosPoligono;

function setup(){
  var myCanvas = createCanvas(anchoVentana, alturaVentana);
  myCanvas.parent('mysketch_id');
  textSize(18);
  hs1 = new G_HorizontalScrollBar(40, 55, 200, 20, 1);
  hs2 = new G_HorizontalScrollBar(40, 105, 200, 20, 1);
  hs3 = new G_HorizontalScrollBar(40, 155, 200, 20, 1);
}

function draw(){
  background(46, 254, 100);
  numeroLadosPoligono = numeroLados(hs1.sposMin, hs1.sposMax, hs1.spos);
  numeroPixelesLado = numeroPixeles(hs2.sposMin, hs2.sposMax, hs2.spos);
  numeroPixelesSobremuestra = factorSobremuestra(hs3.sposMin, hs3.sposMax, hs3.spos);
  a = 2 * Math.PI / numeroLadosPoligono;
  fill(0);
  text("Número de Lados del Polígono: " + numeroLadosPoligono, 25, 40);
  text("Número de Pixeles de Lado: " + numeroPixelesLado, 25, 90);
  text("Número de Pixeles de Sobremuestra: " + numeroPixelesSobremuestra, 25, 140);
  rectMode(CORNER);
  hs1.update();
  hs1.display();
  hs2.update();
  hs2.display();
  hs3.update();
  hs3.display();
  fill(255);
  stroke(0);
  rectMode(RADIUS);
  rect(15 + longitudVistaPrevia / 2, 265 + longitudVistaPrevia / 2, longitudVistaPrevia / 2, longitudVistaPrevia / 2);
  rect(30 + 3 * longitudVistaPrevia / 2, 265 + longitudVistaPrevia / 2, longitudVistaPrevia / 2, longitudVistaPrevia / 2);
  rect(45 + 5 * longitudVistaPrevia / 2, 265 + longitudVistaPrevia / 2, longitudVistaPrevia / 2, longitudVistaPrevia / 2);
  rect(60 + 7 * longitudVistaPrevia / 2, 265 + longitudVistaPrevia / 2, longitudVistaPrevia / 2, longitudVistaPrevia / 2);
  rect(75 + 9 * longitudVistaPrevia / 2, 265 + longitudVistaPrevia / 2, longitudVistaPrevia / 2, longitudVistaPrevia / 2);

  stroke(127);
  for(var control = 1; control < numeroPixelesLado; ++control){
    line(30 + longitudVistaPrevia, 265 + control * longitudVistaPrevia / numeroPixelesLado, 30 + longitudVistaPrevia + longitudVistaPrevia, 265 + control * longitudVistaPrevia / numeroPixelesLado);
    line(30 + longitudVistaPrevia + control * longitudVistaPrevia / numeroPixelesLado, 265 + longitudVistaPrevia, 30 + longitudVistaPrevia + control * longitudVistaPrevia / numeroPixelesLado, 265);
  }

  stroke(127);
  for(var control = 1; control < numeroPixelesLado * numeroPixelesSobremuestra; ++control){
    line(60 + 3 * longitudVistaPrevia, 265 + control * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra), 60 + 3 * longitudVistaPrevia + longitudVistaPrevia, 265 + control * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra));
    line(60 + 3 * longitudVistaPrevia + control * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra), 265 + longitudVistaPrevia, 60 + 3 * longitudVistaPrevia + control * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra), 265);
  }





  stroke(0);
  puntosX = [];
  puntosY = [];
    
  for(var control = 0; control < numeroLadosPoligono; control++){
    var x = 15 + longitudVistaPrevia / 2 + longitudVistaPrevia / 2 * Math.cos(a * control), y = 265 + longitudVistaPrevia / 2 + longitudVistaPrevia / 2 * Math.sin(a * control);
    puntosX.push(x);
    puntosY.push(y);
    if(control > 0){
      line(puntosX[control - 1], puntosY[control - 1], puntosX[control], puntosY[control]);
      line(15 + puntosX[control - 1] + longitudVistaPrevia, puntosY[control - 1], 15 + puntosX[control] + longitudVistaPrevia, puntosY[control]);
    }
  }
  line(puntosX[numeroLadosPoligono - 1], puntosY[numeroLadosPoligono - 1], puntosX[0], puntosY[0]);
  line(15 + puntosX[numeroLadosPoligono - 1] + longitudVistaPrevia, puntosY[numeroLadosPoligono - 1], 15 + puntosX[0] + longitudVistaPrevia, puntosY[0]);
    
  for(var control = 0; control < numeroLadosPoligono; control++){
    if(control < numeroLadosPoligono - 1){
      var x1 = puntosX[control], x2 = puntosX[control + 1];
      var y1 = puntosY[control], y2 = puntosY[control + 1];
      for(var t = 0.0; t < 1.0; t += 0.01){
        puntosX.push((1 - t) * x1 + t * x2);
        puntosY.push((1 - t) * y1 + t * y2);
      }
    }else{
      var x1 = puntosX[control], x2 = puntosX[0];
      var y1 = puntosY[control], y2 = puntosY[0];
      for(var t = 0.0; t < 1.0; t += 0.01){
        puntosX.push((1 - t) * x1 + t * x2);
        puntosY.push((1 - t) * y1 + t * y2);
      }
    }
  }
        
  noAnti = [];
  for(var control = 0; control < numeroPixelesLado; control++){
    noAnti.push([]);
    for(var control1 = 0; control1 < numeroPixelesLado; control1++){
      noAnti[control].push(255.0);
    }
  }
  var nodeList = [];
  noAnti.push(nodeList);
  for(var i = 0; i < numeroPixelesLado; i++){
    for(var j = 0; j < numeroPixelesLado; j++){
      var minx = 15 + i * longitudVistaPrevia / numeroPixelesLado, miny = 265 + j * longitudVistaPrevia / numeroPixelesLado;
      var maxx = 15 + (i + 1) * longitudVistaPrevia / numeroPixelesLado, maxy = 265 + (j + 1) * longitudVistaPrevia / numeroPixelesLado;
      for(var k = 0; k < puntosX.length; k++){
        if((minx < puntosX[k] && puntosX[k] < maxx) && (miny < puntosY[k] && puntosY[k] < maxy)){
          noAnti[i][j] = 0.0;
          fill(33, 181, 241);
          rect(235 + minx + longitudVistaPrevia / (numeroPixelesLado * 2), miny + longitudVistaPrevia / (numeroPixelesLado * 2), longitudVistaPrevia / (numeroPixelesLado * 2), longitudVistaPrevia / (numeroPixelesLado * 2));
          rect(470 + minx + longitudVistaPrevia / (numeroPixelesLado * 2), miny + longitudVistaPrevia / (numeroPixelesLado * 2), longitudVistaPrevia / (numeroPixelesLado * 2), longitudVistaPrevia / (numeroPixelesLado * 2));
          break;
        }
      }
    }
  }

  for(var control = 0; control < numeroLadosPoligono; control++){
    if(control > 0){
      line(15 + puntosX[control - 1] + longitudVistaPrevia, puntosY[control - 1], 15 + puntosX[control] + longitudVistaPrevia, puntosY[control]);
    }
  }
  line(15 + puntosX[numeroLadosPoligono - 1] + longitudVistaPrevia, puntosY[numeroLadosPoligono - 1], 15 + puntosX[0] + longitudVistaPrevia, puntosY[0]);

  anti = [];
  siAnti = []
  for(var control = 0; control < numeroPixelesLado * numeroPixelesSobremuestra; control++){
    anti.push([]);
    siAnti.push([]);
    for(var control1 = 0; control1 < numeroPixelesLado * numeroPixelesSobremuestra; control1++){
      anti[control].push(255.0);
      siAnti[control].push(255.0);
    }
  }
  nodeList = [];
  anti.push(nodeList);
  siAnti.push(nodeList);
  for(var i = 0; i < numeroPixelesLado * numeroPixelesSobremuestra; i++){
    for(var j = 0; j < numeroPixelesLado * numeroPixelesSobremuestra; j++){
      var minx = 15 + i * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra), miny = 265 + j * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra);
      var maxx = 15 + (i + 1) * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra), maxy = 265 + (j + 1) * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra);
      for(var k = 0; k < puntosX.length; k++){
        if((minx < puntosX[k] && puntosX[k] < maxx) && (miny < puntosY[k] && puntosY[k] < maxy)){
          anti[i][j] = 0.0;
          siAnti[i][j] = 0.0;
          fill(33, 181, 241);
          rect(705 + minx + longitudVistaPrevia / (numeroPixelesLado * 2 * numeroPixelesSobremuestra), miny + longitudVistaPrevia / (numeroPixelesLado * 2 * numeroPixelesSobremuestra), longitudVistaPrevia / (numeroPixelesLado * 2 * numeroPixelesSobremuestra), longitudVistaPrevia / (numeroPixelesLado * 2 * numeroPixelesSobremuestra));
          break;
        }
      }
    }
  }

  noStroke();
  for(var i = 0; i < numeroPixelesLado * numeroPixelesSobremuestra; i++){
    for(var j = 0; j < numeroPixelesLado * numeroPixelesSobremuestra; j++){
      var minx = 15 + i * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra), miny = 265 + j * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra);
      var maxx = 15 + (i + 1) * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra), maxy = 265 + (j + 1) * longitudVistaPrevia / (numeroPixelesLado * numeroPixelesSobremuestra);
      averageBlur(anti, siAnti, numeroPixelesLado, numeroPixelesSobremuestra, 3, i, j);
      fill(siAnti[i][j]);
      rect(940 + minx + longitudVistaPrevia / (numeroPixelesLado * 2 * numeroPixelesSobremuestra), miny + longitudVistaPrevia / (numeroPixelesLado * 2 * numeroPixelesSobremuestra), longitudVistaPrevia / (numeroPixelesLado * 2 * numeroPixelesSobremuestra), longitudVistaPrevia / (numeroPixelesLado * 2 * numeroPixelesSobremuestra));
    }
  }
}

function numeroLados(minV, maxV, s){
  return Math.trunc((maximoLadosPoligono - minimoLadosPoligono) / (maxV - minV) * (s - minV) + minimoLadosPoligono);
}
function numeroPixeles(minV, maxV, s){
  return Math.trunc((maximoPixeles - minimoPixeles) / (maxV - minV) * (s - minV) + minimoPixeles);
}
function factorSobremuestra(minV, maxV, s){
  return Math.trunc((maximoPixelesSobremuestra - minimoPixelesSobremuestra) / (maxV - minV) * (s - minV) + minimoPixelesSobremuestra);
}
function averageBlur(matrizOrigen, matrizDestino, numeroPixelesLado, numeroPixelesSobremuestra, longitudKernel, r, c){
  var pixelesRadio = Math.trunc((longitudKernel - 1) / 2);
  var top, bottom, left, right, totalSum = 0.0;
      if(r - pixelesRadio >= 0){
        top = r - pixelesRadio;
      }else{
        top = 0;
      }
      if(r + pixelesRadio < numeroPixelesLado * numeroPixelesSobremuestra){
        bottom = r + pixelesRadio;
      }else{
        bottom = numeroPixelesLado * numeroPixelesSobremuestra - 1;
      }
        if(c - pixelesRadio >= 0){
          left = c - pixelesRadio;
        }else{
          left = 0;
        }
        if(c + pixelesRadio < numeroPixelesLado * numeroPixelesSobremuestra){
          right = c + pixelesRadio;
        }else{
          right = numeroPixelesLado * numeroPixelesSobremuestra - 1;
        }
        for(var abc = top; abc <= bottom; abc++){
          for(var def = left; def <= right; def++){
            totalSum = totalSum + matrizOrigen[abc][def];
          }
        }
        matrizDestino[r][c] = Math.trunc(totalSum / ((bottom - top + 1) * (right - left + 1)));
}

var sketch1 = function(p){
  p.setup = function(){
    p.createCanvas(400, 400);
  };
};
var myp5_1 = new p5(sketch1, 'mysketch_id');
