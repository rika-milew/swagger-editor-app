import styles from './editor-header.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const EditorHeader = () => {
  return <header className={cx('editor-header')}></header>;
};
