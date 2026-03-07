export function showNotification(text, type = 'success') {
    const el = document.createElement('div');
    el.className = `notification ${type}`;
    el.textContent = text;

    document.body.appendChild(el);

    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 300);
    }, 5000);
}
