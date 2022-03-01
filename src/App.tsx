import React from "react";
import "./App.css";
import InputField from "./components/InputField";

// React.FC type: functional component를 의미
const App: React.FC = () => {
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField />
    </div>
  );
};

export default App;
