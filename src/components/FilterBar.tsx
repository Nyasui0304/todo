import { FilterType, PriorityFilter, Todo } from '../types/todo';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  filter: FilterType;
  priorityFilter: PriorityFilter;
  onFilterChange: (filter: FilterType) => void;
  onPriorityFilterChange: (priority: PriorityFilter) => void;
  allTodos: Todo[];
}

export const FilterBar = ({
  filter,
  priorityFilter,
  onFilterChange,
  onPriorityFilterChange,
  allTodos,
}: FilterBarProps) => {
  const activeCount = allTodos.filter((todo) => !todo.completed).length;
  const completedCount = allTodos.filter((todo) => todo.completed).length;

  return (
    <div className={styles.filterBar}>
      <div className={styles.statusFilters}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => onFilterChange('all')}
        >
          すべて ({allTodos.length})
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
          onClick={() => onFilterChange('active')}
        >
          未完了 ({activeCount})
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          完了 ({completedCount})
        </button>
      </div>

      <div className={styles.priorityFilter}>
        <label className={styles.label}>優先度:</label>
        <select
          className={styles.select}
          value={priorityFilter}
          onChange={(e) => onPriorityFilterChange(e.target.value as PriorityFilter)}
        >
          <option value="all">すべて</option>
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
      </div>
    </div>
  );
};
