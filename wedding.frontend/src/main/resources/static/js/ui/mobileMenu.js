export function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.mynav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}
