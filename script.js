const endtime = "2022-01-08 00:00:00:00";
let xDown = null;
let yDown = null;

window.addEventListener('load', () => {
    const days = document.querySelector('.days')
    const hours = document.querySelector('.hours')
    const minutes = document.querySelector('.minutes')
    const seconds = document.querySelector('.seconds')
    
    let timeLeft = {
        d: 0,
        h: 0,
        m: 0,
        s: 0,
    }
    
    let totalSeconds;
    
    function init() {
        totalSeconds = Math.floor((new Date('01/08/2022') - new Date()) / 1000); 
        /* totalSeconds = Math.floor((Date.parse(endtime) - Date.parse(new Date())) / 1000); */
        setTimeLeft();
        let interval = setInterval(() => {
            if (totalSeconds < 0) {
                clearInterval(interval);
            }
            countTime();
        }, 1000);
    }
    
    function countTime() {
        if (totalSeconds > 0) {
            --timeLeft.s;
            if (timeLeft.m >= 0 && timeLeft.s < 0) {
                timeLeft.s = 59;
                --timeLeft.m;
                if (timeLeft.h >= 0 && timeLeft.m < 0) {
                    timeLeft.m = 59;
                    --timeLeft.h;
                    if (timeLeft.d >= 0 && timeLeft.h < 0) {
                        timeLeft.h = 23;
                        --timeLeft.d;
                    }
                }
            }
        } else return;
        --totalSeconds;
        printTime();
    }
    
    function printTime() {
        animateFlip(days, timeLeft.d);
        animateFlip(hours, timeLeft.h);
        animateFlip(minutes, timeLeft.m);
        animateFlip(seconds, timeLeft.s);
    }
    
    function animateFlip(element, value) {
        const valueInDom = element.querySelector('.bottom-back').innerText;
        const currentValue = value < 10 ? '0' + value : '' + value;
    
        if (valueInDom === currentValue) return;
    
        element.querySelector('.top-back span').innerText = currentValue;
        element.querySelector('.bottom-back span').innerText = currentValue;
    
    
        gsap.to(element.querySelector('.top'), 0.7, {
            rotationX: '-180deg',
            transformPerspective: 300,
            ease: Quart.easeOut,
            onComplete: function() {
                element.querySelector('.top').innerText = currentValue; 
                element.querySelector('.bottom').innerText = currentValue; 
                gsap.set(element.querySelector('.top'), {rotationX: 0});
            }
        });
    
        gsap.to(element.querySelector('.top-back'), 0.7, {
            rotationX: 0,
            transformPerspective: 300,
            ease: Quart.easeOut,
            clearProps: 'all'
        });
    
    }
    
    
    
    function setTimeLeft() {
        timeLeft.d = Math.floor(totalSeconds / (60 * 60 * 24));
        timeLeft.h = Math.floor(totalSeconds / (60 * 60) % 24);
        timeLeft.m = Math.floor(totalSeconds / (60) % 60);
        timeLeft.s = Math.floor(totalSeconds % 60);
    }
    
    init();
});

$(document).ready(function () {
    let foto = $(".foto");
    $('.header').on('touchstart', function(evt) {
        const firstTouch = evt.touches[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY; 
    })
    $('.header').on('touchmove', function(evt) {
        if (!xDown || !yDown) {
            return;
        }
        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                foto.attr("src", "images/tania2.jpg");
            } else {
                foto.attr("src", "images/taniajpg.jpg");
            }                       
        }
        /* reset values */
        xDown = null;
        yDown = null;
    })
})