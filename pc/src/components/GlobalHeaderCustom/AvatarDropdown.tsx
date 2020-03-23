import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { Link } from 'react-router-dom';
import React from 'react';
import { observer } from 'mobx-react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.module.less';
import { getToken } from '@/utils/token';
import { useStores } from '@/hooks/useStores';

const AvatarDropdown: React.FC = observer(() => {
  const { userStore, loginStore } = useStores();
  const onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      loginStore.logout();
      return;
    }
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return getToken()?.length ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={userStore.currentUser.avatar}
          alt="avatar"
        />
        <span className={styles.name}>{userStore.currentUser.name}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <div className={styles.login}>
      <Link to="/user/login" className={styles.action}>
        登录
      </Link>
      <span>/</span>
      <Link to="/user/register" className={styles.action}>
        注册
      </Link>
    </div>
  );
});

export default AvatarDropdown;
