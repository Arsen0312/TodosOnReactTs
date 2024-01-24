import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppButton, AppInput } from '../../../UI';
import { todosContext } from '../../../../context';

const TodoForm = () => {

    const { addTodos, isEditId , getTodos, todos, toggleIsEdiId, editTodo } = useContext(todosContext)
    const [text, setText] = useState("")

    useEffect(() => {
        if (isEditId) {
            console.log("da est")
            const editingTodo = todos.find(todo => todo.id === isEditId)
            if (editingTodo) {
            setText(editingTodo.title)
            }
        }
    },[isEditId])

    const onChange = useCallback((event : React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
        
    },[])

    const onClearForm = useCallback(() => {
        setText("")}
        ,[])

    const onCancelEditing = useCallback(() => {
        setText("")
        toggleIsEdiId?.()
    },[])

    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isEditId) {
            editTodo?.(isEditId, text, () => {
                onCancelEditing()
            })
            return 
        }

        addTodos?.(text, onClearForm)

    }

    return (
        <form 
        onSubmit={onSubmit}
        style={{display:"flex", justifyContent:"center"}}>
            <AppInput 
                value={text}
                onChange={onChange}
                placeholder='Текст' 
                    style={{width:"20%", outline:"none", borderRadius:"8px", padding:"5px", border:"1px solid grey", background:"rgba(0, 0, 0, 0.7)", fontSize:"80%", color:"white"}}/>
            <AppButton 
                type="submit"
            >
                {isEditId ? "Изменить" : "Добавить"} 
            </AppButton>
                {isEditId &&(
                    <AppButton
                        type='submit'
                        onClick={onCancelEditing}
                    >
                        Отмена
                    </AppButton>
                )}
            
        </form>
    );
};

export default TodoForm;