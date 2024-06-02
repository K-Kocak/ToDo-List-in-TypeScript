export type TaskType = "Leisure" | "Study" | "Work" | "Exercise";

export interface Task {
    title: string;
    description: string;
    date?: Date;
    deadline?: Date;
    isHighPriority: boolean;
    taskType: TaskType;
    isCompleted: boolean;
    id: string;
    isActive: boolean;
}

export interface taskDiv {
    Task: Task;
    IsActive: boolean;
}
