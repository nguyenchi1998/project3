const HOME_PAGE = 'HOME_PAGE';
const MANAGER_PAGE = 'MANAGER_PAGE';
const EMPLOYEE_PAGE = 'EMPLOYEE_PAGE';
const SIGN_IN_PAGE = 'SIGN_IN_PAGE';
const INTERNAL_ERROR_PAGE = 'INTERNAL_ERROR_PAGE';
const NOT_FOUND_PAGE = 'NOT_FOUND_PAGE';
const FORBIDDEN_PAGE = 'FORBIDDEN_PAGE';
const PROJECT_PAGE = 'PROJECT_PAGE';
const OVERVIEW_PAGE = 'OVERVIEW';
const ISSUE_PAGE = 'ISSUE';
const TRACKER_PAGE = 'TRACKER';
const MEMBER_PAGE = 'MEMBER';
const TARGET_VERSION_PAGE = 'TARGET_VERSION';
const PROJECT_POSITION_PAGE = 'PROJECT_POSITION';
const SETTING_PAGE = 'SETTING_PAGE';
const ROLE_PAGE = 'ROLE_PAGE';
const POSITION_PAGE = 'POSITION_PAGE';

export const AUTH_PATH = {
  [SIGN_IN_PAGE]: '/login',
};

export const ERROR_PATH = {
  [INTERNAL_ERROR_PAGE]: '/500',
  [NOT_FOUND_PAGE]: '/404',
  [FORBIDDEN_PAGE]: '/403',
};

export const PATH = {
  [HOME_PAGE]: `/`,
  [MANAGER_PAGE]: `/managers`,
  [EMPLOYEE_PAGE]: `/employees`,
  [PROJECT_PAGE]: `/projects`,
  [ROLE_PAGE]: `/roles`,
  [POSITION_PAGE]: `/positions`,
};

export const PROJECT_PATH = {
  [OVERVIEW_PAGE]: 'overview',
  [ISSUE_PAGE]: 'issues',
  [TRACKER_PAGE]: 'trackers',
  [MEMBER_PAGE]: 'members',
  [TARGET_VERSION_PAGE]: 'target-versions',
  [PROJECT_POSITION_PAGE]: 'positions',
  [SETTING_PAGE]: 'setting',
};
