// MorphSVGPlugin.convertToPath('polygon');
let xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function (s) {
        return document.querySelector(s);
    },
    mainSVG = select('.mainSVG'),
    showParticle = true,
    particleColorArray = [
        '#ffe900',
        '#fcc70e',
        '#E8F6F8',
        '#F6FBFE',
        '#ACE8F8',
        '#A2CBDC',
        '#B74551',
        '#910B28',
        '#910B28',
        '#5DBA72',
        '#446D39',
    ],
    particleTypeArray = ['#star', '#circ', '#cross', '#heart'],
    particlePool = [],
    particleCount = 0,
    numParticles = 180;

gsap.set('svg', {
    visibility: 'visible'
})

function flicker(p) {
    gsap.killTweensOf(p, {opacity: true});
    gsap.fromTo(p, {
        opacity: 1
    }, {
        duration: 0.07,
        opacity: Math.random(),
        repeat: -1
    })
}

function createParticles() {
    let i = numParticles, p;
    while (--i > -1) {

        p = select(particleTypeArray[i % particleTypeArray.length]).cloneNode(true);
        mainSVG.appendChild(p);
        p.setAttribute('fill', particleColorArray[i % particleColorArray.length]);
        p.setAttribute('class', "particle");
        particlePool.push(p);
        //hide them initially
        gsap.set(p, {
            x: -100,
            y: -100,
            transformOrigin: '50% 50%'
        })


    }

}

let getScale = gsap.utils.random(0.5, 3, 0.001, true);
let getOffset = () => {
    // let b = mainSVG.getBBox();
    let b = mainSVG.getBoundingClientRect();
    let w = b.width - 20;
    let h = b.height - 20;
    return {
        x: Math.floor(Math.random() * w) + 10,
        y: Math.floor(Math.random() * h) + 10,
    }
};

function playParticle(p, min = 1.2, max = 3.6) {
    if (!showParticle) {
        return;
    }
    let o = getOffset();
    gsap.set(p, {
            x: o.x,
            y: o.y,
            scale: getScale()
        }
    );

    let tl = gsap.timeline();
    tl.to(p, {
        duration: gsap.utils.random(min, max),
        // physics2D: {
        //     velocity: gsap.utils.random(-23, 23),
        //     angle: gsap.utils.random(-180, 180),
        //     gravity: gsap.utils.random(-6, 50)
        // },
        scale: 0,
        rotation: gsap.utils.random(-123, 360),
        ease: 'power1',
        onStart: flicker,
        onStartParams: [p],
        //repeat:-1,
        onRepeat: (p) => {
            gsap.set(p, {
                scale: getScale()
            })
        },
        onRepeatParams: [p]

    });

    particleCount++;
    particleCount = (particleCount >= numParticles) ? 0 : particleCount

}

createParticles();

gsap.globalTimeline.timeScale(1.0);

function sparkle() {
    for (const p of particlePool) {
        playParticle(p);
    }
}
