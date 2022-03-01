import React, { useRef } from "react";
import "./styles.css";

// 부모에게서 받은 props의 타입들을 지정한다.
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  onHandle: (e: React.FormEvent) => void;
}

// const InputField: React.FC<Props> = ({ todo, setTodo }) => { ... } 로도 타입 지정 가능
const InputField = ({ todo, setTodo, onHandle }: Props) => {
  // inputRef가 입력 요소임을 알도록 타입 지정
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        onHandle(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a task"
        className="input_box"
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
