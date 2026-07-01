import styles from './editor-header.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const EditorHeader = () => {
  return (
    <header className={cx('editor-header')}>
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
            className={cx('radio-input')}
            defaultChecked
          />
          <label htmlFor="yaml" className={cx('radio-label')}>
            YAML
          </label>

          <input
            type="radio"
            id="json"
            name="lang"
            className={cx('radio-input')}
          />
          <label htmlFor="json" className={cx('radio-label')}>
            JSON
          </label>
        </div>

        <button className={cx('save-code')}>Save</button>
      </div>
    </header>
  );
};
