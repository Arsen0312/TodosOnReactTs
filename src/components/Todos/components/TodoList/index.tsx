import { useContext } from "react";
import { todosContext } from "../../../../context";
import Todo from "../Todo";

const TodoList = () => {

    const { todos, loading } = useContext(todosContext)

    todos.sort((a, b) => a.id - b.id);

    console.log(todos)
    
    return todos.length ? (
            <ul style={{}} className="ulList">
            {todos.reverse().map(( todo ) => (
                <Todo todo={todo} key={todo.id} />
            ))}
        </ul>
        ) : (
            <h2>Хмммм.</h2>
        )
}

export default TodoList;