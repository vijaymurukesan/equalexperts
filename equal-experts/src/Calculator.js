import React, { useState } from "react";
import logo from "./logo.svg";

const Calculator = () => {
  const [inputValues, setInputValues] = useState([]);
  const [display, setDisplay] = useState("");
  const keypad = {
    expressions: ["AC", "+/-", "+", "*", "-", "/", "←", "="],
    keys: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  };

  const isExpression = (value) => keypad.expressions.includes(value);

  const checkValidInput = (value) => {
    const isNumber = !isNaN(value);
    return isExpression(value) || isNumber;
  };

  const displayOutput = (inputs) => {
    const output = inputs.reduce(
      (acc, item) => checkValidInput(item) && acc.concat(item),
      ""
    );
    return output;
  };

  const handleKeypress = (event) => {
    const eventValue = event.currentTarget.textContent;

    if (eventValue !== "←" && eventValue !== "=" && eventValue !== "+/-") {
      const invalidFirstValue = isExpression(eventValue);
      const invalidLastValue =
        isExpression(inputValues[inputValues.length - 1]) &&
        isExpression(eventValue);
      const numbers =
        inputValues.length === 0
          ? invalidFirstValue
            ? []
            : [eventValue]
          : invalidLastValue
          ? inputValues
          : [...inputValues, eventValue];
      setDisplay(displayOutput(numbers));
      setInputValues(numbers);
    }
    switch (eventValue) {
      case "AC": {
        setDisplay(displayOutput([]));
        setInputValues([]);
        break;
      }
      case "←": {
        if (inputValues.length === 1) {
          setDisplay(displayOutput([]));
          setInputValues([]);
        } else {
          setInputValues(inputValues.slice(0, inputValues.length - 1));
          setDisplay(
            displayOutput(inputValues.slice(0, inputValues.length - 1))
          );
        }
        break;
      }
      case "+/-": {
        let updatedArray = inputValues;
        const listOfExp = inputValues.reduce((acc, item, index) => {
          isExpression(item) && acc.push(index);
          return acc;
        }, []);
        const insertIndex = listOfExp[listOfExp.length - 1];
        if (
          eventValue === "+/-" &&
          inputValues[listOfExp[listOfExp.length - 1]] === "-"
        ) {
          updatedArray.splice(insertIndex, 1, "");
          setInputValues(updatedArray);
          setDisplay(displayOutput(updatedArray));
          break;
        }
        if (listOfExp.length === 0) {
          updatedArray = ["-", ...inputValues];
        } else {
          updatedArray.splice(insertIndex + 1, 0, "-");
        }
        setInputValues(updatedArray);
        setDisplay(displayOutput(updatedArray));
        break;
      }
      case "=": {
        const output = eval(displayOutput(inputValues));
        setDisplay(output);
        setInputValues([`${output}`]);
        break;
      }
      default:
        return;
    }
  };
  const renderButtons = (list) =>
    list.map((keyType) => (
      <button
        onClick={handleKeypress}
        key={keyType}
        className={`keyType_${keyType}`}
      >
        {keyType}
      </button>
    ));

  return (
    <div className="app">
      <div role="banner" aria-describedby="info">
        <img src={logo} className="appLogo" alt="equal experts" />
        <p className="ariaHide" id="info">
          This is calculator powered by equal experts
        </p>
      </div>
      <div
        className="display"
        role="alert"
        aria-live="assertive"
        aria-labelledby="Selected Number display"
      >
        {display}
      </div>
      <div className="keypad">
        <div className="expressionKeys" role="group">
          {renderButtons(keypad.expressions)}
        </div>
        <div className="numberKeys" role="group">
          {renderButtons(keypad.keys)}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
