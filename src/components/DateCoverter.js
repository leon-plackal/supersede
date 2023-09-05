function timeAgo(timestamp) {
    const now = new Date().getTime() / 1000; // Current timestamp in seconds
    const secondsAgo = Math.floor(now - timestamp);

    if (secondsAgo < 60) {
        return `${secondsAgo} second${secondsAgo === 1 ? '' : 's'} ago`;
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
    } else {
        const daysAgo = Math.floor(secondsAgo / 86400);
        return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
    }
}
export {timeAgo};