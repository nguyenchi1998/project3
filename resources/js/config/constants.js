import { colors } from '@mui/material';
export const ACCESS_TOKEN = 'access_token';

export const REFRESH_TOKEN = 'refresh_token';

export const DATE_FORMAT = 'yyyy/MM/dd';

export const CREATE_ACTION = 'create';

export const EDIT_ACTION = 'edit';

export const PROJECT_TYPES = ['Strategy', 'Business'];

export const PROJECT_PRIORITIES = ['Low', 'Normal', 'High'];

export const PROJECT_STATUS = ['New', 'Progress', 'Done', 'Pending'];

export const PROJECT_MEMBER_ROLES = ['Member', 'Team Leader', 'Manager'];

export const POSITIONS = ['Employee', 'Manager', 'Director'];

export const ISSUE_STATUS = [
  'New',
  'Assigned',
  'To Be Confirm',
  'Suspended',
  'Done',
  'Closed',
];

export const ISSUE_STATUS_CLOSED = 4;

export const ISSUE_PRIORITIES = ['Low', 'Normal', 'High', 'Immediate'];

export const ISSUE_PRIORITY_COLORS = [
  'unset',
  'unset',
  colors.deepOrange[50],
  colors.red[100],
];

export const PAGINATE_LIMIT = 8;

export const PROGRESS_PERCENT = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const EFFORTS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const LINK_ISSUE_ACTION = 1;

export const UNLINK_ISSUE_ACTION = 0;
