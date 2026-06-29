import { EditorView } from '@codemirror/view';

export const customTheme = EditorView.theme({
  '&': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderBottomLeftRadius: 'var(--border-radius)',
    borderBottomRightRadius: 'var(--border-radius)',
    overflow: 'hidden',
    backgroundColor: 'var(--color-zinc-900) !important',
    borderLeft: '1px solid var(--canvas-border)',
    borderRight: '1px solid var(--canvas-border)',
    borderBottom: '1px solid var(--canvas-border)',
    borderTop: 'none',
  },
  '.cm-scroller': {
    flex: 1,
    borderBottomLeftRadius: 'var(--border-radius)',
    borderBottomRightRadius: 'var(--border-radius)',
    overflow: 'auto',
    paddingTop: '24px',
    paddingBottom: '24px',
  },
  '.cm-gutters': {
    borderBottomLeftRadius: 'var(--border-radius)',
    paddingLeft: 'var(--default-padding)',
    backgroundColor: 'transparent !important',
    border: 'none',
  },
  '.cm-content': {
    paddingLeft: '12px',
  },
  '.cm-activeLine': {
    backgroundColor: 'transparent !important',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'transparent !important',
  },
});
