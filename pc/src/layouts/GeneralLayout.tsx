import React, { useEffect } from 'react';
import { Layout, Result, Button } from 'antd';

import Authorized from '@/utils/Authorized';
import { Link } from 'react-router-dom';
import useAntdMediaQuery from 'use-media-antd-query';
import classNames from 'classnames';
import { observer } from 'mobx-react';

import { getAuthorityFromRouter } from '@/utils/utils';
import GlobalHeaderCustom from '@/components/GlobalHeaderCustom';
import { getToken } from '@/utils/token';
import styles from './GeneralLayout.module.less';
import { History } from 'history';
import { useStores } from '@/hooks/useStores';
import routes from '@/router/routes';

const { Content } = Layout;

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export interface GeneralLayoutProps {
  children: React.ReactNode;
  history: History;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = observer((props) => {
  const { userStore, loginStore, uiStore } = useStores();
  const {
    history: { location = { pathname: '/' } }
  } = props;

  const { children } = props;
  // const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
  const authorized = getAuthorityFromRouter(routes, location.pathname || '/') || {
    authority: undefined
  };

  // 媒体查询: 确认是否为移动端(useAntdMediaQuery应该在内部有监听屏幕的尺寸变化)
  const colSize = useAntdMediaQuery();
  // const colSize = useAntdMediaQuery();
  const isMobile = colSize === 'sm' || colSize === 'xs';

  // 设置ClassName
  const className = classNames({
    [`screen-${colSize}`]: colSize,
    'is-mobile': isMobile
  });

  useEffect(() => {
    uiStore.updateIsMobile(isMobile);
  }, [isMobile]);

  useEffect(() => {
    const token = getToken();
    if (token.length) {
      userStore.fetchCurrentUser();
    }
  }, []);

  return (
    <Layout className={`${className} ${styles.container}`}>
      <GlobalHeaderCustom isMobile={false} />
      <Content className={styles.content}>
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </Content>
    </Layout>
  );
});

export default GeneralLayout;
