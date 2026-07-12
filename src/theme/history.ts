import { colors } from './colors';
import { fontWeights } from './font';

export type MethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const HTTP_STATUS = {
  OK: 200,
  REDIRECT: 300,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
} as const;

export const history = {
  historyWrapper: {
    bg: colors.background,
    w: '100%',
    minH: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  historyContainer: {
    w: '100%',
    maxW: '1100px',
    py: { base: 10, md: 16 },
    px: { base: 5, md: 8 },
  },
  historyTitle: {
    color: colors.colorWhite,
    fontWeight: fontWeights.bold,
    lineHeight: '1.05',
    maxW: '500px',
    fontSize: {
      base: '2xl',
      md: '3xl',
    },
  },
  historyDescription: {
    maxW: '650px',
    color: colors.mutedForeground,
    fontSize: {
      base: 'xs',
      md: 'sm',
    },
    lineHeight: '0.5',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
    gap: '4',
    w: '100%',
  },
  statsCard: {
    bg: colors.panel,
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'xl',
    p: { base: 4, md: 6 },
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
    alignItems: 'start',
    _hover: {
      bg: colors.surfaceHover,
      borderColor: colors.colorZinc600,
    },
  },
  statsLabel: {
    fontSize: 'xs',
    fontWeight: fontWeights.bold,
    color: colors.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 'wider',
  },
  statsValue: {
    fontSize: { base: 'xl', md: '2xl' },
    fontWeight: fontWeights.bold,
    color: colors.colorWhite,
    fontFamily: 'mono',
  },
  tableContainer: {
    w: '100%',
    bg: colors.panel,
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: 'xl',
    p: '2',
    overflowX: 'auto',
  },
  tableHeaderCell: {
    color: colors.colorZinc500,
    fontSize: '2xs',
    fontWeight: fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 'wider',
    textAlign: 'left',
    borderBottom: '1px solid',
    borderColor: colors.border,
    py: '4',
    px: '5',
  },
  tableBodyCell: {
    color: colors.colorWhite,
    fontSize: 'sm',
    fontFamily: 'mono',
    textAlign: 'left',
    borderBottom: '1px solid',
    borderColor: colors.border,
    py: '3.5',
    px: '5',
  },
  methodBadge: {
    color: colors.background,
    fontWeight: fontWeights.bold,
    fontSize: '2xs',
    px: '2',
    py: '0.5',
    borderRadius: 'md',
    minW: '62px',
    textAlign: 'center',
    display: 'inline-block',
  },
  tableErrorButton: {
    variant: 'plain',
    size: 'sm',
    height: 'auto',
    p: 0,
    fontWeight: fontWeights.medium,
    cursor: 'pointer',
    _hover: { textDecoration: 'underline' },
    style: { background: 'transparent', border: 'none' },
  },
  tableEmptyError: {
    color: colors.colorZinc600,
    paddingLeft: '10px',
  },
  tableErrorDetailCell: {
    color: colors.destructive,
    fontWeight: fontWeights.bold,
    fontSize: 'sm',
    py: '3',
    px: '5',
  },

  tableEmptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: '12',
    px: '4',
    textAlign: 'center',
    gap: '3',
  },
  tableEmptyStateTitle: {
    color: colors.colorWhite,
    fontSize: 'md',
    fontWeight: fontWeights.bold,
  },
  tableEmptyStateDesc: {
    color: colors.mutedForeground,
    fontSize: 'sm',
    maxW: '350px',
  },

  getStatusColor: (status: number) => {
    if (status >= HTTP_STATUS.OK && status < HTTP_STATUS.REDIRECT) {
      return colors.methodGet;
    }
    if (status >= HTTP_STATUS.REDIRECT && status < HTTP_STATUS.BAD_REQUEST) {
      return colors.methodPut;
    }
    if (
      status >= HTTP_STATUS.BAD_REQUEST &&
      status < HTTP_STATUS.SERVER_ERROR
    ) {
      return colors.methodPost;
    }
    if (status >= HTTP_STATUS.SERVER_ERROR) {
      return colors.destructive;
    }

    return colors.methodDefault;
  },
  getMethodBg: (method: MethodType) => {
    const bgColors: Record<MethodType, string> = {
      GET: colors.methodGet,
      POST: colors.methodPost,
      PUT: colors.methodPut,
      PATCH: colors.methodPatch,
      DELETE: colors.methodDelete,
    };
    return bgColors[method] || colors.methodDefault;
  },
} as const;
