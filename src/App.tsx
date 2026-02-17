import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';
import { useTodos } from './hooks/useTodos';
import styles from './App.module.css';

function App() {
  const {
    todos,
    allTodos,
    filter,
    priorityFilter,
    editingTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    setPriorityFilter,
    setEditingTodo,
  } = useTodos();

  const handleFormSubmit = (todoData: Parameters<typeof addTodo>[0]) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
    } else {
      addTodo(todoData);
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>📝 TODO App</h1>
          <p className={styles.subtitle}>
            タスクを管理して、生産性を向上させましょう
          </p>
        </header>

        <TodoForm
          onSubmit={handleFormSubmit}
          onCancel={() => setEditingTodo(null)}
          editingTodo={editingTodo}
        />

        <FilterBar
          filter={filter}
          priorityFilter={priorityFilter}
          onFilterChange={setFilter}
          onPriorityFilterChange={setPriorityFilter}
          allTodos={allTodos}
        />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onEdit={setEditingTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
