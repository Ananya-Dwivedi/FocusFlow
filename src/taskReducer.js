function taskReducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;

    case "ADD_TASK":
      return [...state, action.payload];

    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );

    case "UPDATE_TASK_STATUS":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              status: action.payload.status,
              completed: action.payload.status === "done",
            }
          : task,
      );

    default:
      return state;
  }
}

export default taskReducer;
