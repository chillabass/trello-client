import { createStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

export const store = createStore(rootReducer);

// export const store = configureStore({
//   reducer: {
//     users: userReducer,
//     desks: deskReducer,
//     columns: columnReducer,
//     tasks: taskReducer,
//   },
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;