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
  { Label: 'New', value: 1 },
  { Label: 'Progress', value: 2 },
  { Label: 'Done', value: 3 },
  { Label: 'Pending', value: 4 },
];

export const PROJECT_MEMBER_ROLES = [
  { label: 'Viewer', value: 1 },
  { label: 'Developer', value: 2 },
  { label: 'QA', value: 3 },
  { label: 'BRSE', value: 4 },
  { label: 'PM', value: 5 },
];

export const POSITIONS = [
  { label: 'Employee', value: 1 },
  { label: 'Marketing', value: 2 },
  { label: 'Manager', value: 3 },
  { label: 'Director', value: 4 },
];

export const ISSUE_STATUS = [
  { key: 'New', value: 1 },
  { key: 'Assigned', value: 2 },
  { key: 'To Be Confirm', value: 3 },
  { key: 'Suspended', value: 4 },
  { key: 'Done', value: 5 },
  { key: 'Feedback', value: 6 },
  { key: 'Confirmed', value: 76 },
  { key: 'Closed', value: 8 },
  { key: 'Reject', value: 9 },
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
