
import {
  Component,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatCardModule
} from '@angular/material/card';

import { Store } from '@ngrx/store';

import {
  Course,
  addCourse,
  removeCourse,
  clearCourses,
  selectCourses,
  selectCount,
  selectHours
} from './app.enrolment.store';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule
  ],

  templateUrl: './app.html',

  styleUrl: './app.css'
})
export class App {
  private readonly store = inject(Store);

  // Read store values as signals.
  readonly courses =
    this.store.selectSignal(selectCourses);

  readonly count =
    this.store.selectSignal(selectCount);

  readonly hours =
    this.store.selectSignal(selectHours);

  // Available courses.
  readonly catalogue: Course[] = [
    {
      id: 1,
      title: 'Angular Material',
      hours: 3
    },
    {
      id: 2,
      title: 'Bootstrap Layout',
      hours: 2
    },
    {
      id: 3,
      title: 'NgRx Store',
      hours: 4
    }
  ];

  // Search belongs to this component.
  search = '';

  get filteredCourses(): Course[] {
    const term = this.search
      .trim()
      .toLowerCase();

    return this.catalogue.filter(course =>
      course.title
        .toLowerCase()
        .includes(term)
    );
  }

  isSelected(id: number): boolean {
    return this.courses().some(
      course => course.id === id
    );
  }

  add(course: Course): void {
    this.store.dispatch(
      addCourse({ course })
    );
  }

  remove(id: number): void {
    this.store.dispatch(
      removeCourse({ id })
    );
  }

  clear(): void {
    this.store.dispatch(
      clearCourses()
    );
  }
}