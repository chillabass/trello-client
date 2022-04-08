import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../types/task";
import { ITaskObject, ITaskState } from "./sliceTask";

export const setOneTask: CaseReducer<ITaskState, PayloadAction<ITask>> = (state, action) => {
  state.tasks[action.payload.id] = action.payload;
};

export const setTasks: CaseReducer<ITaskState, PayloadAction<ITaskObject>> = (state, action) => ({
  ...state,
  tasks: action.payload,
});

export const resetTasks: CaseReducer<ITaskState> = (state) => ({
  ...state,
  tasks: {},
});

export const deleteTask: CaseReducer<ITaskState, PayloadAction<number>> = (state, action) => {
  delete state.tasks[action.payload];
};

export const moveTask: CaseReducer<ITaskState, PayloadAction<{ id: number; columnId: number; }>> = (state, action) => {
  state.tasks[action.payload.id].columnId = action.payload.columnId;
};
