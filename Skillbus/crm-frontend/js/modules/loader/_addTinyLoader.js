import { tinyLoader } from '../_iconSprite.js';

export function addTinyLoader(btn) {
    btn.innerHTML += tinyLoader;
    const svg = btn.querySelector('svg');
    svg.classList.add('animated-rotate');

    setTimeout(() => {
        svg.classList.remove('animated-rotate');
        svg.remove();
    }, 500)

    return btn
}