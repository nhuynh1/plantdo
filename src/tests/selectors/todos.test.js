import moment from 'moment';
import { sortTodosByDate } from '../../selectors/todos';
import todos from '../fixtures/todos';

const dateFormat = 'YYYY-MM-DD';

test('should include one day of tasks', () => {
    const daysFromToday = 1;
    const numDays = 1;
    const selectedTodos = sortTodosByDate(todos, daysFromToday, numDays);
    expect(selectedTodos).toEqual([
        [ moment().subtract(daysFromToday, 'day').format(dateFormat), [todos[1]] ]
    ]);
});

test('should include two days of tasks', () => {
    const daysFromToday = 10;
    const numDays = 2;
    const selectedTodos = sortTodosByDate(todos, daysFromToday, numDays);
    expect(selectedTodos).toEqual([
        [ moment().subtract(daysFromToday, 'day').format(dateFormat), [todos[3]] ],
        [ moment().subtract(daysFromToday + 1, 'day').format(dateFormat), []]
    ]);
});

test('should include three days of tasks', () => {
    const daysFromToday = 0;
    const numDays = 3;
    const selectedTodos = sortTodosByDate(todos, daysFromToday, numDays);
    expect(selectedTodos).toEqual([
        [ moment().format(dateFormat), [ todos[0], todos[2] ] ],
        [ moment().subtract(daysFromToday + 1, 'days').format(dateFormat), [ todos[1] ] ],
        [ moment().subtract(daysFromToday + 2, 'days').format(dateFormat), [] ]
    ]);
})