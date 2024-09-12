import React from 'react';
import PropTypes from 'prop-types';

function Button({
  id,
  value,
  handleInput,
  handleClear,
  handleDelete,
  handleEval,
}) {
  const handleClick = (e) => {
    if (value === 'AC') handleClear();
    else if (value === 'DE') handleDelete();
    else if (value === '=') handleEval(e);
    else handleInput(e);
  };

  return (
    <button
      type="button"
      id={id}
      value={value}
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

// Add prop-types validation
Button.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleClear: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEval: PropTypes.func,
};

Button.defaultProps = {
  handleClear: () => {},
  handleDelete: () => {},
  handleEval: () => {},
};

function Calculator() {
  const [formula, setFormula] = React.useState('0');
  const [isEval, setIsEval] = React.useState(false);

  const handleInput = (e) => {
    const val = e.target.value;

    if (/^0$/.test(formula) && val !== '.') {
      setFormula(val);
      setIsEval(false);
    } else if (/^[\-]$/.test(formula) || /[/*+][-]$/.test(formula)) {
      if (val === '-') return;
      setFormula((prev) => prev.slice(0, -1) + val);
    } else if ((/[0-9]+[.][0-9]+$/.test(formula) || /[0-9]+[.]$/.test(formula)) && val === '.') {
      return;
    } else if (isEval && /[-+/*]/.test(val)) {
      setFormula((prev) => prev + val);
      setIsEval(false);
    } else if (isEval && /[0-9]/.test(val)) {
      setFormula(val);
      setIsEval(false);
    } else {
      setFormula((prev) => prev + val);
      setIsEval(false);
    }
  };

  const handleEval = () => {
    try {
      const result = parseFloat(Function(`"use strict"; return (${formula})`)().toFixed(10));
      setFormula(String(result));
      setIsEval(true);
    } catch (error) {
      setFormula('Error');
    }
  };

  const handleClear = () => {
    setFormula('0');
  };

  const handleDelete = () => {
    setFormula((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
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
