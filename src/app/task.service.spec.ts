import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from './task.model';
import {BehaviorSubject} from "rxjs";

describe('TaskService', () => {
    let service: TaskService;
    const task: Task = { id: 1, title: 'Task 1', done: false, completionSubject: new BehaviorSubject<boolean>(true) };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TaskService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a task', () => {
        service.addTask(task);
        service.tasks$.subscribe(tasks => {
            expect(tasks).toContain(task);
        });
    });

    it('should mark task as done', () => {
        service.addTask(task);
        service.markAsDone(task);
        service.tasks$.subscribe(tasks => {
            expect(tasks).not.toContain(task);
        });
        service.completedTasks$.subscribe(completedTasks => {
            expect(completedTasks).toContain(task);
        });
    });

    it('should delete task', () => {
        service.addTask(task);
        service.deleteTask(task);
        service.tasks$.subscribe(tasks => {
            expect(tasks).not.toContain(task);
        });
        service.completedTasks$.subscribe(completedTasks => {
            expect(completedTasks).not.toContain(task);
        });
    });
});
