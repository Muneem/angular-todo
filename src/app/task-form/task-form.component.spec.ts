import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import {FormsModule} from "@angular/forms";

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new task title', () => {
    const newTaskTitle = 'New Task';
    const addTaskSpy = spyOn(component.addTask, 'emit');

    component.newTaskTitle = newTaskTitle;
    component.onSubmit();

    expect(addTaskSpy).toHaveBeenCalledWith(newTaskTitle);
    expect(component.newTaskTitle).toBe('');
  });

  it('should not emit empty task title', () => {
    const addTaskSpy = spyOn(component.addTask, 'emit');

    component.newTaskTitle = '';
    component.onSubmit();

    expect(addTaskSpy).not.toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
