const getDateToString = (date: Date): string => {
    return [
        new Date(date).getDate(),
        new Date(date).getMonth(),
        new Date(date).getFullYear()
    ].toString();
}
export default getDateToString;