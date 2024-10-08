import { useState } from "react";

const TodoCreate = ({ createTodo }) => {
    const [title, setTitle] = useState("");
    const handleOnSumitAddTodo = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            return setTitle("");
        }
        createTodo(title);
        setTitle("");
    };
    return (
        <>
            <form
                onSubmit={handleOnSumitAddTodo}
                className="mt-8 flex items-center gap-4 overflow-hidden rounded-md bg-white px-4 py-4 dark:bg-gray-800"
            >
                <span className="inline-block h-5 w-5 rounded-full border-2"></span>
                <input
                    type="text"
                    className="w-full text-gray-400 outline-none dark:bg-gray-800"
                    placeholder="Create new todo ..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </form>
        </>
    );
};
export default TodoCreate;
