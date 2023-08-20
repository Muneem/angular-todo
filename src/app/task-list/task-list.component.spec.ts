import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list.component';
import { Task } from '../task.model'; // Import the Task model

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tasks', async () => {
    const tasks: Task[] = [ // Specify the type as Task[]
      { id: 1, title: 'Task 1', done: false },
      { id: 2, title: 'Task 2', done: true }
    ];
    component.tasks = tasks;
    fixture.detectChanges();
    // Wait for the component to stabilize after rendering
    await fixture.whenStable();

    const taskElements = fixture.nativeElement.querySelectorAll('.task');
    expect(taskElements.length).toBe(tasks.length);

    taskElements.forEach((taskElement: HTMLElement, index: number) => {
      const spanElement = taskElement.querySelector('span') as HTMLElement;
      const deleteButtonElement = taskElement.querySelector('button') as HTMLButtonElement;

      expect(spanElement.textContent?.trim()).toBe(tasks[index].title);
      expect(deleteButtonElement).toBeTruthy();
    });
  });

  it('should emit markAsDone event when button is clicked', () => {
    const task: Task = { id: 1, title: 'Task', done: false };
    component.tasks = [task];
    fixture.detectChanges();

    const markAsDoneSpy = spyOn(component.markAsDone, 'emit');

    const buttonElement = fixture.nativeElement.querySelector('button.btn-success') as HTMLButtonElement;
    buttonElement.click();
    fixture.detectChanges();

    expect(markAsDoneSpy).toHaveBeenCalledWith(task);
  });

  it('should emit deleteTask event when delete button is clicked', () => {
    const task: Task = { id: 1, title: 'Task', done: false };
    component.tasks = [task];
    fixture.detectChanges();

    const deleteTaskSpy = spyOn(component.deleteTask, 'emit');

    const deleteButtonElement = fixture.nativeElement.querySelector('button.btn-danger') as HTMLButtonElement;
    deleteButtonElement.click();
    fixture.detectChanges();

    expect(deleteTaskSpy).toHaveBeenCalledWith(task);
  });
});
