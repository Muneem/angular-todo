import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() type: string = '';
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  private tasksSubscription: Subscription = new Subscription();
  private completedTasksSubscription: Subscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });

    this.completedTasksSubscription = this.taskService.completedTasks$.subscribe(completedTasks => {
      this.completedTasks = completedTasks;
    });
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
    this.completedTasksSubscription.unsubscribe();
  }

  markAsChecked(task: Task): void {
    this.taskService.markAsDone(task);
  }

  deleteTodo(task: Task): void {
    this.taskService.deleteTask(task);
  }
}
