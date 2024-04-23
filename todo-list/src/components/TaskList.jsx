import TaskItem from './TaskItem'

import styles from './TaskList.module.css'

export const TaskList = ({task, deleteTask, updateTask}) => {
  return (
    <ul className={styles.task}>
        {task.sort((a, b) => b.id - a.id).map(task => (
            <TaskItem 
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
            />
        ))
        }
    </ul>
  )
}
