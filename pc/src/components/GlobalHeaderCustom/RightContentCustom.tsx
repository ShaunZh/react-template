import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './AvatarDropdown';
import HeaderDropdown from '../HeaderDropdown';
import NoticeIconView from './NoticeIconView';
import styles from './index.module.less';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps {
  layout: 'sidemenu' | 'topmenu';
}

// const ENVTagColor = {
//   dev: 'orange',
//   test: 'green',
//   pre: '#87d068'
// };

const GlobalHeaderRight: React.SFC<{}> = (props) => {
  let className = `${styles.right}`;

  // if (theme === 'dark' && layout === 'topmenu') {
  //   className = `${styles.right}  ${styles.dark}`;
  // }
  const menuHeaderDropdown = (
    <Menu selectedKeys={[]} className={styles.menu}>
      <Menu.Item key="Win">
        <Link to="/download/win">Win客户端</Link>
      </Menu.Item>
      <Menu.Item key="Mac">
        <Link to="/download/mac">Mac客户端</Link>
      </Menu.Item>
      <Menu.Item key="App">
        <Link to="/download/app">App客户端</Link>
      </Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={className}>
      <HeaderDropdown overlay={menuHeaderDropdown} placement="bottomLeft">
        <span className={styles.action}>下载</span>
      </HeaderDropdown>
      <Link to="/school-register" className={styles.action}>
        注册网校
      </Link>
      <NoticeIconView />
      <Avatar />
    </div>
  );
};

export default GlobalHeaderRight;
