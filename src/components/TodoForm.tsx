import { useState, useEffect, FormEvent } from 'react';
import { Todo } from '../types/todo';
import styles from './TodoForm.module.css';

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
  editingTodo?: Todo | null;
}

export const TodoForm = ({ onSubmit, onCancel, editingTodo }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || '');
      setPriority(editingTodo.priority);
      setDueDate(editingTodo.dueDate || '');
    }
  }, [editingTodo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
      completed: editingTodo?.completed || false,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    onCancel?.();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <input
          type="text"
          className={styles.input}
          placeholder="タスクのタイトル *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <textarea
          className={styles.textarea}
          placeholder="詳細説明（オプション）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>優先度</label>
          <select
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>期限</label>
          <input
            type="date"
            className={styles.input}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={styles.submitButton}>
          {editingTodo ? '更新' : '追加'}
        </button>
        {editingTodo && (
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
};
