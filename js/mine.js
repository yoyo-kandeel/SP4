document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});



const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const icons = [
// Simple SVG paths for book, pencil, ruler, etc.
{ draw: (x, y, s, r) => { // Book
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(r);
        ctx.fillStyle = "#f9d923";
        ctx.fillRect(-s/2, -s/4, s, s/2);
        ctx.fillStyle = "#fff";
        ctx.fillRect(-s/2+4, -s/4+4, s-8, s/2-8);
        ctx.restore();
    }
},
{ draw: (x, y, s, r) => { // Pencil
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(r);
      ctx.fillStyle = "#f47a60";
      ctx.fillRect(-s/8, -s/2, s/4, s*0.7);
      ctx.beginPath();
      ctx.moveTo(-s/8, -s/2);
      ctx.lineTo(s/8, -s/2);
      ctx.lineTo(0, -s/2-s/6);
      ctx.closePath();
      ctx.fillStyle = "#e6e6e6";
      ctx.fill();
      ctx.restore();
    }
  },
  { draw: (x, y, s, r) => { // Ruler
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(r);
      ctx.fillStyle = "#a1c6ea";
      ctx.fillRect(-s/2, -s/8, s, s/4);
      for(let i=1;i<5;i++){
        ctx.beginPath();
        ctx.moveTo(-s/2 + i*s/5, -s/8);
        ctx.lineTo(-s/2 + i*s/5, s/8);
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    }
  }
];

function randomIcon() {
  const icon = icons[Math.floor(Math.random()*icons.length)];
  const size = 30 + Math.random()*30;
  return {
    x: Math.random()*width,
    y: Math.random()*height,
    size,
    speed: 0.3 + Math.random()*0.7,
    angle: Math.random()*Math.PI*2,
    rotateSpeed: (Math.random()-0.5)*0.01,
    icon
  };
}

let shapes = [];
for(let i=0;i<18;i++) shapes.push(randomIcon());

function animate() {
  ctx.clearRect(0,0,width,height);
  for(let shape of shapes) {
    shape.y += shape.speed;
    shape.angle += shape.rotateSpeed;
    if(shape.y - shape.size > height) {
      Object.assign(shape, randomIcon(), {y: -shape.size});
    }
    shape.icon.draw(shape.x, shape.y, shape.size, shape.angle);
  }
  requestAnimationFrame(animate);
}

window.addEventListener('resize', ()=>{
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

animate();

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}