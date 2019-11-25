import React from 'react'
import { Icon, Form, Table, Input, Button, Skeleton, Modal, Tag, Divider, message, Card } from 'antd'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import './index.less'
import books from '../../constant/books'


@inject('userStore')
@observer
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			userlist: [],
			visible: false,
		}
	}

	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
			<div style={{padding: 8}}>
				<Input
					ref={node => {
						this.searchInput = node
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					style={{width: 188, marginBottom: 8, display: 'block'}}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm)}
					icon="search"
					size="small"
					style={{width: 90, marginRight: 8}}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => (
			<Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select())
			}
		},
		render: text => (
			<Highlighter
				highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		),
	})

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


	doSetPos = (record, pos) => {
		this.setState({visible: true, uid: record.key, pos: pos})
	}

	handleOk = async () => {
		this.setState({loading: true})
		let r = await this.props.userStore.setUserPos({uid: this.state.uid, pos: this.state.pos})
		this.setState({loading: false, visible: false, userlist: r.data})
	}

	handleCancel = () => {
		this.setState({visible: false})
	}

	doDetail = () => {

	}

	render() {
		const booklist = books.booklist
		console.log(booklist)
		const {visible, loading} = this.state

		const columns = [{
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
					<Button size="small" className="m-blue" onClick={this.doDetail.bind(this, record)}>详情</Button>
					<Button size="small" className="c-green" onClick={this.doStatus.bind(this, record, 1)}>激活</Button>
					<Button size="small" className="c-black" onClick={this.doStatus.bind(this, record, 2)}>离职</Button>
				</div>
			),
		},
		]

		return (
			<div className='g-user'>
				<Card>
					fdsa
				</Card>
				<div className="m-userlist">
					<Table size='small' dataSource={booklist} columns={columns}/>
				</div>

				<Modal
					visible={visible}
					onOk={this.handleOk}
					confirmLoading={loading}
					onCancel={this.handleCancel}
				>
					<p>确认提交任命<span className="m-strong">{this.state.pos}</span>职位?</p>
				</Modal>
			</div>
		)
	}
}

export default Login
