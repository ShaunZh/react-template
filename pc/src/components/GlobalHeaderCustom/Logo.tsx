import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

interface IProps {
  title?: string;
  src?: string;
  link?: string;
}

const Logo: React.FC<IProps> = (props) => {
  const { link = '' } = props;
  return (
    <Link to={link}>
      <i className={styles.logo} />
    </Link>
  );
};

export default Logo;
