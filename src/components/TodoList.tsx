import React from "react";
import { Todo } from "../model";
import "./styles.css";
import TodoItem from "./TodoItem";

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todoList, setTodoList }) => {
  return (
    <div className="todos">
      {todoList.map((todo) => (
        <TodoItem
          item={todo}
          key={todo.id}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      ))}
    </div>
  );
};

export default TodoList;
