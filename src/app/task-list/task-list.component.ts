import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Task } from '../task.model';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() markAsDone: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter<Task>();

  markAsChecked(task: Task): void {
    this.markAsDone.emit(task)
  }

  deleteTodo(task: Task): void {
    this.deleteTask.emit(task);
  }



}
