import styles from './viewer.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const Viewer = () => {
  return <div className={cx('viewer')}></div>;
};
