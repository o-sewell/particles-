var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var particles = [];
var colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];
var gravity = 0.04;

function initParticles() {
  for(var i = 0; i < 200; i++) {
    setTimeout(createParticle, 20*i, i);
  }
}

function createParticle(i) {
  //initial position in middle of canvas
  var x = width * 0.5;
  var y = height * 0.5;
  
  //randomize vx and vy
  var vx = -2 + Math.random() * 4;
  var vy = Math.random() * -3;
  
  //randomize size opacity and color
  var size = 5 + Math.random() * 5;
  var color = colors[i%colors.length];
  var opacity = 0.5 + Math.random() * 0.5;
  var p = new Particle(x,y,vx,vy,size,color,opacity);
  particles.push(p);
}

function Particle(x,y,vx,vy,size,color,opacity) {
  this.update = function() {
    
    function reset() {
      x = width*0.5;
      y = height*0.5;
      opacity = 0.5 + Math.random()*0.5;
      vx = -2+Math.random()*4;
      vy = Math.random()*-3;
  }
  
     // if a particle has faded to nothing - reset it to the starting position
    if (opacity - 0.005 > 0) {
      opacity -= 0.005 ;
    } else {
      reset();
    }
    
    vy = vy + gravity;
    
    x = x + vx;
    y = y + vy;
  }
  
  this.draw = function() {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.fillRect(x,y,size,size);
  }
}

function render() {
  // clear canvas
  ctx.clearRect(0,0,width,height);
  for(var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  requestAnimationFrame(render);
}

//resize 
window.addEventListener('resize', resize);
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

//init 
initParticles();
render();