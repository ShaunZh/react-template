import React from 'react';
// import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'react-router-dom';
import { History } from 'history';

import { stringify } from 'querystring';
import { observer } from 'mobx-react';
// import { ConnectState, ConnectProps } from '@/models/connect';
import { getToken } from '@/utils/token';

interface SecurityLayoutProps {
  // loading?: boolean;
  children: React.ReactNode;
  history: History;
}

@observer
class SecurityLayout extends React.Component<SecurityLayoutProps> {
  public componentDidMount() {
    console.log('props: ', this.props);
    // this.setState({
    //   isReady: true
    // });
    // const { dispatch } = this.props;
    // const token = getToken();
    // // 存在token且dispatch存在，则获取用于信息
    // if (dispatch && token.length) {
    //   dispatch({
    //     type: 'user/fetchCurrent'
    //   });
    // }
  }

  public render() {
    const { children } = this.props;
    const token = getToken();
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = token && token.length > 0;
    const queryString = stringify({
      redirect: window.location.href
    });

    // if ((!isLogin && loading) || !isReady) {
    // return <PageLoading />;
    // return <PageLoading />;
    // }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

export default SecurityLayout;
