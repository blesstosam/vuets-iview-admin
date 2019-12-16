import { expect } from 'chai';

const data = [
  {
    id: '0',
    label: '根权限',
    children: [
      {
        id: '111',
        label: '账号管理',
        children: [
          {
            id: '111-111',
            label: '代理账号',
            children: [
              {
                id: '111-111-111',
                label: '添加'
              },
              {
                id: '111-111-222',
                label: '删除'
              },
              {
                id: '111-111-333',
                label: '编辑'
              }
            ]
          },
          {
            id: '111-222',
            label: '站点账号',
            children: [
              {
                id: '111-222-111',
                label: '添加'
              },
              {
                id: '111-222-222',
                label: '删除'
              },
              {
                id: '111-222-333',
                label: '编辑'
              }
            ]
          }
        ]
      },
      {
        id: '222',
        label: '平台设置',
        children: [
          {
            id: '222-111',
            label: '游戏设置',
            children: [
              {
                id: '222-111-111',
                label: '添加'
              },
              {
                id: '222-111-222',
                label: '删除'
              },
              {
                id: '222-111-333',
                label: '编辑'
              }
            ]
          },
          {
            id: '222-222',
            label: '公告设置',
            children: [
              {
                id: '222-222-111',
                label: '添加'
              },
              {
                id: '222-222-222',
                label: '删除'
              },
              {
                id: '222-222-333',
                label: '编辑'
              }
            ]
          }
        ]
      }
    ]
  }
];

function generatePerms(type: string, pId: string) {
  let _firstId = '',
    _secondId = '';
  if (data[0] && data[0].children) {
    for (let i = 0; i < data[0].children.length; i++) {
      const item = data[0].children[i];
      _firstId = item.id;
      if (item.children && item.children.length) {
        // 二级菜单
        for (let j = 0; j < item.children.length; j++) {
          const _item = item.children[j];
          _secondId = _item.id;
          if (_item.id === pId) {
            return `${_firstId}:${_secondId}:${type}`;
          }
        }
      }
    }
  }
  return type;
}

describe('generatePerms', () => {
  it('ADD 222-222', () => {
    expect(generatePerms('ADD', '222-222')).to.eq('222:222-222:ADD');
  });
  it('ADD 222-111', () => {
    expect(generatePerms('ADD', '222-111')).to.eq('222:222-111:ADD');
  });
  it('ADD 111-111', () => {
    expect(generatePerms('ADD', '111-111')).to.eq('111:111-111:ADD');
  });
  it('ADD 111-222-', () => {
    expect(generatePerms('ADD', '111-222-')).to.eq('ADD');
  });
});