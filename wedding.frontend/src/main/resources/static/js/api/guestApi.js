const API_BASE = 'https://api-site.ru/api';

export async function loadGuestById(guestId) {
    const response = await fetch(`${API_BASE}/guests/${guestId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Guest not found');
    }

    return response.json();
}
