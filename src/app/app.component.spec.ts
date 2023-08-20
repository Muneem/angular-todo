import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { Task } from './task.model';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, TaskFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new task to the todoTasks list', () => {
    const newTask: Task = { id: 1, title: 'New Task', done: false };
    component.addTask(newTask);

    expect(component.todoTasks.length).toBe(1);
    expect(component.todoTasks[0]).toEqual(newTask);
  });

  it('should mark a task as done', () => {
    const task: Task = { id: 1, title: 'Task', done: false };
    component.addTask(task);
    component.markAsDone(task);

    expect(task.done).toBe(true);
    expect(component.todoTasks.length).toBe(0);
    expect(component.completedTasks.length).toBe(1);
  });

  it('should delete a task', () => {
    const task: Task = { id: 1, title: 'Task', done: false };
    component.addTask(task);
    component.deleteTask(task);

    expect(component.todoTasks.length).toBe(0);
    expect(component.completedTasks.length).toBe(0);
  });
});
