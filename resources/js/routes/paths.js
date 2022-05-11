const HOME_PAGE = 'HOME_PAGE';
const MANAGER_PAGE = 'MANAGER_PAGE';
const STUDENT_PAGE = 'STUDENT_PAGE';
const GRADE_PAGE = 'GRADE_PAGE';
const SUBJECT_PAGE = 'SUBJECT_PAGE';
const SPECIALIZATION_PAGE = 'SPECIALIZATION_PAGE';
const TEACHER_PAGE = 'TEACHER_PAGE';
const SIGN_IN_PAGE = 'SIGN_IN_PAGE';
const INTERNAL_ERROR_PAGE = 'INTERNAL_ERROR_PAGE';
const NOT_FOUND_PAGE = 'NOT_FOUND_PAGE';
const PROJECT_PAGE = 'PROJECT_PAGE';

export const AUTH_PATH = {
  [SIGN_IN_PAGE]: '/login',
};

export const ERROR_PATH = {
  [INTERNAL_ERROR_PAGE]: '/500',
  [NOT_FOUND_PAGE]: '/404',
};

export const PATH = {
  [HOME_PAGE]: `/`,
  [MANAGER_PAGE]: `/managers`,
  [STUDENT_PAGE]: `/students`,
  [GRADE_PAGE]: `/grades`,
  [SPECIALIZATION_PAGE]: `/specializations`,
  [TEACHER_PAGE]: `/teachers`,
  [SUBJECT_PAGE]: `/subjects`,
  [PROJECT_PAGE]: `/projects`,
};
