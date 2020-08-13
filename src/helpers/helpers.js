export const randomPosition = (limitLeft, limitBottom) => {
    const randomPosition = (limit) => `${Math.floor(Math.random() * limit) + 1}%`;
    const left = randomPosition(limitLeft || 0);
    const bottom = randomPosition(limitBottom || 0);
    return {left, bottom}
}