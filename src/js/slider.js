let items = document.querySelectorAll('.carousel .slider__item');
let btns = document.querySelectorAll('.s-btn');
let btn1 = document.getElementById('btn-1');
let btn2 = document.getElementById('btn-2');
let btn3 = document.getElementById('btn-3');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    btns[currentItem].classList.remove('btn-active');
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    });
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    btns[currentItem].classList.add('btn-active');
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.querySelector('.control.right').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem);
    }
});
btn1.addEventListener('click', function() {
    if (isEnabled) {
        if (currentItem === 2) {
            previousItem(currentItem);
            previousItem(currentItem);
        }
        if (currentItem === 1) {
            previousItem(currentItem);
        }
        currentItem = 0;

    }
});
btn2.addEventListener('click', function() {
    if (isEnabled) {
        if (currentItem === 0) {
            nextItem(currentItem);
        }
        if (currentItem === 2) {
            previousItem(currentItem);
        }
        currentItem = 1;
    }
});
btn3.addEventListener('click', function() {
    if (isEnabled) {
        if (currentItem === 0) {
            nextItem(currentItem);
            nextItem(currentItem);
        }
        if (currentItem === 1) {
            nextItem(currentItem);
        }
        currentItem = 2;
    }
});

const swipedetect = (el) => {

    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;

    surface.addEventListener('mousedown', function(e) {
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    surface.addEventListener('mouseup', function(e) {
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if ((distX > 0)) {
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }
        e.preventDefault();
    }, false);

    surface.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
            if (e.target.classList.contains('left')) {
                if (isEnabled) {
                    previousItem(currentItem);
                }
            } else {
                if (isEnabled) {
                    nextItem(currentItem);
                }
            }
        }
        var touchobj = e.changedTouches[0];
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    surface.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);

    surface.addEventListener('touchend', function(e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if ((distX > 0)) {
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }
        e.preventDefault();
    }, false);
}

var el = document.querySelector('.carousel');
swipedetect(el);