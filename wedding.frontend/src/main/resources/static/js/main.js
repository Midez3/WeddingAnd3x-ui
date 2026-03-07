import { loadGuestById } from './api/guestApi.js';
import { WeddingCountdown } from './timer/weddingCountdown.js';
import { adjustCountdownLayout } from './timer/countdownLayout.js';
import { initSmoothScroll } from './ui/smoothScroll.js';
import { initMobileMenu } from './ui/mobileMenu.js';
import { loadEvents } from './api/eventsApi.js';
import { renderEvents } from './ui/eventsRenderer.js';

document.addEventListener('DOMContentLoaded', async () => {

    initSmoothScroll();
    initMobileMenu();

    const block = document.querySelector('.groom-name');
    const block2 = document.querySelector('.section-title');


    const guest = block.dataset.guest;
    const add = block.dataset.add;

    const text = [guest, add].filter(v => v && v.trim()).join(' и ');

    if (text) {
        block.textContent = text;
        block2.textContent = text;
    } else {
        block.textContent = "Дорогой гость";
        block2.textContent = "Дорогой гость";
    }


    const events = await loadEvents();
    renderEvents(events);

    // Таймер
    new WeddingCountdown('2026-07-17T11:00:00');
    adjustCountdownLayout();
    window.addEventListener('resize', adjustCountdownLayout);

    // guestId из QR
    const params = new URLSearchParams(window.location.search);
    const guestId = params.get('guestId');

    if (guestId) {
        try {
            const guest = await loadGuestById(guestId);
            sessionStorage.setItem('guest', JSON.stringify(guest));
        } catch {
            window.location.href = '/error.html';
        }
    }

});



