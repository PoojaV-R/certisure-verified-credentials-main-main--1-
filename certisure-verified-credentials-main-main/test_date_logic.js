const dateStr = "26.09.2025";
console.log(`Testing parsing of: ${dateStr}`);

const parseCertificateDate = (str) => {
    // Check for DD/MM/YYYY or DD.MM.YYYY or DD-MM-YYYY
    const dmyMatch = str.match(/^(\d{1,2})[-./](\d{1,2})[-./](\d{4})$/);
    if (dmyMatch) {
        const p1 = parseInt(dmyMatch[1], 10);
        const p2 = parseInt(dmyMatch[2], 10);
        const year = parseInt(dmyMatch[3], 10);

        if (p1 > 12) return new Date(year, p2 - 1, p1);
        if (p2 > 12) return new Date(year, p1 - 1, p2);
        return new Date(year, p2 - 1, p1);
    }
    return new Date(str);
};

const result = parseCertificateDate(dateStr);
const today = new Date();

console.log(`Parsed Result: ${result.toDateString()}`);
console.log(`Is In Future? ${result > today}`);
console.log(`Note: Today is ${today.toDateString()}`);
