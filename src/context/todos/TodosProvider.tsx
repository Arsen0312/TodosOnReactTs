import { createContext, useCallback, useReducer } from "react"
import initialState from "./initialState";
import reduser, { ADD_TODO_FAILURE, ADD_TODO_REQUEST, ADD_TODO_SUCCESS, COMPLETE_TODO_FAILURE, COMPLETE_TODO_REQUEST, COMPLETE_TODO_SUCCESS, EDIT_TODO_FAILURE, EDIT_TODO_REQUEST, EDIT_TODO_SUCCESS, GET_TODOS_FAILURE, GET_TODOS_REQUEST, GET_TODOS_SUCCESS, REMOVE_TODO_FAILURE, REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS, TOGGLE_IS_EDIT } from "./reduser";
import axios from "axios";

//* dispatcht (action) => action => reduser => store

const API_URL = "http://localhost:4001"

export type TTodo = {
    title : string,
    isComplited : boolean,
    id : number
}

export type TTodos = TTodo[]

export type TTodosContext = {
    todos: TTodos;
    loading : boolean;
    isEditId: null | number;
    error: unknown;
}

export type TTodosActions = {
    editTodo?: (id : number, newTitle : string, onSuccess: () => void) => Promise<void>
    getTodos?: () => Promise<void>
    addTodos?: (text : string, onClearForm: () => void) => void
    removeTodo?: (id : number) => Promise<void>
    completeTodo?: (id : number, isComplited : boolean) => Promise<void>
    toggleIsEdiId?: (id ?: number) => void
}

export const todosContext = createContext<TTodosContext & TTodosActions>(initialState)

const TodosProvider = ({ children }: React.PropsWithChildren) => {

    const [todosStore, dispatch ] = useReducer(reduser, initialState)

    const getTodos = useCallback(async () => {
        try {
        dispatch({type: GET_TODOS_REQUEST})
        const { data } = await axios(`${API_URL}/todos`)
        dispatch({type: GET_TODOS_SUCCESS, payload: data})
        } catch (error) { 
            dispatch({type : GET_TODOS_FAILURE, payload: error})
            console.log(error)
        }
     }, [])

    const addTodos = useCallback(async (text : string, onClearForm: ()=> void) => {
        try{
        dispatch({type : ADD_TODO_REQUEST})
        const newTodo = {
            title : text,
            isComplited: false
        }
        const { data } = await axios.post(`${API_URL}/todos`, newTodo)
        dispatch({type : ADD_TODO_SUCCESS, payload : data})
        onClearForm()
        } catch (error) {
            dispatch({type : ADD_TODO_FAILURE, payload : error})
        }
    },[])

    const removeTodo = useCallback(async(id :number) => {
        try {
            dispatch({type: REMOVE_TODO_REQUEST})
        
            await axios.delete(`${API_URL}/todos/${id}`)
            
            dispatch({type: REMOVE_TODO_SUCCESS, payload: id})
        } catch (error) {
            dispatch({type: REMOVE_TODO_FAILURE, payload: error})
        }
    },[])

    const completeTodo = useCallback(async (id : number, isComplited : boolean) => {
        try {
            dispatch({type: COMPLETE_TODO_REQUEST})

            await axios.patch(`${API_URL}/todos/${id}`, {isComplited : !isComplited})

            dispatch({type: COMPLETE_TODO_SUCCESS, payload: id})
        } catch (error) {
            dispatch({type: COMPLETE_TODO_FAILURE, payload: error})
        }
    },[])

    const editTodo = useCallback( async(id: number , newTitle : string, onSuccess: () => void) => {
        try {
            dispatch({type: EDIT_TODO_REQUEST})

            await axios.patch(`${API_URL}/todos/${id}`, { title : newTitle })

            dispatch({type: EDIT_TODO_SUCCESS, payload: {id, title: newTitle}})
            onSuccess()
        } catch (error) {
            dispatch({type : EDIT_TODO_FAILURE, payload: error})
        }
    },[])

    const toggleIsEdiId = useCallback ((id ?: number ) =>  {
        dispatch({type: TOGGLE_IS_EDIT , payload: id})
    },[])


    const value: TTodosContext & TTodosActions = {
        toggleIsEdiId,
        completeTodo,
        removeTodo,
        editTodo,
        getTodos,
        addTodos,
        ...todosStore
    }

    return (
        <todosContext.Provider 
            value={value}
        >
            {children}
        </todosContext.Provider>
    )
}

export default TodosProvider