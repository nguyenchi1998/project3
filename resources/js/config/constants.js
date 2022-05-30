import { colors } from '@mui/material';

export const ACCESS_TOKEN = 'access_token';

export const REFRESH_TOKEN = 'refresh_token';

export const DATE_FORMAT = 'yyyy/MM/dd';

export const CREATE_ACTION = 'create';

export const EDIT_ACTION = 'edit';

export const PROJECT_TYPES = ['Strategy', 'Business'];

export const PROJECT_PRIORITIES = ['Low', 'Normal', 'High'];

export const PROJECT_STATUS = ['New', 'Progress', 'Done', 'Pending'];

export const PROJECT_MEMBER_ROLES = ['Viewer', 'Developer', 'QA', 'BRSE', 'PM'];

export const POSITIONS = ['Employee', 'Manager', 'Director'];

export const ISSUE_STATUS = [
  'New',
  'Assigned',
  'To Be Confirm',
  'Suspended',
  'Done',
  'Feedback',
  'Confirmed',
  'Closed',
  'Reject',
];

export const ISSUE_STATUS_TYPE = ['Open', 'Closed'];

export const ISSUE_STATUS_CLOSED = [4, 5];

export const ISSUE_PRIORITIES = ['Low', 'Normal', 'High', 'Immediate'];

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

export const TARGET_VERSION_STATUS = ['Closed', 'Lock', 'Open'];
