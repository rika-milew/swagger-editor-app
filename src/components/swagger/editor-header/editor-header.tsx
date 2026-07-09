'use client';

import React from 'react';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import styles from './editor-header.module.css';
import type { EditorFormat } from '@/types/editor.types';

const cx = classNames.bind(styles);

type EditorHeaderProps = {
  format: EditorFormat;
  onFormatChange: (format: EditorFormat) => void;
};

const isValidFormat = (value: string): value is EditorFormat => {
  return value === 'yaml' || value === 'json';
};

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  format,
  onFormatChange,
}) => {
  const t = useTranslations('EditorHeader');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (isValidFormat(value)) {
      onFormatChange(value);
    }
  };

  return (
    <div className={cx('editor-header')}>
      <div className={cx('points-container')}>
        <div className={cx('point')}></div>
        <div className={cx('point')}></div>
        <div className={cx('point')}></div>
      </div>

      <div className={cx('controls-container')}>
        <p className={cx('valid-openapi')}>● {t('validOpenApi')}</p>

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

        <button type="button" className={cx('save-code')}>
          {t('save')}
        </button>
      </div>
    </div>
  );
};
