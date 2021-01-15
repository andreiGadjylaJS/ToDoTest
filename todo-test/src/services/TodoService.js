export default class TodoService {

    getTodos() {
        return (
            fetch("https://jsonplaceholder.typicode.com/todos")
                .then(result => result.json())
                .then(result => result.slice(0, 10))
                .then(result => this.getOptions(result))
        )
    }

    getOptions(result) {
        return result.map(item => {
            return {
                label: item.title,
                important: false,
                done: false,
                id: item.id,
            }
        })
    }

}

