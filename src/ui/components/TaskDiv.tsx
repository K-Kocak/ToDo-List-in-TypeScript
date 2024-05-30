import { Task } from '@backend/task';

interface IProps {
    task: Task;
}

export function TaskDiv(props: IProps) {
    return(
        <div>
            Hi {props.task.title}
        </div>
    )
}

