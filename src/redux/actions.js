export const handleInput = (value) => ({
  type: 'HANDLE_INPUT',
  payload: { value },
});

export const handleEval = () => ({
  type: 'HANDLE_EVAL',
});

export const handleClear = () => ({
  type: 'HANDLE_CLEAR',
});

export const handleDelete = () => ({
  type: 'HANDLE_DELETE',
});
