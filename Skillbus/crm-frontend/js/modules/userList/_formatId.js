export function formatId(userId) {
    const shortId = userId.slice(0, 6);
    return `${shortId}`;
};