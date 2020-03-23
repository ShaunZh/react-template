import React from 'react';
import { Link } from 'react-router-dom';
import NoticeIcon from '../NoticeIcon';
import styles from './index.module.less';

const NoticeIconView: React.FC = () => (
  <Link to="/notice" style={{ color: '#9E9E9F', padding: '0 12px' }} className={styles.action}>
    <NoticeIcon haveNotice />
  </Link>
);

export default NoticeIconView;
