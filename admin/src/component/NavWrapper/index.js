import React from 'react'
import { Layout, Row, Col, Drawer, Dropdown, Icon, Menu, Avatar, BackTop, Button } from 'antd'
import './index.less'
import { navIconList } from '@constant/data'
import { MENU_MAIN } from '@constant/data'
import { Link, NavLink } from 'react-router-dom'

const {Header, Sider, Content} = Layout
const {SubMenu} = Menu

class NavWrapper extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: 0,
			collapsed: false,
		}
	}

	recursion = (dataSource) => {
		return (
			dataSource.map((menu) => {
				if (menu.children) {
					return (
						<SubMenu key={menu.key} title={
							<span>
                <Icon type={menu.icon}/>
                <span>{menu.title}</span>
              </span>
						}>
							{this.recursion(menu.children)}
						</SubMenu>
					)
				} else {
					return (
						<Menu.Item key={menu.key}>
							<Link to={menu.path}>
								<Icon type={menu.icon}/>
								<span>{menu.title}</span>
							</Link>
						</Menu.Item>
					)
				}
			})
		)
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		})
	}

	render() {
		let {collapsed} = this.state

		return (
			<Layout className="g-menu">
				<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
					<div className="m-logo">{collapsed ? <Icon type='book'/> : '图书后台管理'}</div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						{this.recursion(MENU_MAIN)}
					</Menu>
				</Sider>
				<Layout>
					<Header style={{background: '#fff', padding: 0}}>
						<Icon
							className="trigger"
							type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggle}
						/>
					</Header>
					<Content className="g-content">
						{this.props.children}
					</Content>
				</Layout>
			</Layout>
		)
	}
}

export default NavWrapper
