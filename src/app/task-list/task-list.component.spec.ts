import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  const tasksSubject = new BehaviorSubject<Task[]>([]);
  const completedTasksSubject = new BehaviorSubject<Task[]>([]);
  const task: Task = { id: 1, title: 'Task 1', done: false, completionSubject: new BehaviorSubject<boolean>(true) };
  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj<TaskService>('TaskService', ['markAsDone', 'deleteTask']);
    mockTaskService.tasks$ = tasksSubject.asObservable();
    mockTaskService.completedTasks$ = completedTasksSubject.asObservable();

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }]
    }).compileComponents();
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tasks in tasks list', () => {
    const tasks: Task[] = [
      { id: 1, title: 'Task 1', done: false, completionSubject: new BehaviorSubject<boolean>(true) },
      { id: 2, title: 'Task 2', done: false, completionSubject: new BehaviorSubject<boolean>(true) }
    ];
    tasksSubject.next(tasks);
    fixture.detectChanges();

    const taskElements = fixture.nativeElement.querySelectorAll('.task');
    expect(taskElements.length).toBe(2);
  });

  it('should display completed tasks in completed tasks list', () => {
    const completedTasks: Task[] = [
      { id: 3, title: 'Completed Task 1', done: true, completionSubject: new BehaviorSubject<boolean>(true) },
      { id: 4, title: 'Completed Task 2', done: true, completionSubject: new BehaviorSubject<boolean>(true) }
    ];
    completedTasksSubject.next(completedTasks);
    fixture.detectChanges();

    const completedTaskElements = fixture.nativeElement.querySelectorAll('.completed-task');
    expect(completedTaskElements.length).toBe(2);
  });

  it('should mark task as done on markAsChecked', () => {
    component.markAsChecked(task);
    expect(mockTaskService.markAsDone).toHaveBeenCalledWith(task);
  });

  it('should delete task on deleteTodo', () => {
    component.deleteTodo(task);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(task);
  });

  it('should unsubscribe from tasks subscription on ngOnDestroy', () => {
    spyOn(component['tasksSubscription'], 'unsubscribe'); // Access private property using class augmentation
    component.ngOnDestroy();
    expect(component['tasksSubscription'].unsubscribe).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
