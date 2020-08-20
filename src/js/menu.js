const MENU = document.getElementById('menu');
const BURGER = document.getElementById('headerburger');
const NAV = document.getElementById('headernav');
const anchors = document.querySelectorAll('a[href*="#"]');
let form = document.querySelector('form');
const links = MENU.querySelectorAll('a');

/* ----------------------------burgerMenu--------------------- */


function toggleMenu() {
    BURGER.classList.toggle('btn-active');
    NAV.classList.toggle('active');
    document.body.classList.toggle('lock');
}
BURGER.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
});
/* ---------------------------scroll menu------------------ */
MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    BURGER.classList.toggle('btn-active');
    NAV.classList.toggle('active');
});
window.addEventListener('scroll', function(e) {
    let navsec = document.querySelectorAll('section[id^="nav"]');
    for (let i = 0; i < navsec.length; i++) {
        if (1 >= navsec[i].getBoundingClientRect().top && navsec[i].getBoundingClientRect().top >= 1 - navsec[i].offsetHeight) {
            document.querySelector('a[href="#' + navsec[i].id + '"]').classList.add('active');
        } else {
            document.querySelector('a[href="#' + navsec[i].id + '"]').classList.remove('active');
        }
    }

}, false);
let linkNav = document.querySelectorAll('[href^="#nav"]');
let V = 0.4; // скорость, может иметь дробное значение через точку
for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].onclick = function() {
        let w = window.pageYOffset;
        let hash = this.href.replace(/[^#]*(.*)/, '$1');
        let t = document.querySelector(hash).getBoundingClientRect().top;
        let start = null;
        requestAnimationFrame(step);

        function step(time) {
            if (start === null) start = time;
            let progress = time - start;
            let r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
            window.scrollTo(0, r);
            if (r != w + t) { requestAnimationFrame(step); } else { location.hash = hash; }
        }
        return false;
    };
}
/* document.addEventListener('scroll', onscroll);

function onscroll(e) {
    const curPos = window.scrollY;
    let navsec = document.querySelectorAll('section[id^="nav"]');
    navsec.forEach(function(el) {
        let elHeight = el.offsetHeight;
        if ((el.offsetTop) <= curPos && (el.offsetTop + elHeight) > curPos) {
            links.forEach(a => {
                a.classList.remove('active');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active');
                }
            });
        }
    });
} */