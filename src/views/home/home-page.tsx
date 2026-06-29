import classNames from 'classnames/bind';
import styles from '../../app/page.module.css';
import { Main } from '@/components/swagger/main/main';

const cx = classNames.bind(styles);

export const HomePage = () => {
  return (
    <div className={cx('page')}>
      <main className={cx('main')}>
        <Main />
      </main>
    </div>
  );
};
