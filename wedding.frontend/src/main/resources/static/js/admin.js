// ------------------- Моковые данные -------------------
let guests = [
    { id: 1, name: 'Иван', companion: 'Ольга', status: 'pending' },
    { id: 2, name: 'Сергей', companion: '', status: 'confirmed' },
    { id: 3, name: 'Мария', companion: 'Анна', status: 'declined' }
];

let events = [
    { id: 1, order: 1, date: '2026-07-17', time: '11:30', title: 'Торжественная роспись', location: 'ЗАГС', description: 'Приглашаем гостей' },
    { id: 2, order: 2, date: '2026-07-17', time: '12:00', title: 'Фуршет', location: 'Фуршет в ЗАГСе', description: 'После росписи' }
];

// ------------------- Селекторы -------------------
const guestTableBody = document.querySelector('#guestTable tbody');
const eventsTableBody = document.querySelector('#eventsTable tbody');
const addEventBtn = document.getElementById('addEventBtn');

// ------------------- Рендер гостей -------------------
function renderGuests() {
    guestTableBody.innerHTML = '';
    guests.forEach(g => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${g.id}</td>
            <td>${g.name}</td>
            <td>${g.companion || '-'}</td>
            <td class="status-${g.status}">${g.status}</td>
            <td>
                <button class="editGuest" data-id="${g.id}">Редактировать</button>
                <button class="deleteGuest" data-id="${g.id}">Удалить</button>
                <button class="getInvite" data-id="${g.id}">Получить приглашение</button>
            </td>
        `;
        guestTableBody.appendChild(tr);
    });

    guestTableBody.querySelectorAll('.editGuest').forEach(btn => {
        btn.addEventListener('click', () => openGuestModal(Number(btn.dataset.id)));
    });
    guestTableBody.querySelectorAll('.deleteGuest').forEach(btn => {
        btn.addEventListener('click', () => deleteGuest(Number(btn.dataset.id)));
    });
    guestTableBody.querySelectorAll('.getInvite').forEach(btn => {
        btn.addEventListener('click', () => alert(`Сформировано приглашение для гостя ID=${btn.dataset.id}`));
    });
}

function deleteGuest(id) {
    if (confirm('Удалить гостя?')) {
        guests = guests.filter(g => g.id !== id);
        renderGuests();
    }
}

// ------------------- Рендер событий -------------------
function renderEvents() {
    eventsTableBody.innerHTML = '';
    events.sort((a,b) => a.order - b.order);
    events.forEach(ev => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${ev.order}</td>
            <td>${ev.date}</td>
            <td>${ev.time}</td>
            <td>${ev.title}</td>
            <td>${ev.location}</td>
            <td>${ev.description}</td>
            <td>
                <button class="editEvent" data-id="${ev.id}">Редактировать</button>
                <button class="deleteEvent" data-id="${ev.id}">Удалить</button>
            </td>
        `;
        eventsTableBody.appendChild(tr);
    });

    eventsTableBody.querySelectorAll('.editEvent').forEach(btn => {
        btn.addEventListener('click', () => openEventModal(Number(btn.dataset.id)));
    });
    eventsTableBody.querySelectorAll('.deleteEvent').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.dataset.id);
            if(confirm('Удалить событие?')) {
                events = events.filter(ev => ev.id !== id);
                renderEvents();
            }
        });
    });
}

// ------------------- Модальные окна -------------------
function initModals() {
    const guestModal = document.getElementById('guestModal');
    const eventModal = document.getElementById('eventModal');

    document.getElementById('closeGuestModal').onclick = () => guestModal.style.display = 'none';
    document.getElementById('closeEventModal').onclick = () => eventModal.style.display = 'none';

    window.onclick = (event) => {
        if (event.target === guestModal) guestModal.style.display = 'none';
        if (event.target === eventModal) eventModal.style.display = 'none';
    };

    document.getElementById('guestForm').onsubmit = (e) => {
        e.preventDefault();
        const id = Number(document.getElementById('guestId').value);
        const name = document.getElementById('guestName').value;
        const companion = document.getElementById('guestCompanion').value;
        const status = document.getElementById('guestStatus').value;

        if(id) {
            const guest = guests.find(g => g.id === id);
            guest.name = name;
            guest.companion = companion;
            guest.status = status;
        } else {
            const newId = guests.length ? Math.max(...guests.map(g => g.id)) + 1 : 1;
            guests.push({ id: newId, name, companion, status });
        }

        guestModal.style.display = 'none';
        renderGuests();
    };

    document.getElementById('eventForm').onsubmit = (e) => {
        e.preventDefault();
        const id = Number(document.getElementById('eventId').value);
        const order = Number(document.getElementById('eventOrder').value);
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const title = document.getElementById('eventTitle').value;
        const location = document.getElementById('eventLocation').value;
        const description = document.getElementById('eventDescription').value;

        if(id) {
            const ev = events.find(ev => ev.id === id);
            ev.order = order;
            ev.date = date;
            ev.time = time;
            ev.title = title;
            ev.location = location;
            ev.description = description;
        } else {
            const newId = events.length ? Math.max(...events.map(ev=>ev.id))+1 : 1;
            events.push({ id: newId, order, date, time, title, location, description });
        }

        eventModal.style.display = 'none';
        renderEvents();
    };

    addEventBtn.onclick = () => openEventModal();
}

// ------------------- Открытие модалок -------------------
function openGuestModal(id) {
    const guestModal = document.getElementById('guestModal');
    guestModal.style.display = 'block';

    if(id) {
        const guest = guests.find(g => g.id === id);
        document.getElementById('guestId').value = guest.id;
        document.getElementById('guestName').value = guest.name;
        document.getElementById('guestCompanion').value = guest.companion;
        document.getElementById('guestStatus').value = guest.status;
    } else {
        document.getElementById('guestForm').reset();
        document.getElementById('guestId').value = '';
    }
}

function openEventModal(id) {
    const eventModal = document.getElementById('eventModal');
    eventModal.style.display = 'block';

    if(id) {
        const ev = events.find(ev => ev.id === id);
        document.getElementById('eventId').value = ev.id;
        document.getElementById('eventOrder').value = ev.order;
        document.getElementById('eventDate').value = ev.date;
        document.getElementById('eventTime').value = ev.time;
        document.getElementById('eventTitle').value = ev.title;
        document.getElementById('eventLocation').value = ev.location;
        document.getElementById('eventDescription').value = ev.description;
    } else {
        document.getElementById('eventForm').reset();
        document.getElementById('eventId').value = '';
    }
}
// Функция для открытия приглашения
document.getElementById('getInviteBtn').onclick = () => {
    const guestId = document.getElementById('guestId').value;
    if (!guestId) {
        alert('Сначала выберите гостя!');
        return;
    }
    const url = `http://localhost:9090/invite?guestId=${guestId}`;

    // Копируем в буфер обмена
    navigator.clipboard.writeText(url)
        .then(() => {
            alert(`Ссылка для гостя ID=${guestId} скопирована в буфер обмена:\n${url}`);
        })
        .catch(err => {
            console.error('Ошибка копирования в буфер:', err);
        });
};



// Функция для генерации PDF с QR-кодом
document.getElementById('generatePdfBtn').onclick = () => {
    const guestId = document.getElementById('guestId').value;
    if (!guestId) return alert('Сначала выберите гостя!');
    const url = `http://localhost:9090/invite?guestId=${guestId}`;

    // Создаем QR-код
    const qrContainer = document.createElement('div');
    new QRCode(qrContainer, {
        text: url,
        width: 200,
        height: 200
    });

    // Создаем PDF
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('Приглашение на свадьбу', 20, 20);
    pdf.text(`Гость ID: ${guestId}`, 20, 30);
    pdf.text('Сканируйте QR-код для получения приглашения:', 20, 40);

    // Добавляем QR-код в PDF
    const qrCanvas = qrContainer.querySelector('canvas');
    if (qrCanvas) {
        const imgData = qrCanvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 60, 50, 90, 90);
    }

    pdf.save(`invite_guest_${guestId}.pdf`);
};

// ------------------- Инициализация -------------------
document.addEventListener('DOMContentLoaded', () => {
    renderGuests();
    renderEvents();
    initModals();
});
