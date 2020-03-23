import React, { useState, useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { useStores } from '@/hooks/useStores';

import { checkAuthority } from '@/utils/authority';

import styles from './UserLayout.module.less';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface IUserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<IUserLayoutProps> = observer((props) => {
  const { children } = props;
  const { uiStore } = useStores();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [width, setWidth] = useState<string>('1200px');

  const resizeHeader = () => {
    const { isMobile } = uiStore;
    const newWidth = isMobile ? '100%' : '1200px';
    if (width !== newWidth) {
      setWidth(newWidth);
    }
  };

  const onCollapse = (state: boolean) => {
    setCollapsed(state);
  };

  const onMenuClick = (event: ClickParam) => {
    uiStore.isMobile && setCollapsed(true);
  };

  useEffect(() => {
    console.log('ismobile: ', uiStore.isMobile);
    setCollapsed(uiStore.isMobile);
    resizeHeader();
  }, [uiStore.isMobile]);

  const menu = (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
      onClick={onMenuClick}
    >
      {checkAuthority('/auth/my/info') && (
        <Menu.Item key="myInfo">
          <Link to="/auth/my/info">个人信息</Link>
        </Menu.Item>
      )}
      {checkAuthority('/auth/my/collection') && (
        <Menu.Item key="myCollection">
          <Link to="/auth/my/collection">我的收藏</Link>
        </Menu.Item>
      )}

      {checkAuthority('/auth/my/order') && (
        <Menu.Item key="myOrder">
          <Link to="/auth/my/order">我的订单</Link>
        </Menu.Item>
      )}
      {checkAuthority('/auth/school') && (
        <SubMenu key="school" title={<span>我的网校</span>}>
          {checkAuthority('/auth/my/school') && (
            <Menu.Item key="mySchool">
              <Link to="/auth/my/school">网校信息</Link>
            </Menu.Item>
          )}
          {checkAuthority('/auth/my/servicer') && (
            <Menu.Item key="myServicer">
              <Link to="/auth/my/servicer">客服设置</Link>
            </Menu.Item>
          )}
          {checkAuthority('/auth/my/course') && (
            <Menu.Item key="myCourse">
              <Link to="/auth/my/course">课程管理</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}
    </Menu>
  );
  return (
    <Layout className={styles.container} style={{ width }}>
      <Sider
        collapsedWidth="0"
        className="user-layout-sider"
        width={200}
        collapsible={uiStore.isMobile}
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        {menu}
      </Sider>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
});

export default UserLayout;
