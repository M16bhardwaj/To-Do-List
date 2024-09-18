import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ListTodo, Plus } from "lucide-react";

import Todoitems from "./Todoitems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
    toast.success("Task added successfully");
  };
  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
    toast.error("Task deleted successfully");
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
    toast.info("Task updated successfully");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col px-[10px] py-[10px] min-h-[550px] rounded-xl roboto-regular">
      {/*--title--*/}

      <div className="flex items-center gap-2">
        {/* <img className='w-8' src={todo_icon} alt="" /> */}
        <ListTodo size={22} strokeWidth={1.5} className="text-gray-700" />
        <h1 className="text-md text-gray-700">Mukul-To-Do List</h1>
      </div>

      {/*--input-box--*/}

      <div className="flex items-center my-3 bg-gray-200 rounded-xl">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-[40px] pl-6 pr-2 placeholder:text-slate-600 text-sm text-gray-700"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="flex items-center justify-center border-none rounded-xl bg-orange-500 hover:bg-orange-600 w-[70px] h-[36px] mr-[3px] text-white cursor-pointer gap-[2px] text-sm"
        >
          Add
          <Plus size={16} className="text-white" />
        </button>
      </div>

      {/*--todo-list--*/}

      <div>
        {todoList.length === 0 ? (
          <p className="text-gray-500 text-sm text-center roboto-regular">
            No task available
          </p>
        ) : (
          todoList.map((todo) => {
            return (
              <Todoitems
                key={todo.id}
                {...todo}
                deleteTodo={deleteTodo}
                toggle={toggle}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Todo;
