import { Component } from '@angular/core';
import { Task } from './task.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'my-app';
  todoTasks: Task[] = [];
  completedTasks: Task[] = [];

  addTask(task: Task): void {
    this.todoTasks.push(task);
  }

  markAsDone(task: Task): void {
    task.done = true;
    this.todoTasks = this.todoTasks.filter(t => t.id !== task.id);
    this.completedTasks.push(task);
  }

  deleteTask(task: Task): void {
    this.todoTasks = this.todoTasks.filter(t => t.id !== task.id);
    this.completedTasks = this.completedTasks.filter(t => t.id !== task.id);
  }
}
