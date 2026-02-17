import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({ todos, onToggle, onEdit, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>📝 タスクがありません</p>
        <p className={styles.emptySubtext}>上のフォームから新しいタスクを追加しましょう</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
