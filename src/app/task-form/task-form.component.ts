import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  newTaskTitle = '';

  @Output() addTask: EventEmitter<string> = new EventEmitter<string>();

  onSubmit(): void {
    if (this.newTaskTitle.trim()) {
      this.addTask.emit(this.newTaskTitle);
      this.newTaskTitle = '';
    }
  }
}
