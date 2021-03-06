import React, { useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  item: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({ index, item, todoList, setTodoList }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(item.todo);

  const handleDone = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...item, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, todo: editTodo } : item
      )
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos_single"
          onSubmit={(e) => handleEdit(e, item.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todo_single_text"
            />
          ) : item.isDone ? (
            <s className="todo_single_text">{item.todo}</s>
          ) : (
            <span className="todo_single_text">{item.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !item.isDone) {
                  setEdit((edit) => !edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(item.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(item.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;
