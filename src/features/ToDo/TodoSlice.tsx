import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface Todo {
    id: number;
    task: string;
    done: boolean;
}
interface TodoState {
    items: Array<Todo>;
}
const initialState: TodoState = {
    items: [],
};
const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        add__todo: {
            reducer: (state, action: PayloadAction<Todo>) => {
                state.items.push(action.payload);
            },
            prepare(task: string): { payload: Todo } {
                return {
                    payload: {
                        id: Number(nanoid()),
                        task,
                        done: false,
                    },
                };
            },
        },
        del__todo: (state, action: PayloadAction<Todo>) => {
            state.items = state.items.filter((el: Todo) => {
                el.id !== action.payload.id;
            });
        },
        update__todo: (state, action: PayloadAction<Todo>) => {
            state.items = state.items.map((el: Todo) =>
                el.id === action.payload.id ? el.task : action.payload
            );
        },
    },
});
export const { add__todo, del__todo, update__todo } = todoSlice.actions;
export const selectTodoItems = (state: RootState) => state.todo.items;
export default todoSlice.reducer;
