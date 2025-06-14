// utils/location.ts
export const getUserCountryCode = async (): Promise<string | null> => {
    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        return data.country_code || null;
    } catch (err) {
        console.error("Failed to fetch user country:", err);
        return null;
    }
};
