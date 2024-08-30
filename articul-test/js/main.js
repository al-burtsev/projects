'use strict';

const accordions = document.querySelectorAll(".acc-trigger");
const groups = [
    ['.hero__list', '.hero__title'],
    ['._step1', '._step2', '._step3', '._step4', '._step5',],
    ['.hero__positions', '.hero__bottom', '.vacancies'],
];
const arrow = [['.footer__container']]

function animateElements(elems) {

    elems.forEach((group, groupIndex) => {
        const delay = groupIndex === 1 ? 300 : 400;
        setTimeout(() => {
            group.forEach(className => {
                const item = document.querySelector(className);
                item.classList.add('animate');
            });
        }, delay * groupIndex);
    });
}

animateElements(groups);

accordions.forEach((item) => {
    item.addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight || panel.classList.contains('active')) {
            panel.style.maxHeight = null;
            setTimeout(() => {
                panel.classList.remove('active');
            }, 300)
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            setTimeout(() => {
                panel.classList.add('active');
            }, 300)
        }
    })
});

function showArrow() {
    const point = document.querySelector('.footer');
    const rect = point.getBoundingClientRect();
    const windowBottom = window.innerHeight;

    if (rect.top <= windowBottom && rect.bottom >= 0) {
        animateElements(arrow);

        window.removeEventListener('scroll', showArrow);
    }
}

window.addEventListener('scroll', showArrow);
