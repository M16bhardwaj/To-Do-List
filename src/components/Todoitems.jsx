import { Trash, Check, Circle } from "lucide-react";

const Todoitems = (prop) => {
  return (
    <div className="flex hover:shadow-sm items-center mt-2 gap-[10px] px-[5px] border bg-gray-100/50 rounded-md py-[5px]">
      <div
        onClick={() => {
          prop.toggle(prop.id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        {prop.isComplete ? <Check className="text-green-500" size={16} /> : <Circle size={14} className="text-gray-600"/>}
        <p
          className={`text-slate-700 capitalize font-normal roboto-regular ml-2 text-[14px] decoration-slate-500 ${
            prop.isComplete ? "line-through" : ""
          }`}
        >
          {prop.text}
        </p>
      </div>
      <Trash
        onClick={() => {
          prop.deleteTodo(prop.id);
        }}
        className="w-3.5 cursor-pointer text-gray-700 hover:text-red-500"
      />
    </div>
  );
};

export default Todoitems;
