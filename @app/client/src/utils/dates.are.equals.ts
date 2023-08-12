import getDateToString from "./get.date.to.string"

const isDatesAreEquals = (date1: Date, date2: Date): boolean => {
    return getDateToString(date1) === getDateToString(date2)
}

export default isDatesAreEquals;