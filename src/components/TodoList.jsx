import { Draggable, Droppable } from '@hello-pangea/dnd';
import TodoItem from './TodoItem';

const TodoList = ({ todos, removeTodo, updateTodo }) => {
  return (
    <>
      <Droppable droppableId="todos">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className="mt-8 overflow-hidden rounded-t-md bg-white dark:bg-gray-800 [&>article]:p-4"
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} index={index} draggableId={`${todo.id}`}>
                {(draggableProvided) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.dragHandleProps}
                    {...draggableProvided.draggableProps}
                  ></TodoItem>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};
export default TodoList;
