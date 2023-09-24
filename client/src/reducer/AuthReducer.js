function AuthReducer(state, action) {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;

  switch (type) {
    case "GET_USER":
      return {
        ...state,
        isLoading: false,
        isAuthenticated,
        user,
      };

    default:
      return state;
  }
}

export default AuthReducer;
