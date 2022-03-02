import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import "./styles.css";
import TodoItem from "./TodoItem";

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  completeList: Todo[];
  setCompleteList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todoList,
  setTodoList,
  completeList,
  setCompleteList,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodoList">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Active Tasks</span>
            {todoList.map((todo, index) => (
              <TodoItem
                index={index}
                item={todo}
                todoList={todoList}
                key={todo.id}
                setTodoList={setTodoList}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodoRemove">
        {(provided) => (
          <div
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Completed Tasks</span>
            {completeList.map((todo, index) => (
              <TodoItem
                index={index}
                item={todo}
                todoList={completeList}
                key={todo.id}
                setTodoList={setCompleteList}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
