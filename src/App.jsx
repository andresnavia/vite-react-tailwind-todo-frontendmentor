import { DragDropContext } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import TodoComputed from './components/TodoComputed';
import TodoCreate from './components/TodoCreate';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';

// const initialStateTodos = [
//     {
//         id: 1,
//         title: "Ir al Gym",
//         completed: true,
//     },
//     {
//         id: 2,
//         title: "Terminar curso de react",
//         completed: false,
//     },
//     {
//         id: 3,
//         title: "Empezar documentacion de nueva arquitectura",
//         completed: false,
//     },
//     {
//         id: 4,
//         title: "pintar cuarto",
//         completed: false,
//     },
//     {
//         id: 5,
//         title: "llevar a mantenimiento el carro",
//         completed: false,
//     },
// ];
const initialStateTodos = JSON.parse(localStorage.getItem('todos')) || [];
const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const App = () => {
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId)
      return;

    setTodos((prevTasks) => reorder(prevTasks, source.index, destination.index));
  };

  const [todos, setTodos] = useState(initialStateTodos);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const createTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };
  const clearCompletedTodo = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };
  const [filter, setFilter] = useState('all');
  const changeFilter = (filter) => {
    setFilter(filter);
  };
  const filteredTodos = () => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const countCompletedTodo = filteredTodos().length;
  return (
    <>
      <div className="min-h-screen bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] md:bg-[url('./assets/images/bg-desktop-light.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]">
        <Header />
        <main className="container mx-auto mt-8 px-4 md:max-w-xl">
          <TodoCreate createTodo={createTodo} />
          <DragDropContext onDragEnd={handleDragEnd}>
            <TodoList
              todos={filteredTodos()}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            ></TodoList>
          </DragDropContext>

          <TodoComputed
            countCompletedTodo={countCompletedTodo}
            clearCompletedTodo={clearCompletedTodo}
          ></TodoComputed>
          <TodoFilter changeFilter={changeFilter} filter={filter}></TodoFilter>
        </main>

        <footer className="mt-8 text-center dark:text-gray-400">
          Drag and Drop to reorder list
        </footer>
      </div>
    </>
  );
};

export default App;
