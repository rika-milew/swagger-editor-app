'use client';

import classNames from 'classnames/bind';
import styles from '../../app/page.module.css';
import { EditorHeader } from '@/components/swagger/editor-header/editor-header';
import { Editor } from '@/components/swagger/editor/editor';
import { Viewer } from '@/components/swagger/viewer/viewer';
import { ResentPerformance } from '@/components/swagger/resent-performance/resent-performance';
import { useFormatConverter } from '@/hooks/use-format-converter';

const cx = classNames.bind(styles);

const initialCodeValue =
  '# Write code here! \n server:\n' +
  '  host: 192.168.1.100\n' +
  '  port: 8080\n' +
  '  timeout: 30\n' +
  '  enabled: true';

export const HomePage = () => {
  const {
    code,
    format,
    setCode,
    handleFormatChange,
    updateFormatWithoutConversion,
  } = useFormatConverter(initialCodeValue, 'yaml');

  return (
    <div className={cx('page')}>
      <main className={cx('main')}>
        <div className={cx('main-wrapper')}>
          <section
            className={cx('editor-container')}
            data-testid="editor-block"
          >
            <EditorHeader format={format} onFormatChange={handleFormatChange} />
            <Editor
              code={code}
              format={format}
              onChange={setCode}
              onFormatChange={updateFormatWithoutConversion}
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
