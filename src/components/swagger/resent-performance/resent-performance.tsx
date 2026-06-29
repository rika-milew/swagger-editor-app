import styles from './resent-performance.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const ResentPerformance = () => {
  return <div className={cx('performance-container')}></div>;
};
