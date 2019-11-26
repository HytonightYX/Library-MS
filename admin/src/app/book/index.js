import React from 'react'
import { Icon, Form, Table, Input, Button, Skeleton, Modal, Tag, Divider, message, Card, Row, Col, Select, DatePicker, Drawer } from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'
import books from '../../constant/books'

const {Option} = Select
const pStyle = {
	fontSize: 16,
	color: 'rgba(0,0,0,0.85)',
	lineHeight: '24px',
	display: 'block',
	marginBottom: 16,
}

const DescriptionItem = ({title, content}) => (
	<div
		style={{
			fontSize: 14,
			lineHeight: '22px',
			marginBottom: 7,
			color: 'rgba(0,0,0,0.65)',
		}}
	>
		<p
			style={{
				marginRight: 8,
				display: 'inline-block',
				color: 'rgba(0,0,0,0.85)',
			}}
		>
			{title}:
		</p>
		{content}
	</div>
)


@inject('userStore')
@observer
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			userlist: [],
			visible: false,
			showDrawer: false
		}
	}

	async componentWillMount() {
		this.setState({loading: true})
		let r = await this.props.userStore.getUserList()
		this.setState({loading: false, userlist: r.data})
	}

	doStatus = async (record, status) => {
		this.setState({loading: true})
		let r = await this.props.userStore.setUserActive(record, status)
		this.setState({loading: false, userlist: r.data})
	}

	handleOk = async () => {
		this.setState({loading: true})
		let r = await this.props.userStore.setUserPos({uid: this.state.uid, pos: this.state.pos})
		this.setState({loading: false, visible: false, userlist: r.data})
	}

	handleCancel = () => {
		this.setState({visible: false})
	}

	getFields() {
		const count = this.state.expand ? 10 : 4
		const children = []
		for (let i = 0; i < 10; i++) {
			children.push(
				<Col span={6} key={i} style={{display: i < count ? 'block' : 'none'}}>
					<Form.Item label={`Field ${i}`}>
						<Input placeholder="placeholder"/>
					</Form.Item>
				</Col>,
			)
		}
		return children
	}

	toggle = () => {
		const {expand} = this.state
		this.setState({expand: !expand})
	}

	showDrawer = () => {
		this.setState({showDrawer: true})
	}

	onClose = () => {
		this.setState({visible: false})
	}

	render() {
		const booklist = books.booklist
		console.log(booklist)
		const {visible, loading} = this.state

		const columns = [
			{
				title: '书籍编号',
				dataIndex: 'id',
			}, {
				title: '书名',
				dataIndex: 'title',
			}, {
				title: 'ISBN',
				dataIndex: 'isbn13',
			}, {
				title: '作者',
				dataIndex: 'author',
			}, {
				title: '出版社',
				dataIndex: 'publisher',
			}, {
				title: '出版日期',
				dataIndex: 'pubdate',
			}, {
				title: '功能',
				key: 'action',
				render: (text, record) => (
					<div className="m-fun">
						<Button type='primary' className="m-blue" onClick={() => this.setState({visible: true})}>详情</Button>
					</div>
				),
			}
		]

		const formItemLayout = {
			labelCol: {span: 4},
			wrapperCol: {span: 14},
		}

		return (
			<div className='g-user'>
				<Card>
					<Form className="ant-advanced-search-form" {...formItemLayout}>
						<Row gutter={24}>{this.getFields()}</Row>
						<Row>
							<Col span={24} style={{textAlign: 'right'}}>
								<Button type="primary">
									搜索
								</Button>
								<Button style={{marginLeft: 8}} onClick={this.handleReset}>
									重置
								</Button>
								<a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
									展开 <Icon type={this.state.expand ? 'up' : 'down'}/>
								</a>
							</Col>
						</Row>
					</Form>
				</Card>
				<div className="m-userlist">
					<Table size='small' dataSource={booklist} columns={columns}/>
				</div>

				<Modal
					// visible={visible}
					onOk={this.handleOk}
					confirmLoading={loading}
					onCancel={this.handleCancel}
				>
					<Form layout="vertical" hideRequiredMark>
						<Form.Item label="书名">
							<Select placeholder="Please select an owner">
								<Option value="xiao">Xiaoxiao Fu</Option>
								<Option value="mao">Maomao Zhou</Option>
							</Select>
						</Form.Item>
						<Form.Item label="Type">
							<Select placeholder="Please choose the type">
								<Option value="private">Private</Option>
								<Option value="public">Public</Option>
							</Select>
						</Form.Item>
						<Form.Item label="Approver">
							<Select placeholder="Please choose the approver">
								<Option value="jack">Jack Ma</Option>
								<Option value="tom">Tom Liu</Option>
							</Select>
						</Form.Item>
						<Form.Item label="DateTime">
							<DatePicker.RangePicker
								style={{width: '100%'}}
								getPopupContainer={trigger => trigger.parentNode}
							/>
						</Form.Item>
						<Form.Item label="Description">
							<Input.TextArea rows={4} placeholder="please enter url description"/>
						</Form.Item>
					</Form>
				</Modal>

				<Drawer
					width={640}
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					<p style={{...pStyle, marginBottom: 24}}>书籍详情</p>
					<p style={pStyle}>Personal</p>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Full Name" content="Lily"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Account" content="AntDesign@example.com"/>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<DescriptionItem title="City" content="HangZhou"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Country" content="China🇨🇳"/>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Birthday" content="February 2,1900"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Website" content="-"/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<DescriptionItem
								title="Message"
								content="Make things as simple as possible but no simpler."
							/>
						</Col>
					</Row>
					<Divider/>
					<p style={pStyle}>Company</p>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Position" content="Programmer"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Responsibilities" content="Coding"/>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Department" content="XTech"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Supervisor" content={<a>Lin</a>}/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<DescriptionItem
								title="Skills"
								content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
							/>
						</Col>
					</Row>
					<Divider/>
					<p style={pStyle}>Contacts</p>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Email" content="AntDesign@example.com"/>
						</Col>
						<Col span={12}>
							<DescriptionItem title="Phone Number" content="+86 181 0000 0000"/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<DescriptionItem
								title="Github"
								content={
									<a href="http://github.com/ant-design/ant-design/">
										github.com/ant-design/ant-design/
									</a>
								}
							/>
						</Col>
					</Row>
				</Drawer>
			</div>
		)
	}
}

export default Login
