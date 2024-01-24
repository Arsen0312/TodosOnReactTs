import { TodoForm, TodoList } from "./components"

const Todos = () => {
    return (
        <div>
            <h1 style={{fontSize:"150%", color:"white"}}>Todo Application</h1>
            <TodoForm/>
            <TodoList/>
            <span style={{position:"absolute", bottom:"0", right:"10%", fontSize:"10px"}}>Автор css стилей Мырзабеков Арсен</span>
        </div>
    )
}

export default Todos