export const formatDate = (date: string) => {
    const newDate = new Date(date);

    // Using UTC date for consistency between server and client components on production environment
    const day = String(newDate.getUTCDate()).padStart(2, "0");
    const month = String(newDate.getUTCMonth() + 1).padStart(2, "0");
    const year = newDate.getUTCFullYear();

    const hours = String(newDate.getUTCHours()).padStart(2, "0");
    const minutes = String(newDate.getUTCMinutes()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
};
