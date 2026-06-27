'use client';
import styles from './editor.module.css';
import { EditorBlock } from '@/components/features/swagger-editor/editor-block/editor-block';
import { EditorHeader } from '@/components/features/swagger-editor/editor-header/editor-header';
import { PreviewContainer } from '@/components/features/swagger-editor/preview-container/preview-container';
import { ResentPerformance } from '@/components/features/swagger-editor/resent-performance/resent-performance';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const EditorPanel = () => {
  return (
    <div className={cx('editor-wrapper')}>
      <section className={cx('editor-container')} data-testid="editor-block">
        <EditorHeader />
        <EditorBlock />
      </section>
      <section className={cx('viewer-container')} data-testid="viewer-block">
        <PreviewContainer />
        <ResentPerformance />
      </section>
    </div>
  );
};
