import moment from 'moment';

const todos = [
    {
        id: "abc123",
        dateActive: moment().valueOf(),
        dateAdded: moment().valueOf(),
        isComplete: false,
        task: "Write blog about React"
    },
    {
        id: "def456",
        dateActive: moment().subtract(1, 'day').valueOf(),
        dateAdded: moment().subtract(1, 'day').valueOf(),
        isComplete: true,
        task: "Clean oven"
    },
    {
        id: "ghj789",
        dateActive: moment().valueOf(),
        dateAdded: moment().subtract(2, 'days').valueOf(),
        isComplete: false,
        task: "Make chicken wings"
    },
    {
        id: "xyz889",
        dateActive: moment().subtract(10, 'days').valueOf(),
        dateAdded: moment().subtract(10, 'days').valueOf(),
        isComplete: true,
        task: "Write test cases"
    }
];

export { todos as default };