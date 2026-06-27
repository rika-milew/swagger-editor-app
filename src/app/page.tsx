import classNames from 'classnames/bind';
import styles from './page.module.css';
import { EditorPanel } from '@/components/features/swagger-editor/editor-panel/editor-panel';

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <div className={cx('page')}>
      <main className={cx('main')}>
        <EditorPanel />
      </main>
    </div>
  );
}
