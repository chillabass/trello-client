import { RootState } from "../store";

export const signout = (state: RootState) => {
  state.users.currentUser = {};
  state.users.isAuth = false;
  state.users.token = '';
  localStorage.removeItem('token');
};

// export const autoCompletedPopularRoutes: CaseReducer<ICruisesState, PayloadAction<IPopularRoute[]>> = (
//   state,
//   action,
// ) => ({
//   ...state,
//   completedPopularRoutes: action.payload
// })