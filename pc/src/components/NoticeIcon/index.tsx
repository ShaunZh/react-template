import React from 'react';
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';

interface IProps {
  haveNotice?: boolean;
}

const NoticeIcon: React.FC<IProps> = (props) => {
  const NoticeBellIcon = <BellOutlined />;
  const { haveNotice } = props;

  return (
    <Badge count={haveNotice ? 1 : 0} dot>
      {NoticeBellIcon}
    </Badge>
  );
};

export default NoticeIcon;
