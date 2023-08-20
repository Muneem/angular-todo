import { Injectable } from '@angular/core';
import { Task } from './task.model';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskFactory {
    createTask(id: number, title: string, done: boolean): Task {
        return { id, title, done, completionSubject: new Subject<boolean>() };
    }
}
