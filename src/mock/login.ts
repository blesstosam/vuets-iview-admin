/* eslint-disable */
export const defaultAvatar =
  'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1564130985&di=ebc53a5c594bfafe06ba14d0799c88ab&src=http://n.sinaimg.cn/sinacn/w640h595/20180219/5762-fyrswmu1170551.jpg';
const USER_MAP = {
  weilei: {
    username: 'weilei',
    roleId: '2019072202',
    adminId: '111567391736420556',
    token: 'a69f2ac9-91c3-4128-ab6b-e89321e36bb2',
    avatar: defaultAvatar,
  },
  sam: {
    username: 'admin',
    roleId: '2019072202',
    adminId: '111567391736420556',
    token: 'a69f2ac9-91c3-4128-ab6b-e89321e36bb2',
    avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4',
  }
};

export const login = (req: any) => {
  req = JSON.parse(req.body);

  // @ts-ignore
  return { code: 200, msg: '登录成功', data: USER_MAP[req.username] || USER_MAP.weilei };
};

export const logout = (req: any) => {
  return { code: 200, msg: '登出成功' };
};
