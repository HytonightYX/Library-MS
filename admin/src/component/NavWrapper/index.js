import React from 'react'
import { Layout, Row, Col, Drawer, Dropdown, Icon, Menu, Avatar, BackTop, Button, Badge } from 'antd'
import './index.less'
import { navIconList } from '@constant/data'
import { MENU_MAIN } from '@constant/data'
import { Link, NavLink } from 'react-router-dom'
import FullScreen from '../FullScreen'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'

const {Header, Sider, Content} = Layout
const {SubMenu} = Menu

@inject('userStore')
@observer
class NavWrapper extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: 0,
			collapsed: false,
		}
	}

	@computed
	get currUser() {
		return this.props.userStore.currUser
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
		const {collapsed} = this.state

		const DropdownList = (
			<Menu className="drop-list">
				<Menu.Item key="user">
					<Icon type="user"/>
					管理员
				</Menu.Item>
				<Menu.Item key="logout" onClick={this.handleLogout}>
					<Icon type="logout"/>
					退出登录
				</Menu.Item>
			</Menu>
		)

		return (
			<Layout className="g-menu">
				<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
					<div className="m-logo">{collapsed ? <Icon type='book'/> : '图书后台管理'}</div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						{this.recursion(MENU_MAIN)}
					</Menu>
				</Sider>
				<Layout>
					<Header style={{background: '#fff', padding: 0}} className="m-header">
						<Icon
							className="trigger"
							type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggle}
						/>

						<div className="header-right">
							<div className="full-screen">
								<FullScreen />
							</div>
							<div className="setting">
								<Icon style={{fontSize: '21px', cursor: 'pointer'}} type="setting" onClick={this.setting}/>
							</div>
							<div className="news-wrap">
								<Badge count={3}>
									<Icon style={{fontSize: '21px', cursor: 'pointer'}} type="bell" onClick={this.toNews}/>
								</Badge>
							</div>
							<div className="dropdown-wrap" id="dropdown-wrap" style={{cursor: 'pointer'}}>
								<Dropdown getPopupContainer={() => document.getElementById('dropdown-wrap')} overlay={DropdownList}>
									<div style={{paddingBottom: 10}}>
										<span style={{marginRight: 10}}>{this.currUser.username}</span>
										<Avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADwElEQVRYR7WXTWwTVxDH/7Pe9Qf+ahyaOAmBUKeBAyqXSlUrUM/0A6lHxAWE1PbSG+IIoceKG5e2EqKXimMlWtpzRdWqgkurHiDEJTgkcQJx8Bf+2I9Bb8kG2/H6PRL7XfbwZub9dmbezDzCa6z5fH7EqTQ/AuFDZhwBMAUgvmmiDGCBCP+B8bsWC/46nU6vqZonFcFsdvmYCesCHJwggq6iwwwLGn4zoH+TyYz/IdPpCXJvIX9Qs82rzPyxzFCvfSK65QSMrw5PpR/6yfmCzGWXTjFb3wHkuX43LAC4TKR/MZOZuNHNUFeQ+9nFiwTMMrNS6FQJiYgZmD2Umfy6U2fbQQICzJdVje9IjuhSJ0wbiAgH4PzYb09s+3siBrTTrWHaAhGJSVbjH5WcCGga3kjGEI1GEDReXqKmaaFareFZsQLbcRQcxWXWQ0e9BN4Cmcsu/qJyO2LRCEZHUhAw3ZaAWF0roFKtSWHEbZrJTH4iBF0QUScstm7LNAXE2OgwiHrnMDNjZXVdCUYn/bioM67Fe9ncTWJ82gtEeGDqwJivJzp1hWcWHq1Iw8SEnw9n9p8kUbatcnNJVjGHhxIYTiVlTmvbXy8Usb5R6qkjKrAeD07Q3HzuDAPXZSfs3zeKcCgoE2vbrzeayD1eleoQcJbmsrnrzDgjk54+OAHNJ0H9dB3HwfzDJZlpEOEHuj+fuwPgXZn0IEEA3BUgTwDslYEMMjQAngqQOoCQDGRQybp5bkMZZFDXtxVEKTRCYRAFbRPEDY1Ssnqh62eJb0mHu8rXtzWH+tP0Xll0r69qQZMl82723YKmWuJ3c1AvXbfEU3BCuel5xiLhEEIhA8GgAT0Q2OrEouNato1m00SjYaJWbyixbzU9lTFAtP3UUALJeBS6HlA6wLJsFMtVFDZKEJB+q20MEEJ+g5Fh6Ng39ibEdyfLNC08XnkC8e1c2wYjIdBtVBRNbmoyrewFP1DhnYXFPEQTfLV8RsWXXmkfnkf2DrmzaT+WmGXXnm64psSzwnd49g7znhOaRnjrwPhrt34/aOGN/x8tw3FYkPR+TrTCxPZEZsfTw319YC3n17nyvKb2wPJgStXquWg48q2m0c6ytMM1jsNWtV77MhGNXuvmtZ5/XCgU3onHE9/reuC93eSJZdl/l8ulz1Op1L9+dpRcXyo9/ywcNs4bhv6+9wRRAGPTtP6q180ricSen2TySiCekbVi8e2YYZwMGMZxAj4IaNoQkeZWOGbHth1ng4E/bdO8XTHNmyPJ5AMZgLf/At/j2PAbUsw0AAAAAElFTkSuQmCC"/>
										<Icon style={{color: 'rgba(0,0,0,.3)', cursor: 'pointer'}} type="caret-down"/>
									</div>
								</Dropdown>
							</div>
						</div>
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
