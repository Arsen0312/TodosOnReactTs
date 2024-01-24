import React, { useCallback, useContext } from 'react';
import { TTodo, todosContext } from '../../../../context/todos/TodosProvider';
import Button from '../../../UI/Button';
import Input from '../../../UI/Input';

interface ITodoProps {
    todo: TTodo
}

const Todo = ({ todo }: ITodoProps) => {
    const { removeTodo, completeTodo, toggleIsEdiId } = useContext(todosContext)

    const onRemove = useCallback(() => {
        removeTodo?.(todo.id)
    }, [])

    const onComplete = (() => {
        completeTodo?.(todo.id, todo.isComplited)
    })

    const onSaveEditId = (() => {
        toggleIsEdiId?.(todo.id)
    })

    return (
        <li className='liInUl'>
            <Input
                checked={todo.isComplited}
                type="checkbox"
                className='checItp'
                onChange={onComplete}
            />
            <span className='textInSpan' > {todo.title} </span>
            <div>
                <Button onClick={onSaveEditId}> Изменить </Button>
                <Button onClick={onRemove}>DELITE</Button>
            </div>
        </li>
    );
};

export default Todo;