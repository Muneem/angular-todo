import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from './task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [];
    private completedTasks: Task[] = [];

    private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
    private completedTasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

    tasks$: Observable<Task[]> = this.tasksSubject.asObservable();
    completedTasks$: Observable<Task[]> = this.completedTasksSubject.asObservable();

    constructor() {}

    addTask(newTask: Task): void {
        this.tasks.push(newTask);
        this.tasksSubject.next([...this.tasks]);
    }

    markAsDone(task: Task): void {
        task.done = true;
        this.tasks = this.tasks.filter(t => t !== task);
        this.completedTasks.push(task);
        this.tasksSubject.next([...this.tasks]);
        this.completedTasksSubject.next([...this.completedTasks]);
    }

    deleteTask(task: Task): void {
        this.tasks = this.tasks.filter(t => t !== task);
        this.completedTasks = this.completedTasks.filter(t => t !== task);
        this.tasksSubject.next([...this.tasks]);
        this.completedTasksSubject.next([...this.completedTasks]);
    }
}
