import { Todo } from '../types/todo';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const getPriorityClass = () => {
    switch (todo.priority) {
      case 'high':
        return styles.priorityHigh;
      case 'medium':
        return styles.priorityMedium;
      case 'low':
        return styles.priorityLow;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{todo.title}</h3>
          <span className={`${styles.priorityBadge} ${getPriorityClass()}`}>
            {todo.priority === 'high' && '高'}
            {todo.priority === 'medium' && '中'}
            {todo.priority === 'low' && '低'}
          </span>
        </div>

        {todo.description && (
          <p className={styles.description}>{todo.description}</p>
        )}

        <div className={styles.footer}>
          {todo.dueDate && (
            <span className={`${styles.dueDate} ${isOverdue ? styles.overdue : ''}`}>
              📅 {formatDate(todo.dueDate)}
              {isOverdue && ' (期限切れ)'}
            </span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.editButton}
          onClick={() => onEdit(todo)}
          title="編集"
        >
          ✏️
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(todo.id)}
          title="削除"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
