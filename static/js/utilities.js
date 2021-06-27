function origin() {
    return window.location.origin
}

const isFirstDateInPast = (firstDate, secondDate) =>
    firstDate.setHours(0, 0, 0, 0) - secondDate.setHours(0, 0, 0, 0) < 0
