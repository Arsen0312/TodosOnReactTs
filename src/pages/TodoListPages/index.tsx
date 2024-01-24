import { url } from "inspector";
import Todos from "../../components/Todos";
import { useContext, useEffect } from "react";
import { todosContext } from "../../context";

const TodoListPages = () => {
    const { getTodos } = useContext(todosContext)

    useEffect(() => {
        getTodos?.()
    }, [])

    return (
        <div>
            <Todos/>
        </div>
    );
};

export default TodoListPages;