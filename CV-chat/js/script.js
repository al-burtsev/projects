gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText)

const startSection = document.getElementById('start-section');
const startBtn = document.getElementById('start-chat');
const cancelAnswers = document.querySelectorAll('.cancel-btn');
const chat = document.querySelector('.chat');
const messages = document.querySelectorAll('.message');
const attachImges = document.querySelectorAll('.attachment__img');
const cancelModal = document.getElementById('cancelModal');
const acceptModal = document.getElementById('acceptModal');
const acceptBtn = document.getElementById('acceptBtn');

const startTl = gsap.timeline();
const decisionTl = gsap.timeline({ paused: true });
const arrowTl = gsap.timeline({ paused: true });

decisionTl.to('.decision', {
    autoAlpha: 1,
    delay: 2,
    duration: 1,
    ease: 'sine.in'
})

arrowTl
    .to('.arrow-down', {
        autoAlpha: 1,
        ease: 'sign.in'
    })
    .to('.arrow-down', {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'sign.in'
    })

const q = gsap.utils.selector(startSection);
const firstTalk = q('.talk');
const notice = q('.notice');
const choice = q('.choice');

gsap.set(firstTalk, {
    transformOrigin: 'top left'
});

startTl
    .from(firstTalk, {
        scale: 0,
        opacity: 0,
        duration: 0.7,
        ease: 'power4.out',
    })
    .from(notice, {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: 'back.in',
    }, '+=1.5')
    .fromTo(choice, {
        opacity: 0,
        y: -25,
    }, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.inOut",
    }, '+=1')

messages.forEach((message, index) => {
    const talk = message.querySelector('.talk');
    const attachment = message.querySelector('.attachment');

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: message,
            start: `top ${10 + 10 * index}%`,
            end: 'bottom top',
            toggleActions: 'play none none none',
        },
        onComplete: () => {
            if (message.id === 'last-mess') {
                decisionTl.play();
            }

            arrowTl.play();
        }
    });

    tl.fromTo(talk, {
        scale: 0,
        opacity: 0,
        transformOrigin: 'top left'
    }, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: 'power4.out',
    });

    if (attachment) {
        tl.fromTo(attachment, {
            scale: 0,
            opacity: 0,
            transformOrigin: 'top left'
        }, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power4.out',
        }, '+=0.3');
    }
});

attachImges.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        const picture = e.target.closest('.attachment__img');
        const photo = picture.nextElementSibling;

        const picTl = gsap.timeline({ duration: 1, ease: "power4.out" });

        picTl
            .to(picture, {
                opacity: 0,
                duration: 1.2,
            })
            .set(picture, { height: 0, })
            .set(photo, { display: 'flex', opacity: 0, })
            .to(photo, {
                autoAlpha: 1,
                duration: 0.6,
            })
    });
});

cancelAnswers.forEach((answer) => {
    answer.addEventListener('click', () => {
        const farewellSplit = SplitText.create(".modal__link", { type: "words, chars" });

        const farewellTl = gsap.timeline();

        farewellTl
            .to('.page__body', {
                backgroundColor: 'black',
                duration: 0.6,
                ease: 'power4.out',
            })
            .to('.main', {
                opacity: 0,
                duration: 0.6,
                ease: 'power4.out',
            }, '<')
            .to(cancelModal, {
                autoAlpha: 1,
                duration: 1.5,
                ease: 'sine.in'
            }, '<-25%')
            .fromTo(farewellSplit.chars, {
                y: -100,
                opacity: 0,
                rotation: 45,
                scale: 2,
            }, {
                y: 0,
                rotation: "random(-100, 100)",
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.25,
                ease: 'power4.out',
            })
            .to('.modal__img', {
                rotation: 10,
                duration: 0.2,
                ease: 'elastic.out(1.6, 1)'
            }, '>-=0.25')
    });
});

startBtn.addEventListener('click', () => {
    gsap.to(window, {
        duration: .5,
        scrollTo: { y: '.message', offsetY: 65, },
        ease: "sine.inOut",
    });
    startBtn.style.pointerEvents = 'none';
    startBtn.nextElementSibling.style.pointerEvents = 'none';

}, { once: true });

acceptBtn.addEventListener('click', () => {
    acceptModal.classList.add('active');
})
