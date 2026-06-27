import styles from './preview-container.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const PreviewContainer = () => {
  return <div className={cx('preview-container')}></div>;
};
