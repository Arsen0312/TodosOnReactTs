import { TTodosContext, todosContext } from "./TodosProvider";

type TAction = {
    type : string,
    payload ?: any
}

export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST"
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS"
export const GET_TODOS_FAILURE = "GET_TODOS_FAILURE"

export const ADD_TODO_REQUEST = "ADD_TODO_REQUEST"
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS"
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE"

export const REMOVE_TODO_REQUEST = "REMOVE_TODO_REQUEST"
export const REMOVE_TODO_SUCCESS = "REMOVE_TODO_SUCCESS"
export const REMOVE_TODO_FAILURE = "REMOVE_TODO_FAILURE"

export const COMPLETE_TODO_REQUEST = "COMPLETE_TODO_REQUEST"
export const COMPLETE_TODO_SUCCESS = "COMPLETE_TODO_SUCCESS"
export const COMPLETE_TODO_FAILURE = "COMPLETE_TODO_FAILURE"

export const EDIT_TODO_REQUEST = "EDIT_TODO_REQUEST"
export const EDIT_TODO_SUCCESS = "EDIT_TODO_SUCCESS"
export const EDIT_TODO_FAILURE = "EDIT_TODO_FAILURE"

export const TOGGLE_IS_EDIT = "TOGGLE_IS_EDIT"

export default (state :TTodosContext, action: TAction) : TTodosContext => {
    switch(action.type) {
        case TOGGLE_IS_EDIT : {
            return {
                ...state,
                isEditId: action.payload ?? null
            }
        }
        case GET_TODOS_REQUEST : {
            return {
                ...state,
                loading: true
            }
        }
        case GET_TODOS_SUCCESS : {
            return {
                ...state,
                loading: false,
                todos: action.payload
            }
        }
        case GET_TODOS_FAILURE : {
            return {
                ...state,
                error : action.payload,
                loading : false 
            }
        }
        case ADD_TODO_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case ADD_TODO_SUCCESS: {
            return {
                ...state,
                loading: false,
                todos : [action.payload, ...state.todos]
            }
        }
        case ADD_TODO_FAILURE: {
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        }
        case REMOVE_TODO_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case REMOVE_TODO_SUCCESS: {
            return {
                ...state,
                loading: false,
                todos: state.todos.filter((todo) => {
                    return todo.id !== action.payload
                })
            }
        }
        case REMOVE_TODO_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case COMPLETE_TODO_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case COMPLETE_TODO_SUCCESS: {
            return {
                ...state,
                loading: false,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload) {
                        return {
                            ...todo,
                            isComplited: !todo.isComplited
                        }
                    } else {
                        return todo
                    }
                })
            }
        }
        case COMPLETE_TODO_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case EDIT_TODO_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case EDIT_TODO_SUCCESS: {
            return {
                ...state,
                loading: false,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            title: action.payload.title
                        }
                    } else return todo
                })
            }
        }
        case EDIT_TODO_FAILURE: {
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        }
        default: return state;
    }
}