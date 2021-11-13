const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let hue = 0;

let particleArray = [];


const model = 
{
   
    hasGeneratedArray: false
}

const mouse = {
    x: undefined,
    y:undefined
}

class Particle {
    constructor() {
    
        this.x = mouse.x;
        this.y = mouse.y;
    

        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
    
        this.size = Math.random() * 8 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 5 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%';
     }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
    }
    draw()
    {
       
        
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'white';
        ctx.filter = 'none';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles()
{
    
    if(model.hasGeneratedArray){
        for (let i = 0; i < particleArray.length; i++){
            particleArray[i].update();
            particleArray[i].draw();
            if (particleArray[i].size <= 1){
                particleArray.splice(i, 1);
                i--;
            }
        }
        return;
    }

    particleArray = [];
    model.hasGeneratedArray = true;

    // if(model.pressedBtn == "Popping") return;
    canvas.addEventListener('mousemove',  function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        for (let i = 0; i < 15; i++)
            particleArray.push(new Particle());
    
    });

    // app.addEventListener('mousemove',  function(event){
    //     mouse.x = event.x;
    //     mouse.y = event.y;
    //     for (let i = 0; i < 15; i++)
    //         particleArray.push(new Particle());
    
    // });

    canvas.addEventListener('click',  function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        for (let i = 0; i < 65; i++)
            particleArray.push(new Particle());
    
    });

    // app.addEventListener('click',  function(event){
    //     mouse.x = event.x;
    //     mouse.y = event.y;
    //     for (let i = 0; i < 65; i++)
    //         particleArray.push(new Particle());
    
    // });   
}

function createParticle()
{
    
    let size = Math.random() * 15 + 20;
    let x = canvas.height/2;
    let y = canvas.width/2;
    
    particleArray.push(new Particle(x, y, size));
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createParticle();
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}
animate();