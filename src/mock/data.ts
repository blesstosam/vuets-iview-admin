import Mock from 'mockjs'

const Random = Mock.Random

// 返回一星期的数据
export const getChartDataByWeek = (req: any) => {
  req = JSON.parse(req.body)

  let targetName = ''
  const {target} = req
  if (target === 'income') targetName = '盈利统计'
  const lastWeek = `上周${targetName}`, thisWeek = `本周${targetName}`;
  let data: {columns: Array<string>, rows: Array<any>} = {
    columns: [ "日期", lastWeek, thisWeek],
    rows: []
  }

  const dayArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  dayArr.forEach(ele => {
    data.rows.push({
      '日期': ele,
      [lastWeek]: Random.integer(100, 100000),
      [thisWeek]: Random.integer(0, 200000)
    })
  });

  // @ts-ignore
  return {code: 200, msg: '登录成功', data}
}
