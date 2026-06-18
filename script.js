// year
document.getElementById('yr').textContent = new Date().getFullYear();

// custom cursor
const cursor = document.getElementById('cursor');
let cx = 0, cy = 0, tx = 0, ty = 0;
window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY });
function loop() { cx += (tx - cx) * .18; cy += (ty - cy) * .18; cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop) }
loop();
document.querySelectorAll('a,button,.card,.frame').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hot'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hot'));
});

// nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', scrollY > 40) });

// burger
const burger = document.getElementById('burger');
const links = document.getElementById('links');
burger.addEventListener('click', () => { burger.classList.toggle('on'); links.classList.toggle('open') });
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { burger.classList.remove('on'); links.classList.remove('open') }));

// active link on scroll
const linkEls = [...document.querySelectorAll('.link')];
const sections = linkEls.map(l => document.querySelector(l.getAttribute('href')));
window.addEventListener('scroll', () => {
    const y = scrollY + window.innerHeight * .35;
    sections.forEach((s, i) => {
        if (s && y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
            linkEls.forEach(l => l.classList.remove('active'));
            linkEls[i].classList.add('active');
        }
    });
});

// reveal observer
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// modal
const works = [
    { img: 'bears.PNG', no: '01', title: 'Title', sub: 'Sub · 2025', desc: 'Describe' },
    { img: 'bunny.PNG', no: '02', title: 'Title', sub: 'Sub · 2024', desc: 'Describe' },
    { img: 'noodle.PNG', no: '03', title: 'Title', sub: 'Sub · 2024', desc: 'Describe' },
    { img: 'sosalka.PNG', no: '04', title: 'Title', sub: 'Sub · 2025', desc: 'Describe' },
    { img: 'three_lips.PNG', no: '05', title: 'Title', sub: 'Sub · 2023', desc: 'Describe' },
    { img: 'uwu.PNG', no: '06', title: 'Title', sub: 'Sub · 2024', desc: 'Describe' },
];

const modal = document.getElementById('modal');
const mImg = document.getElementById('modalImg');
const mNo = document.getElementById('modalNo');
const mT = document.getElementById('modalTitle');
const mS = document.getElementById('modalSub');
const mD = document.getElementById('modalDesc');
let idx = 0;

function open(i) {
    idx = i; const w = works[i];
    mImg.src = w.img; mNo.textContent = '— Work № ' + w.no; mT.textContent = w.title; mS.textContent = w.sub; mD.textContent = w.desc;
    modal.classList.add('on'); modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}
function close() { modal.classList.remove('on'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '' }
function step(d) { open((idx + d + works.length) % works.length) }

document.querySelectorAll('.card').forEach(c => c.addEventListener('click', () => open(+c.dataset.i)));
document.getElementById('modalClose').addEventListener('click', close);
document.querySelector('.modal__back').addEventListener('click', close);
document.getElementById('prev').addEventListener('click', () => step(-1));
document.getElementById('next').addEventListener('click', () => step(1));
document.addEventListener('keydown', e => {
    if (!modal.classList.contains('on')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
});

// subtle parallax on hero art
const frame = document.querySelector('.frame');
if (frame) {
    document.querySelector('.hero').addEventListener('mousemove', e => {
        const r = frame.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        frame.style.transform = `perspective(1400px) rotateY(${-x * 6}deg) rotateX(${y * 6}deg)`;
    });
}
