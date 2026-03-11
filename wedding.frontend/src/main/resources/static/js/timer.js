// Таймер обратного отсчета до свадьбы
class WeddingCountdown {
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
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();
        const diff = this.weddingDate - now;

        if (diff <= 0) {
            // Свадьба уже прошла
            this.showWeddingPassed();
            return;
        }

        // Расчет временных единиц
        const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Обновление DOM
        this.updateElement('weeks', weeks.toString().padStart(2, '0'));
        this.updateElement('days', days.toString().padStart(2, '0'));
        this.updateElement('hours', hours.toString().padStart(2, '0'));
        this.updateElement('minutes', minutes.toString().padStart(2, '0'));
        this.updateElement('seconds', seconds.toString().padStart(2, '0'));

        // Анимация при изменении секунд
        if (seconds === 59) {
            this.animateElement('minutes');
        }
        if (minutes === 59 && seconds === 59) {
            this.animateElement('hours');
        }
        if (hours === 23 && minutes === 59 && seconds === 59) {
            this.animateElement('days');
        }
        if (days === 6 && hours === 23 && minutes === 59 && seconds === 59) {
            this.animateElement('weeks');
        }
    }

    updateElement(id, value) {
        const element = this.elements[id];
        if (element && element.textContent !== value) {
            element.textContent = value;
            this.animateElement(id);
        }
    }

    animateElement(id) {
        const element = this.elements[id];
        if (element) {
            element.classList.add('pulse');
            setTimeout(() => {
                element.classList.remove('pulse');
            }, 300);
        }
    }

    showWeddingPassed() {
        // Показываем сколько дней прошло с момента свадьбы
        const now = new Date();
        const diff = now - this.weddingDate;
        const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24));

        document.querySelector('.countdown-timer').innerHTML = `
            <div class="wedding-passed">
                <div class="passed-icon">💕</div>
                <div class="passed-text">Мы женаты уже</div>
                <div class="passed-days">${daysPassed} дней</div>
            </div>
        `;
    }
}

// Стили для анимации пульсации
const pulseStyles = document.createElement('style');
pulseStyles.textContent = `
    .pulse {
        animation: pulse 0.3s ease-in-out;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    .wedding-passed {
        text-align: center;
        color: white;
    }

    .passed-icon {
        font-size: 48px;
        margin-bottom: 10px;
    }

    .passed-text {
        font-size: 18px;
        margin-bottom: 5px;
        opacity: 0.9;
    }

    .passed-days {
        font-size: 32px;
        font-weight: bold;
        font-family: 'Comfortaa', cursive;
    }
`;
document.head.appendChild(pulseStyles);

// Инициализация таймера при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Дата свадьбы: 17 июля 2026, 11:00
    const weddingDate = new Date('2026-07-17T11:00:00');
    window.weddingCountdown = new WeddingCountdown(weddingDate);
});

// Адаптация таймера под новую структуру (switch-case аналог)
function adjustCountdownLayout() {
    const countdownTimer = document.querySelector('.countdown-timer');
    if (!countdownTimer) return;

    const width = window.innerWidth;

    switch (true) {
        
        // <= 405px
        case width <= 405:
            countdownTimer.style.gap = '6px';
            document.querySelectorAll('.time-unit').forEach(unit => {
                unit.style.minWidth = '40px';
            });
            document.querySelectorAll('.time-unit .number').forEach(num => {
                num.style.fontSize = '15px';
            });
            document.querySelectorAll('.time-unit .label').forEach(label => {
                label.style.fontSize = '9px';
            });
            break;

        // <= 480px
        case width <= 480:
            countdownTimer.style.gap = '8px';
            document.querySelectorAll('.time-unit').forEach(unit => {
                unit.style.minWidth = '45px';
            });
            document.querySelectorAll('.time-unit .number').forEach(num => {
                num.style.fontSize = '20px';
            });
            document.querySelectorAll('.time-unit .label').forEach(label => {
                label.style.fontSize = '11px';
            });
            break;

        // <= 576px
        case width <= 576:
            countdownTimer.style.gap = '10px';
            document.querySelectorAll('.time-unit').forEach(unit => {
                unit.style.minWidth = '50px';
            });
            document.querySelectorAll('.time-unit .number').forEach(num => {
                num.style.fontSize = '24px';
            });
            break;

        // <= 768px
        case width <= 768:
            countdownTimer.style.gap = '15px';
            document.querySelectorAll('.time-unit').forEach(unit => {
                unit.style.minWidth = '60px';
            });
            document.querySelectorAll('.time-unit .number').forEach(num => {
                num.style.fontSize = '28px';
            });
            break;

        // > 768px (десктоп)
        default:
            countdownTimer.style.gap = '30px';
            document.querySelectorAll('.time-unit').forEach(unit => {
                unit.style.minWidth = '60px';
            });
            document.querySelectorAll('.time-unit .number').forEach(num => {
                num.style.fontSize = '30px';
            });
            break;
    }
}


// Вызываем при загрузке и изменении размера окна
document.addEventListener('DOMContentLoaded', adjustCountdownLayout);
window.addEventListener('resize', adjustCountdownLayout);