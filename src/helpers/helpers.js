export const randomPosition = (limitLeft, limitBottom) => {
    const randomPosition = (limit) => `${Math.floor(Math.random() * limit) + 1}%`;
    const left = randomPosition(limitLeft || 0);
    const bottom = randomPosition(limitBottom || 0);
    return {left, bottom}
}

export const numDaysByViewportWidth = (width) => {
    if (width >= 1300) return 3;
    if (width >= 900 && width < 1300) return 2;
    if (width < 900) return 1;
    return 0;
}