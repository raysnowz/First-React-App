import { useState } from "react";
import Button from "./Button";
import "./App.css";

const myBtn =["AC","DEL","/","7","8","9","*","4","5","6","+","3","2","1","-","0",".","=",];

function App() {
  const [Numbs, setNumbs] = useState("");
  const [result, setResult] = useState("");

  const arrOps = ["/", "*", "+", "-"];

  const handleNumbs = (e) => {
    let value = e.target.textContent;

    if (
      (arrOps.includes(value) && Numbs === "") ||  (arrOps.includes(Numbs.slice(-1)) && arrOps.includes(value))) {
      return;
    }

    setNumbs((dig) => dig + value);
  };

  const clear = () => {
    setNumbs("");
    setResult("");
  };

  const handleDelete = () => {
    let value = Numbs.slice(0, -1);
    setNumbs(value);

    if (result) {
      setResult(eval(Numbs).toString());
    }
  };

  const calculate = () => {
    let value = eval(Numbs).toString();
    setResult(value);
  };

  return (
    <>
      <Button />
      <div className='wrap'>
        <div className='display'>
          <p>{Numbs || "0"}</p>
          <p className='result'>{result ? result : ""}</p>
        </div>
        <div className='buttonWrap'>
          {myBtn.map((btn) => {
            return (
              <Button key={btn} value={btn} className={
                  btn === "="
                    ? "equals"
                    : btn === "AC" || btn === "DEL"
                    ? "control"
                    : btn === "*" || btn === "+" || btn === "/"                     || btn === "-"
                    ? "operator"
                    : ""
                }
                onClick={
                  btn === "="
                    ? calculate
                    : btn === "AC"
                    ? clear
                    : btn === "DEL"
                    ? handleDelete
                    : handleNumbs
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

