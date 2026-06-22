import classNames from 'classnames';
import styles from './page.module.css';

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <div className={cx('page')}>
      <main className={cx('main')}>
        <h1>Swagger Editor App</h1>
      </main>
    </div>
  );
}
