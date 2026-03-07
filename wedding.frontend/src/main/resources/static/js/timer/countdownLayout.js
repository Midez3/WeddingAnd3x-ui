export function adjustCountdownLayout() {
    const timer = document.querySelector('.countdown-timer');
    if (!timer) return;

    const width = window.innerWidth;

    switch (true) {
        case width <= 480:
            timer.style.gap = '8px';
            setUnits(45, 20, 11);
            break;

        case width <= 576:
            timer.style.gap = '10px';
            setUnits(50, 24);
            break;

        case width <= 768:
            timer.style.gap = '15px';
            setUnits(60, 28);
            break;

        default:
            timer.style.gap = '30px';
            setUnits(60, 30);
    }
}

function setUnits(minWidth, fontSize, labelSize) {
    document.querySelectorAll('.time-unit').forEach(u => u.style.minWidth = `${minWidth}px`);
    document.querySelectorAll('.time-unit .number').forEach(n => n.style.fontSize = `${fontSize}px`);
    if (labelSize) {
        document.querySelectorAll('.time-unit .label')
            .forEach(l => l.style.fontSize = `${labelSize}px`);
    }
}
