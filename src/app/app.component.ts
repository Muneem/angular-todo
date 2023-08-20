import { Component } from '@angular/core';
import { Task } from './task.model';
import { TaskFactory } from './task.factory';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  todoTasks: Task[] = [];
  private taskFactory: TaskFactory = new TaskFactory();

  constructor(private taskService: TaskService) {}

  addTask(newTaskTitle: string): void {
    const newTask: Task = this.taskFactory.createTask(this.todoTasks.length + 1, newTaskTitle, false);
    this.taskService.addTask(newTask);
  }
}
