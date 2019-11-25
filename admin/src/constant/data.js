export const MENU_MAIN = [
	{
		title: '图书管理',
		icon: 'diff',
		children: [
			{title: '借阅管理', path: '/rental', icon: 'diff'},
			{title: '库存管理', path: '/book', icon: 'diff'}
		]
	},
	{
		title: '用户管理',
		icon: 'diff',
		children: [
			{title: '超期罚款', path: '/overdue', icon: 'diff'},
			{title: '信息修改', path: '/userinfo', icon: 'diff'},
		]
	},
	{
		title: '权限管理',
		icon: 'diff',
		path: 'auth'
	},
	{title: '系统设置', path: '/conf', icon: 'diff'},
]
