import { colors } from '@mui/material';

export const ACCESS_TOKEN = 'access_token';

export const REFRESH_TOKEN = 'refresh_token';

export const DATE_FORMAT = 'yyyy-MM-dd';

export const CREATE_ACTION = 'create';

export const EDIT_ACTION = 'edit';

export const PROJECT_TYPES = [
  { label: 'Strategy', value: 1 },
  { label: 'Business', value: 2 },
];

export const PROJECT_PRIORITIES = [
  { label: 'Low', value: 1 },
  { label: 'Normal', value: 2 },
  { label: 'High', value: 3 },
];

export const PROJECT_STATUS = [
  { label: 'New', value: 1 },
  { label: 'Progress', value: 2 },
  { label: 'Done', value: 3 },
  { label: 'Pending', value: 4 },
];

export const PROJECT_MEMBER_ROLES = [
  { label: 'Viewer', value: 1 },
  { label: 'Developer', value: 2 },
  { label: 'QA', value: 3 },
  { label: 'BRSE', value: 4 },
  { label: 'PM', value: 5 },
];

export const POSITIONS = [
  { label: 'CTO', value: 1 },
  { label: 'Division Manager', value: 2 },
  { label: 'Group Manager', value: 3 },
  { label: 'DEV', value: 4 },
  { label: 'BRSE', value: 5 },
  { label: 'Part-time', value: 6 },
  { label: 'QA Manual', value: 7 },
  { label: 'QA Auto', value: 8 },
  { label: 'Comtor', value: 9 },
  { label: 'PQA', value: 10 },
  { label: 'BO', value: 11 },
  { label: 'IT-GUY', value: 12 },
  { label: 'CI', value: 13 },
  { label: 'Marketing', value: 14 },
  { label: 'HR', value: 15 },
  { label: 'Accountant', value: 16 },
  { label: 'Designer', value: 17 },
];

export const ROLES = [
  { label: 'Super Admin', value: 1 },
  { label: 'Director', value: 2 },
  { label: 'Manager', value: 3 },
  { label: 'Employee', value: 4 },
];

export const SUPER_ADMIN_ROLE = 1;

export const PERMISSIONS = [
  { label: 'Project List', value: 1 },
  { label: 'Project Store', value: 2 },
  { label: 'Project Update', value: 3 },
  { label: 'Project Delete', value: 4 },

  { label: 'Employee List', value: 5 },
  { label: 'Employee Store', value: 6 },
  { label: 'Employee Update', value: 7 },
  { label: 'Employee Delete', value: 8 },
];

export const MANAGER_ROLE = [1, 2, 3];

export const CREATE_PROJECT_PERMISSION = [2];

export const ACTION_EMPLOYEE_PERMISSION = [6, 7];

export const VIEW_ROLE = [1, 2];

export const ISSUE_STATUS = [
  { label: 'New', value: 1 },
  { label: 'Assigned', value: 2 },
  { label: 'To Be Confirm', value: 3 },
  { label: 'Suspended', value: 4 },
  { label: 'Done', value: 5 },
  { label: 'Feedback', value: 6 },
  { label: 'Confirmed', value: 7 },
  { label: 'Closed', value: 8 },
  { label: 'Reject', value: 9 },
];

export const ISSUE_STATUS_CLOSED = [6, 7, 8];
export const ISSUE_STATUS_OPEN = [1, 2, 3, 4, 5];

export const ISSUE_PRIORITIES = [
  { label: 'Low', value: 1 },
  { label: 'Normal', value: 2 },
  { label: 'High', value: 3 },
  { label: 'Immediate', value: 4 },
];

export const CHART_ISSUE_PRIORITY_COLORS = [
  colors.lightBlue[100],
  colors.indigo[500],
  colors.orange[600],
  colors.red[600],
];

export const ISSUE_PRIORITY_COLORS = [
  'unset',
  'unset',
  colors.deepOrange[50],
  colors.red[200],
];

export const PAGINATE_LIMIT = 8;

export const PROGRESS_PERCENT = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const EFFORTS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const LINK_ISSUE_ACTION = 1;

export const UNLINK_ISSUE_ACTION = 0;

export const TARGET_VERSION_STATUS = [
  { label: 'Closed', value: 1 },
  { label: 'Lock', value: 2 },
  { label: 'Open', value: 3 },
];

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];
