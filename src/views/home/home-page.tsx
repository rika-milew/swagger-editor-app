'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../app/page.module.css';
import { EditorHeader } from '@/components/swagger/editor-header/editor-header';
import { Editor } from '@/components/swagger/editor/editor';
import { Viewer } from '@/components/swagger/viewer/viewer';
import { ResentPerformance } from '@/components/swagger/resent-performance/resent-performance';
import type { EditorFormat } from '@/types/editor.types';

const cx = classNames.bind(styles);

export const HomePage = () => {
  const [code, setCode] = useState<string>(
    '# Write code here! \n server:\n' +
      '  host: 192.168.1.100\n' +
      '  port: 8080\n' +
      '  timeout: 30\n' +
      '  enabled: true',
  );
  const [format, setFormat] = useState<EditorFormat>('yaml');

  return (
    <div className={cx('page')}>
      <main className={cx('main')}>
        <div className={cx('main-wrapper')}>
          <section
            className={cx('editor-container')}
            data-testid="editor-block"
          >
            <EditorHeader format={format} onFormatChange={setFormat} />
            <Editor
              code={code}
              format={format}
              onChange={setCode}
              onFormatChange={setFormat}
            />
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
