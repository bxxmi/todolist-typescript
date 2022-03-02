import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// React.FC type: functional component를 의미
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  // model 디렉토리에서 생성된 interface를 사용할 것이고, 배열로 값이 들어가기 때문에 아래와 같은 구문을 사용
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [complete, setComplete] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodoList([...todoList, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todoList,
      completed = complete;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }

    setComplete(completed);
    setTodoList(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} onHandle={handleAdd} />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          completeList={complete}
          setCompleteList={setComplete}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
