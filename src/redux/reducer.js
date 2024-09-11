const initialState = {
  formula: '0',
  isEval: false,
};

function calculatorReducer(state = initialState, action) {
  switch (action.type) {
    case 'HANDLE_INPUT': {
      const { value } = action.payload;
      let newFormula = state.formula;

      if (/^0$/.test(newFormula) && value !== '.') {
        newFormula = value;
      } else if (
        (/^-/.test(newFormula) || /[/*+]-$/.test(newFormula)) &&
        value === '-'
      ) {
        return state; // No change in formula if consecutive "-" is entered
      } else if (/-$/.test(newFormula) && value === '-') {
        newFormula = newFormula.slice(0, -1) + '+';
      } else if (/[+/*]-$/.test(newFormula) && /[+*/]/.test(value)) {
        newFormula = newFormula.slice(0, -2) + value;
      } else if (
        (/[0-9]+\.[0-9]+$/.test(newFormula) || /[0-9]+\.$/.test(newFormula)) &&
        value === '.'
      ) {
        return state; // Ignore consecutive decimals
      } else if (state.isEval && /[-+/*]/.test(value)) {
        newFormula = state.formula + value;
      } else if (state.isEval && /[0-9]/.test(value)) {
        newFormula = value;
      } else if (/[+/*-]$/.test(newFormula) && /[+/*]/.test(value)) {
        newFormula = newFormula.slice(0, -1) + value;
      } else {
        newFormula += value;
      }

      return {
        ...state,
        formula: newFormula,
        isEval: false,
      };
    }

    case 'HANDLE_EVAL': {
      let result;
      try {
        result = parseFloat(
          new Function(`return (${state.formula})`)().toFixed(10)
        );
      } catch (error) {
        result = 'Error';
      }
      return {
        ...state,
        formula: result.toString(),
        isEval: true,
      };
    }

    case 'HANDLE_CLEAR':
      return {
        ...state,
        formula: '0',
      };

    case 'HANDLE_DELETE':
      return {
        ...state,
        formula: state.formula.length === 1 ? '0' : state.formula.slice(0, -1),
      };

    default:
      return state;
  }
}

export default calculatorReducer;
