'use client';

import classNames from 'classnames/bind';
import styles from '../../app/page.module.css';
import { Editor } from '@/components/swagger/editor/editor';
import { Viewer } from '@/components/swagger/viewer/viewer';
import { ResentPerformance } from '@/components/swagger/resent-performance/resent-performance';

const cx = classNames.bind(styles);

export const HomePage = () => {
  return (
    <div className={cx('page')}>
      <main className={cx('main')}>
        <div className={cx('main-wrapper')}>
          <section
            className={cx('editor-container')}
            data-testid="editor-block"
          >
            <Editor />
          </section>

          <section
            className={cx('viewer-container')}
            data-testid="viewer-block"
          >
            <Viewer />
            <ResentPerformance />
          </section>
        </div>
      </main>
    </div>
  );
};
