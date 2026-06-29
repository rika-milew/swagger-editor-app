import classNames from 'classnames/bind';
import styles from '../../app/page.module.css';
import { EditorPanel } from '@/components/features/swagger-editor/editor-panel/editor-panel';

const cx = classNames.bind(styles);

export const HomePage = () => {
  return (
    <div className={cx('page')}>
      <main className={cx('main')}>
        <EditorPanel />
      </main>
    </div>
  );
};
