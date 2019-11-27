import React from 'react'
import { Form, Table, Input, Button, Skeleton, Modal, Tag, Divider, message, Card, Row, Col, Select, DatePicker, Drawer, Spin, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import axios from 'axios'

const {RangePicker} = DatePicker

import './index.less'
import books from '../../constant/books'

@inject('userStore')
@observer
class Overdue extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			search: false
		}
	}

	componentDidMount() {
		this.setState({loading: true}, () => {
			axios.get('https://5ddb2a5f041ac10014de0c6f.mockapi.io/user')
				.then((r) => {
					console.log(r.data)
					this.setState({user_list: r.data, loading: false})
				})
				.catch((e) => message.error('网络错误'))
				.finally(() => this.setState({loading: false}))
		})
	}

	render() {
		const {user_list, loading, search} = this.state
		const book_list = books.booklist
		const columns = [
			{
				title: '用户卡号',
				dataIndex: 'card',
			}, {
				title: '用户名',
				dataIndex: 'username',
			}, {
				title: '姓名',
				dataIndex: 'name',
			}, {
				title: '邮箱',
				dataIndex: 'email',
			}, {
				title: '手机',
				dataIndex: 'phone',
				render: p => '18043211234'
			}, {
				title: '状态',
				dataIndex: 'status',
				render: t => <Tag color="#108ee9">正常</Tag>
			}, {
				title: '功能',
				key: 'action',
				render: (text, record) => (
					<div className="m-fun">
						<Button type='primary' size='small' size='small' className="m-blue">修改</Button>
						<Button type='danger' size='small' size='small' className="m-blue">删除</Button>
					</div>
				),
			}
		]

		return (
			<div className='g-user'>
				<div className="m-userlist">
					<Button type="primary" style={{ marginBottom: 16 }}><Icon type="user-add" />添加用户</Button>
					<Spin
						tip="加载中"
						spinning={loading}
						indicator={<Icon type="loading" style={{fontSize: 24}} spin/>}
					>
						<Card>
							{!search && (
								<Form layout="inline">
									<Form.Item label="用户卡号">
										<Input/>
									</Form.Item>
									<Form.Item label="用户名">
										<Input/>
									</Form.Item>
									<Form.Item label="邮箱">
										<Input/>
									</Form.Item>
									<Form.Item label="姓名">
										<Input/>
									</Form.Item>
									<Form.Item>
										<Button type="primary">
											搜索
										</Button>
										<Button style={{marginLeft: 8}} onClick={this.handleReset}>
											重置
										</Button>
									</Form.Item>
								</Form>
							)}
						</Card>
						<Table size='small' dataSource={user_list} columns={columns} rowKey={item => item.id}/>
					</Spin>
				</div>
			</div>
		)
	}
}

export default Overdue
