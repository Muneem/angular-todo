import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskFactory } from './task.factory';
import { TaskService } from './task.service';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';
import {TaskFormComponent} from "./task-form/task-form.component";
import {TaskListComponent} from "./task-list/task-list.component";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockTaskFactory: jasmine.SpyObj<TaskFactory>;
  const tasksSubject = new BehaviorSubject<Task[]>([]);

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj<TaskService>('TaskService', ['addTask']);
    mockTaskService.tasks$ = tasksSubject.asObservable();
    mockTaskService.completedTasks$ = tasksSubject.asObservable();
    mockTaskFactory = jasmine.createSpyObj<TaskFactory>('TaskFactory', ['createTask']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent, TaskFormComponent, TaskListComponent],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: TaskFactory, useValue: mockTaskFactory }
      ],
      imports: [FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should add task', () => {
    const completionSubject = new BehaviorSubject<boolean>(false); // Change false to true if needed
    const newTask: Task = {
      id: 1,
      title: 'New Task',
      done: false,
      completionSubject: completionSubject
    };
    mockTaskFactory.createTask.and.returnValue(newTask);
    mockTaskService.addTask.and.callFake(task => {
      expect(task).toEqual(newTask);
    });
  });


  afterEach(() => {
    fixture.destroy();
  });
});
