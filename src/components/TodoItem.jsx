import IconCheck from "./Icons/IconCheck";
import IconCross from "./Icons/IconCross";

const TodoItem = ({ todo, removeTodo, updateTodo }) => {
    const { id, title, completed } = todo;
    return (
        <>
            <article className="flex gap-4 border-b border-b-gray-600 dark:bg-gray-800">
                {/*  <button className="">
                    
                </button> */}
                <button
                    onClick={() => updateTodo(id)}
                    className={`h-5 w-5 flex-none rounded-full ${
                        completed
                            ? "grid place-content-center border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            : "inline-block border-2"
                    }`}
                >
                    {completed && <IconCheck></IconCheck>}
                </button>
                <p
                    className={`grow text-gray-600 dark:text-gray-400 ${completed && "line-through"}`}
                >
                    {title}
                </p>
                <button onClick={() => removeTodo(id)}>
                    <IconCross></IconCross>
                </button>
            </article>
        </>
    );
};
export default TodoItem;
