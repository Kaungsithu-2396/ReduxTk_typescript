import {ChangeEvent, useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import {loadAllTodo, selectTodoItems, update__todo} from "./TodoSlice";
import { add__todo, Todo, del__todo } from "./TodoSlice";
function TodoUI() {
    const [text, setText] = useState("");
    const [edit, setEdit] = useState(false);
    const [updateTxt, setUpdateTxt] = useState("");
    const dispatch = useAppDispatch();
    const retrieveTodoItems = useAppSelector(selectTodoItems);
    useEffect(()=>{
        dispatch(loadAllTodo())
    },[])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const addTodoHandler = () => {
        dispatch(add__todo(text));
        console.log(retrieveTodoItems);
        setText("");
    };
    const delToDoHandler = (el: Todo) => {
        dispatch(del__todo(el));
    };
    const updateHandler = (el: Todo) => {
        setEdit(true);
        const payload: Todo = { ...el, title: updateTxt };
       if(updateTxt){
           dispatch(update__todo(payload));
            setEdit(false);

       }

    };

    return (
        <>
            <div className="">
                <input
                    type="text"
                    name=""
                    id=""
                    value={text}
                    className="input"
                    onChange={onChangeHandler}
                />{" "}
                &nbsp;
                <button className="btn" onClick={addTodoHandler}>
                    Add
                </button>
            </div>
            <div className="output">
                {retrieveTodoItems?.map((el: Todo) => {
                    return (
                        <div className="" key={el.id}>
                            <div className="">
                                <span>
                                    {!edit && el.title}
                                    {edit && (
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            onChange={(e) =>
                                                setUpdateTxt(e.target.value)
                                            }
                                        />
                                    )}
                                    <button onClick={() => delToDoHandler(el)}>
                                        Del
                                    </button>{" "}
                                    &nbsp;
                                    <button onClick={() => updateHandler(el)}>
                                        {edit ? "update" : "edit"}
                                    </button>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default TodoUI;
