import React from 'react';
import ReactDOM from 'react-dom/client';

function Button({id, value, handleInput, handleClear, handleDelete, handleEval}) {
    return (
      <button
        type="button"
        id={id}
        value={value}
        onClick={
          value === "AC"
            ? handleClear
            : value === "DE"
            ? handleDelete
            : value === '='
            ? (e) => handleEval(e)
            : (e) => handleInput(e)
        }
      >
        {value}
      </button>
    );
}

function Calculator() {  // Rename App to Calculator
  const [formula, setFormula] = React.useState("0");
  const [isEval, setIsEval] = React.useState(false);

  const handleInput = (e) => {
    if (/^0$/.test(formula) && e.target.value !== ".") {
      setFormula(e.target.value);
      setIsEval(false);
    } else if (
      (/^[\-]$/.test(formula) || /[/*+][\-]$/.test(formula)) &&
      e.target.value === "-"
    ) {
      setIsEval(false);
      return;
    } else if (/[\-]$/.test(formula) && e.target.value === "-") {
      setFormula((prev) => prev.slice(0, -1) + "+");
    } else if (/[+/*][\-]$/.test(formula) && /[+*/]/.test(e.target.value)) {
      setFormula((prev) => prev.slice(0, -2) + e.target.value);
    } else if (
      (/[0-9]+[.][0-9]+$/.test(formula) || /[0-9]+[.]$/.test(formula)) &&
      e.target.value === "."
    ) {
      setIsEval(false);
      return;
    } else if (isEval && /[-+/*]/.test(e.target.value)) {
      setFormula((prev) => prev + e.target.value);
      setIsEval(false);
    } else if (isEval && /[0-9]/.test(e.target.value)) {
      setFormula(e.target.value);
      setIsEval(false);
    } else if (/[+/*-]$/.test(formula) && /[+/*]/.test(e.target.value)) {
      setFormula((prev) => prev.slice(0, -1) + e.target.value);
      setIsEval(false);
    } else {
      setFormula((prev) => prev + e.target.value);
      setIsEval(false);
    }
  };

  const handleEval = (e) => {
    setFormula((prev) => parseFloat(eval(prev).toFixed(10)));
    setIsEval(true);
  };

  const handleClear = () => {
    setFormula("0");
  };

  const handleDelete = () => {
    if (/^[0-9\-/*+]$/.test(formula)) {
      setFormula("0");
    } else {
      setFormula((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="container">
      <div id="display" className="display">
        {formula}
      </div>
      <div className="buttons">
        <Button id="clear" value="AC" handleClear={handleClear} />
        <Button id="delete" value="DE" handleDelete={handleDelete} />
        <Button id="divide" value="/" handleInput={handleInput} />
        <Button id="multiply" value="*" handleInput={handleInput} />
        <Button id="seven" value="7" handleInput={handleInput} />
        <Button id="eight" value="8" handleInput={handleInput} />
        <Button id="nine" value="9" handleInput={handleInput} />
        <Button id="subtract" value="-" handleInput={handleInput} />
        <Button id="four" value="4" handleInput={handleInput} />
        <Button id="five" value="5" handleInput={handleInput} />
        <Button id="six" value="6" handleInput={handleInput} />
        <Button id="add" value="+" handleInput={handleInput} />
        <Button id="one" value="1" handleInput={handleInput} />
        <Button id="two" value="2" handleInput={handleInput} />
        <Button id="three" value="3" handleInput={handleInput} />
        <Button id="equals" value="=" handleEval={handleEval} />
        <Button id="zero" value="0" handleInput={handleInput} />
        <Button id="decimal" value="." handleInput={handleInput} />
      </div>
    </div>
  );
}

export default Calculator;
