import {Component, EventEmitter, Output} from '@angular/core';
import { Task } from '../task.model';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass']
})
export class TaskFormComponent {
  @Output() addTask: EventEmitter<Task> = new EventEmitter();

  newTaskTitle: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.newTaskTitle.trim() !== '') {
      const newTask: Task = { id: Date.now(), title: this.newTaskTitle, done: false };
      this.addTask.emit(newTask);
      this.newTaskTitle = '';
    }
  }
}
