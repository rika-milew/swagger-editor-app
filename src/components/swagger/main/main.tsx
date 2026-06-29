'use client';

import styles from './main.module.css';
import { Editor } from '@/components/swagger/editor/editor';
import { EditorHeader } from '@/components/swagger/editor-header/editor-header';
import { Viewer } from '@/components/swagger/viewer/viewer';
import { ResentPerformance } from '@/components/swagger/resent-performance/resent-performance';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const Main = () => {
  return (
    <div className={cx('editor-wrapper')}>
      <section className={cx('editor-container')} data-testid="editor-block">
        <EditorHeader />
        <Editor />
      </section>
      <section className={cx('viewer-container')} data-testid="viewer-block">
        <Viewer />
        <ResentPerformance />
      </section>
    </div>
  );
};
