/* eslint-disable */
import Mock from 'mockjs';

const Random = Mock.Random;

// 返回一星期的数据
export const getChartDataByWeek = (req: any) => {
  req = JSON.parse(req.body);

  let targetName = '';
  const { target } = req;
  if (target === 'income') targetName = '盈利统计';
  const lastWeek = `上周${targetName}`,
    thisWeek = `本周${targetName}`;
  let data: { columns: Array<string>; rows: Array<any> } = {
    columns: ['日期', lastWeek, thisWeek],
    rows: []
  };

  const dayArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  dayArr.forEach(ele => {
    data.rows.push({
      日期: ele,
      [lastWeek]: Random.integer(100, 100000),
      [thisWeek]: Random.integer(0, 200000)
    });
  });

  // @ts-ignore
  return { code: 200, msg: '登录成功', data };
};

export const onlineUser = (req: any) => {
  return { code: 200, msg: '', data: Random.increment(Random.integer(10, 100)) };
};

export const getOverview = (req: any) => {
  const data = [
    {
      startVal: 0,
      targetValue: Random.integer(100, 1000),
      targetName: '新增用户',
      targetCell: '人',
      explanation: '所有平台中新增用户',
      icon: 'ios-people',
      growth: Random.integer(1, 200)
    },
    {
      startVal: 0,
      targetValue: Random.integer(1000, 10000),
      targetName: '总用户',
      targetCell: '人',
      explanation: '所有平台中总用户',
      icon: 'ios-people',
      growth: Random.integer(1, 200)
    },
    {
      startVal: 0,
      targetValue: Random.integer(10000, 1000000),
      targetName: '总消费额',
      targetCell: '元',
      explanation: '所有平台中总消费额',
      icon: 'logo-bitcoin',
      reduce: Random.integer(1, 200)
    },
    {
      startVal: 0,
      targetValue: Random.integer(2000, 10000),
      targetName: '人均消费额',
      targetCell: '元',
      explanation: '所有平台中人均消费额',
      icon: 'logo-bitcoin',
      growth: Random.integer(1, 200)
    }
  ];
  return { code: 200, msg: '', data };
};
