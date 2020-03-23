import request from '@/plugins/axios';

async function query(): Promise<any> {
  return request.post('/api/users');
}

async function queryCurrent(): Promise<any> {
  return request.post('/api/currentUser');
}

async function queryNotices(): Promise<any> {
  return request.post('/api/notices');
}

export default {
  query,
  queryCurrent,
  queryNotices
};
