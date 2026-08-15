function openEnvelope() {
    const envelope = document.getElementById('envelope-overlay');
    const mainPage = document.getElementById('main-page');

    envelope.classList.add('hide-envelope');

    setTimeout(() => {
        document.body.style.overflowY = 'auto'; 
        mainPage.classList.add('show-main');
        startPetals();
        startSparkles();
        startAutoSlide();
        startCountdown();
    }, 600);
}

/* GALLERY SLIDER SUPPORTING 10 PHOTOS */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(index) {
    slides.forEach((s, i) => {
        s.classList.remove('active');
        if(dots[i]) dots[i].classList.remove('active');
    });

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if(dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide();
}

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3600);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

/* COUNTDOWN TIMER FOR SEPTEMBER 18, 2026 */
function startCountdown() {
    const targetDate = new Date("September 18, 2026 15:00:00").getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = d < 10 ? '0' + d : d;
            document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
            document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
            document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;
        }
    }
    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ANIMATIONS */
function startSparkles() {
    const canvas = document.getElementById('sparkle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sparkles = [];
    for(let i = 0; i < 45; i++) {
        sparkles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparkles.forEach(s => {
            s.alpha += s.speed;
            if(s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;
            ctx.fillStyle = `rgba(212, 175, 55, ${Math.abs(s.alpha)})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function startPetals() {
    const canvas = document.getElementById('petal-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const petals = [];
    for (let i = 0; i < 30; i++) {
        petals.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 9 + 6,
            speedY: Math.random() * 1.2 + 0.5,
            speedX: Math.random() * 0.6 - 0.3,
            angle: Math.random() * 360,
            spin: Math.random() * 2 - 1,
            color: ['#6B1120', '#8c1c2e', '#D4AF37', '#e2b368'][Math.floor(Math.random() * 4)]
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(p => {
            p.y += p.speedY;
            p.x += Math.sin(p.y * 0.01) + p.speedX;
            p.angle += p.spin;

            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.angle * Math.PI) / 180);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.65;
            ctx.fill();
            ctx.restore();
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
