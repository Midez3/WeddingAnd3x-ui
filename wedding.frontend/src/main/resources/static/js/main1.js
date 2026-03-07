// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для всех ссылок с якорями
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Учитываем высоту меню

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Закрываем меню на мобильных устройствах
                if (window.innerWidth <= 768) {
                    document.querySelector('.mynav').style.display = 'none';
                    setTimeout(() => {
                        document.querySelector('.mynav').style.display = 'flex';
                    }, 300);
                }
            }
        });
    });

    // Добавление в календарь
    window.addToCalendar = function() {
        const event = {
            title: 'Свадьба Ивана и Ольги',
            description: 'Приглашение на свадьбу Ивана и Ольги. Адрес: Мега, банкетный зал, ул. Пушкина, 2, Моршанск',
            location: 'Моршанск ул. Пушкина, 2, Моршанск',
            startTime: '2026-07-17T16:00:00',
            endTime: '2026-07-17T23:00:00'
        };

        // Для Google Calendar
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=20260717T080000Z/20260717T200000Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&trp=true`;

        // Показываем выбор календаря
        if (confirm('Добавить событие в календарь? Вы будете перенаправлены в Google Calendar.')) {
            window.open(googleCalendarUrl, '_blank');
        }
    };

    // Отправка опроса
    window.submitSurvey = function() {
        const answers = {
            transfer: [],
            food: [],
            alcohol: []
        };

        // Собираем ответы
        document.querySelectorAll('input[name="transfer"]:checked').forEach(input => {
            answers.transfer.push(input.value);
        });

        document.querySelectorAll('input[name="food"]:checked').forEach(input => {
            answers.food.push(input.value);
        });

        document.querySelectorAll('input[name="alcohol"]:checked').forEach(input => {
            answers.alcohol.push(input.value);
        });

        // Проверяем, что есть хотя бы один ответ
        if (answers.transfer.length === 0 && answers.food.length === 0 && answers.alcohol.length === 0) {
            alert('Пожалуйста, ответьте хотя бы на один вопрос!');
            return;
        }

        // Здесь будет отправка на сервер
        // Временно просто показываем уведомление
        showNotification('Спасибо за ответы! Ваши предпочтения сохранены.');

        // Анимация отправки
        const button = document.querySelector('.submit-survey');
        const originalText = button.innerHTML;

        button.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
        button.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
            button.disabled = false;
        }, 3000);
    };

    // Уведомления
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Анимация появления
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Стили для уведомлений
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 10001;
            max-width: 300px;
            border-left: 4px solid #27ae60;
        }

        .notification.error {
            border-left-color: #e74c3c;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .notification i {
            font-size: 20px;
            color: #27ae60;
        }

        .notification.error i {
            color: #e74c3c;
        }

        .notification span {
            font-size: 14px;
            line-height: 1.4;
        }
    `;
    document.head.appendChild(notificationStyles);

    // Мобильное меню
    function initMobileMenu() {
        if (window.innerWidth <= 768) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.querySelector('.mymenu').prepend(menuToggle);

            menuToggle.addEventListener('click', function() {
                const nav = document.querySelector('.mynav');
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    }

    // Стили для мобильного меню
    const mobileMenuStyles = document.createElement('style');
    mobileMenuStyles.textContent = `
        .mobile-menu-toggle {
            position: absolute;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 24px;
            color: rgb(132, 137, 117);
            cursor: pointer;
            z-index: 1001;
            display: none;
        }

        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block;
            }

            .mynav {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
        }
    `;
    document.head.appendChild(mobileMenuStyles);

    // Инициализация мобильного меню
    initMobileMenu();
    window.addEventListener('resize', initMobileMenu);

    // Параллакс эффект для фона
    function initParallax() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElement = document.querySelector('.element6');

            if (parallaxElement) {
                parallaxElement.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    // Отключение параллакса на мобильных
    if (window.innerWidth > 768) {
        initParallax();
    }
});

// Функции для модального окна подтверждения
window.showConfirmation = function() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'flex';

    // Запускаем конфетти при подтверждении
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#8b4513', '#a0522d', '#f0e6d2', '#ffffff']
    });

    // Дополнительные эффекты
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 80,
            origin: { x: 0 },
            colors: ['#8b4513', '#a0522d', '#f0e6d2']
        });
    }, 250);

    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 80,
            origin: { x: 1 },
            colors: ['#8b4513', '#a0522d', '#f0e6d2']
        });
    }, 500);
};

window.hideConfirmation = function() {
    document.getElementById('confirmationModal').style.display = 'none';
};

// Закрытие модального окна при клике вне его
document.addEventListener('click', function(event) {
    const modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
        hideConfirmation();
    }
});

// Закрытие модального окна по Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideConfirmation();
    }
});


