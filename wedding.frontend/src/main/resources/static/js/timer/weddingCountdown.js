export class WeddingCountdown {
    constructor(weddingDate) {
        this.weddingDate = new Date(weddingDate);
        this.elements = {
            weeks: document.getElementById('weeks'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();
        const diff = this.weddingDate - now;

        if (diff <= 0) {
            clearInterval(this.interval);
            this.showWeddingPassed();
            return;
        }

        const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 7);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        this.updateElement('weeks', weeks);
        this.updateElement('days', days);
        this.updateElement('hours', hours);
        this.updateElement('minutes', minutes);
        this.updateElement('seconds', seconds);
    }

    updateElement(id, value) {
        const el = this.elements[id];
        const formatted = value.toString().padStart(2, '0');

        if (el && el.textContent !== formatted) {
            el.textContent = formatted;
            el.classList.add('pulse');
            setTimeout(() => el.classList.remove('pulse'), 300);
        }
    }

    showWeddingPassed() {
        document.querySelector('.countdown-timer').innerHTML = `
            <div class="wedding-passed">
                <div class="passed-icon">💕</div>
                <div class="passed-text">Мы женаты уже</div>
                <div class="passed-days">
                    ${Math.floor((Date.now() - this.weddingDate) / 86400000)} дней
                </div>
            </div>
        `;
    }
}
