function ordinalNumber(num) {
    const tenth = num % 10
    const hundred = num % 100
    if (tenth == 1 && hundred != 11) {
        return num + "st";
    }
    if (tenth == 2 && hundred != 12) {
        return num + "nd";
    }
    if (tenth == 3 && hundred != 13) {
        return num + "rd";
    }
    return i + "th";
}

module.exports = ordinalNumber