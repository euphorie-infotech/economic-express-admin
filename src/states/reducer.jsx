export const initialState = {
  isLoggedIn: false,
  authToken: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setIsLoggedIn":
      return {
        ...state,
        isLoggedIn: action.item,
      };
    case "setAuthToken":
      return {
        ...state,
        authToken: action.item,
      };
    default:
      return state;
  }
};

export default reducer;
