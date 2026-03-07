export function renderEvents(events) {
    const container = document.querySelector('.events-container');
    if (!container) return;

    container.innerHTML = '';

    events.forEach(event => {
        const item = document.createElement('div');
        item.className = 'event-item';

        item.innerHTML = `
            <div class="event-time">
                <span class="time">${event.time}</span>
                <span class="date">${event.date}</span>
            </div>
            <div class="event-details">
                <h4>${event.title}</h4>
                <p class="event-location">${event.location}</p>
                <p class="event-description">${event.description}</p>
            </div>
        `;

        container.appendChild(item);
    });
}
