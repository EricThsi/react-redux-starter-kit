import React, { ChangeEvent, KeyboardEvent, FC, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

import { Actions, ITodo } from '@store/actions/actionTypes';
import { TodoActions } from '@store/actions/actions';
import './todoForm.scss';

export interface ITodoForm {
  // handleTodoCreate?: (todo: ITodo) => void;
  dispatch: (action: TodoActions) => void;
}

const TodoForm: FC<ITodoForm> = (props: ITodoForm) => {
  const { dispatch, ...restProps } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState('');

  const handleTodoCreate = (todo: ITodo) => {
    dispatch({
      type: Actions.CREATE_ITEM,
      payload: todo,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState(event.target.value);
  };

  const handleInputEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newTodo: ITodo = {
        id: nanoid(),
        text: formState,
        isCompleted: false,
      };

      // Create new todo item
      handleTodoCreate(newTodo);

      // Reset the input field
      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
        setFormState('');
      }
    }
  };

  return (
    <div className="todo-form" {...restProps}>
      <input
        className="new-todo"
        ref={inputRef}
        type="text"
        placeholder="What needs to be done?"
        onChange={(event) => handleInputChange(event)}
        onKeyPress={(event) => handleInputEnter(event)}
      />
    </div>
  );
};

export default TodoForm;
