const numberRegex = /\d+/g
const TYPE = "Climb Type"
const SEND = "Send Type"
const TRIP = "Trip ID"

const parseId = id => parseInt(id.match(numberRegex)[0])

const yesNoToBoolean = l => l === 'y'

const getGradeAsNumber = (type, grade) => {
    type = type.toLowerCase()
    grade = grade.toLowerCase()
    if (type === 'sport' || type === 'trad') 
        return sportMap.get(grade)
    else
        return boulderMap.get(grade)
}

const getDate = date => {
    var [month, day, year] = date.split('-')
    return new Date(+year, month - 1, +day)
}

const sortByDate = (a, b) => {
    if (a.date == b.date)
        return b.height - a.height
    else
        return a.date - b.date
}

let urlIndex = 0

d3.csv('data/data.csv', d => ({
    id: parseId(d.ID),
    name: d.Name,
    grade: d.Grade.toLowerCase(),
    height: parseInt(d.Feet),
    type: d[TYPE].toLowerCase(),
    sendType: d[SEND].toLowerCase(),
    date: getDate(d.Date),
    send: yesNoToBoolean(d.Send),
    tripId: parseId(d[TRIP]),
    locationData: {
        area: d.Location,
        subArea: d.Area,
    },
    partners: d.Partners.split(", "),
    notes: d.Notes
}))
.then(csv => {
    let sorted = csv.sort(sortByDate)
    action('setData', sorted)
    d3.select(window).on('resize', update)
})
