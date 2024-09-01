//generateRandomColor
export const generateRandomColor = () => {
    // Helper function to generate a random value for a color component
    const randomColorComponent = () => {
        // Generate a value between 128 and 255 for brightness
        const minValue = 128;
        const maxValue = 255;
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    };

    // Generate the RGB components
    const r = randomColorComponent().toString(16).padStart(2, '0');
    const g = randomColorComponent().toString(16).padStart(2, '0');
    const b = randomColorComponent().toString(16).padStart(2, '0');

    // Combine them into a hex color code
    return `#${r}${g}${b}`;
};

export const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const validateEmail = (email) => {
    // Regular expression for validating an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression
    return emailRegex.test(email);
}

export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`.toString();
}