//const API_BASE = 'https://api-site.ru/api';

//export async function loadEvents() {
//    const response = await fetch(`${API_BASE}/events`, {
//        method: 'GET',
//        headers: { 'Content-Type': 'application/json' }
//    });
//
//    if (!response.ok) {
//        throw new Error('Failed to load events');
//    }
//
//    return response.json();
//}

export async function loadEvents() {
    const response = await fetch('mock/events.json');

    if (!response.ok) {
        throw new Error('Ошибка загрузки событий');
    }

    return await response.json();
}

