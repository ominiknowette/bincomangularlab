import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props
} from '@ngrx/store';

// Describes one course.
export interface Course {
  id: number;
  title: string;
  hours: number;
}

// Describes the enrolment state.
export interface EnrolmentState {
  courses: Course[];
}

// The application starts with no selected courses.
export const initialState: EnrolmentState = {
  courses: []
};

// ACTIONS

export const addCourse = createAction(
  '[Enrolment] Add Course',
  props<{ course: Course }>()
);

export const removeCourse = createAction(
  '[Enrolment] Remove Course',
  props<{ id: number }>()
);

export const clearCourses = createAction(
  '[Enrolment] Clear'
);

// REDUCER

export const enrolmentReducer = createReducer(
  initialState,

  on(addCourse, (state, { course }) => {
    const alreadySelected = state.courses.some(
      item => item.id === course.id
    );

    // Do not add the same course twice.
    if (alreadySelected) {
      return state;
    }

    return {
      ...state,
      courses: [...state.courses, course]
    };
  }),

  on(removeCourse, (state, { id }) => ({
    ...state,
    courses: state.courses.filter(
      item => item.id !== id
    )
  })),

  on(clearCourses, () => ({
    courses: []
  }))
);

// SELECTORS

// The name must match the property registered in provideStore.
export const selectEnrolment =
  createFeatureSelector<EnrolmentState>('enrolment');

// Read the selected courses.
export const selectCourses = createSelector(
  selectEnrolment,
  state => state.courses
);

// Calculate the number of selected courses.
export const selectCount = createSelector(
  selectCourses,
  courses => courses.length
);

// Calculate the total learning hours.
export const selectHours = createSelector(
  selectCourses,
  courses =>
    courses.reduce(
      (total, course) => total + course.hours,
      0
    )
);