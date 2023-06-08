import {
    PayloadAction,
    createSlice,
    nanoid,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiLoadAllToDo } from "./ToDoAPI.tsx";

export interface Todo {
    userId?: string;
    id: string;
    title: string;
    completed?: boolean;
}
interface TodoState {
    items: Array<Todo>;
}
const initialState: TodoState = {
    items: [],
};
export const loadAllTodo = createAsyncThunk("todo/loadAllTodo", async () => {
    const response = await apiLoadAllToDo();
    const data = await response.json();
    return data;
});

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        add__todo: {
            reducer: (state, action: PayloadAction<Todo>) => {
                state.items.push(action.payload);
            },
            prepare(title: string): { payload: Todo } {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        completed: false,
                    },
                };
            },
        },
        del__todo: (state, action: PayloadAction<Todo>) => {
            state.items = state.items.filter((el: Todo) => {
                return el.id !== action.payload.id;
            });
        },
        update__todo: (state, action: PayloadAction<Todo>) => {
            state.items = state.items.map((el: Todo) =>
                el.id === action.payload.id ? action.payload : el
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllTodo.pending, (state) =>
                console.log("Pending state", state)
            )
            .addCase(loadAllTodo.fulfilled, (state, action) => {
                console.log(state);
                state.items = action.payload;
            });
    },
});
export const { add__todo, del__todo, update__todo } = todoSlice.actions;
export const selectTodoItems = (state: RootState) => state.todo.items;
export default todoSlice.reducer;
