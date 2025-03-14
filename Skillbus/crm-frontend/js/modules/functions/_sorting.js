

export function sorting(data, prop) {
    console.log(prop)
    function byField(fieldName) {
        return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
    }
    const sorted = [...data].sort(byField(prop));
    return sorted;
}