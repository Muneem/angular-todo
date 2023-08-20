import { Subject } from 'rxjs';

export class Task {
  id!: number;
  title!: string;
  done!: boolean;
  completionSubject: Subject<boolean> = new Subject<boolean>();
}
