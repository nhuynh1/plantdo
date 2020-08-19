import moment from 'moment';

// Configure moment calendar()
const dateFormat = 'MMM D, YYYY'
moment.updateLocale('en', {
    calendar: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastWeek: dateFormat,
        nextWeek: dateFormat,
        sameElse: dateFormat
    }
});

const sortTodosByDate = (todos, startDay, numDays) => {
    const startDateSeconds = moment().subtract(startDay, 'days').endOf('day').valueOf();
    const endDateSeconds = moment().subtract(startDay + numDays, 'days').endOf('day').valueOf();
    const datesArray = Array.from({ length: numDays }, (v, index) =>
        [moment().subtract(startDay + index, "days").format('YYYY-MM-DD'), []]
    )
    const dateMap = new Map(datesArray);
    todos.filter(todo => todo.dateActive <= startDateSeconds && todo.dateActive > endDateSeconds)
        .sort((a, b) => a.dateActive < b.dateActive ? 1 : -1)
        .forEach(todo => {
            const dateActiveString = moment(todo.dateActive).format('YYYY-MM-DD');
            dateMap.set(dateActiveString, [...dateMap.get(dateActiveString), todo]);
        })
    return [...dateMap];
}

export { sortTodosByDate };