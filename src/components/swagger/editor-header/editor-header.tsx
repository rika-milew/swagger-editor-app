'use client';

import React from 'react';
import { useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './editor-header.module.css';
import type { EditorFormat } from '@/types/editor.types';
import { useUserStore } from '@/store/user-store';
import { saveSchema } from '@/app/actions/schema';

const cx = classNames.bind(styles);

type EditorHeaderProps = {
  format: EditorFormat;
  onFormatChange: (format: EditorFormat) => void;
  code: string;
};

const isValidFormat = (value: string): value is EditorFormat => {
  return value === 'yaml' || value === 'json';
};

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  format,
  onFormatChange,
  code,
}) => {
  const user = useUserStore((state) => state.user);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (isValidFormat(value)) {
      onFormatChange(value);
    }
  };

  const handleSave = useCallback(() => {
    void (async () => {
      try {
        const result = await saveSchema({
          schema: code,
          format: format,
        });
        if (result.success) {
          console.log('Schema saved successfully');
        } else if (result.error) {
          console.error('Save failed:', result.error);
          // TODO: Add server error display
        }
      } catch (error: unknown) {
        console.error('Save failed:', error);
        // TODO: Add server error display
      }
    })();
  }, [code, format]);

  return (
    <div className={cx('editor-header')}>
      <div className={cx('points-container')}>
        <div className={cx('point')}></div>
        <div className={cx('point')}></div>
        <div className={cx('point')}></div>
      </div>

      <div className={cx('controls-container')}>
        <p className={cx('valid-openapi')}>● Valid OpenAPI 3.0</p>

        <div className={cx('lang-switcher')}>
          <input
            type="radio"
            id="yaml"
            name="lang"
            value="yaml"
            className={cx('radio-input')}
            checked={format === 'yaml'}
            onChange={handleRadioChange}
          />
          <label htmlFor="yaml" className={cx('radio-label')}>
            YAML
          </label>

          <input
            type="radio"
            id="json"
            name="lang"
            value="json"
            className={cx('radio-input')}
            checked={format === 'json'}
            onChange={handleRadioChange}
          />
          <label htmlFor="json" className={cx('radio-label')}>
            JSON
          </label>
        </div>
        {user && (
          <button
            type="button"
            className={cx('save-code')}
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};
