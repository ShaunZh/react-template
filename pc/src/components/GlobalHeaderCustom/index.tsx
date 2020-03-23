import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import RightContentCustom from '@/components/GlobalHeaderCustom/RightContentCustom';
import Logo from '@/components/GlobalHeaderCustom/Logo';
import logo from '@/assets/images/logo.png';
import styles from './index.module.less';

const { Header } = Layout;

interface IProps {
  isMobile?: boolean;
}

// export class GlobalHeaderCustom extends React.Component<IProps> {

const GlobalHeaderCustom: React.FC<IProps> = (props) => {
  const [width, setWidth] = useState<string>('1200px');
  const resizeHeader = (v: boolean | undefined) => {
    const newWidth = v ? '100%' : '1200px';
    if (width !== newWidth) {
      setWidth(newWidth);
    }
  };
  useEffect(() => {
    resizeHeader(props.isMobile);
  }, [props.isMobile]);

  // 处理header的移动端适配
  return (
    <Header className={styles.header}>
      <div className={styles.content} style={{ width }}>
        <Logo src={logo} link="/" />
        <RightContentCustom />
      </div>
    </Header>
  );
};
export default GlobalHeaderCustom;
