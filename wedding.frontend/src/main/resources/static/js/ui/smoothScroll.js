export function initSmoothScroll() {
    document.addEventListener('click', e => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const id = link.getAttribute('href');
        if (id === '#') return;

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();

        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
}
