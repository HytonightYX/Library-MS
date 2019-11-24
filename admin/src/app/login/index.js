import React from 'react';
import { Icon, Form, Input, Button, Divider, message } from 'antd';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import './index.less';
import { computed } from 'mobx';
import token from 'util/token.js';

@inject('userStore')
@observer
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };

        let user = token.getUser();
        if (user) {
            let values = { email: user.email, pwd: user.pwd };
            this.props.userStore.login(user)
                .then(r => {
                    if (r && r.code === 200) {
                        message.success(r.msg);
                    } else if (r && r.code === 301) {
                        message.error(r.msg);
                    }
                });
        }
    }

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    doLogin = () => {
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                return;
            }

            this.props.userStore.login(values)
                .then(r => {
                    if (r && r.code === 200) {
                        message.success(r.msg);
                    } else if (r && r.code === 301) {
                        message.error(r.msg);
                    }
                });
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='g-login'>
                {this.currUser && <Redirect to='/'/>}

                <div className="m-tri">
                    图书后台管理系统
                </div>
                <div className='m-login'>
                    <Form>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名！' }],
                                initialValue: '',
                            })(
                                <Input
                                    icon="search"
                                    size='large'
                                    className="input-pwd input-center"
                                    placeholder="用户名"
                                    allowClear
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('pwd', {
                                rules: [{ required: true, message: '请输入密码！' }],
                            })(
                                <Input.Password
                                    size='large'
                                    className="input-pwd input-center"
                                    placeholder="密码"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                />)}
                        </Form.Item>

                        <Form.Item className='no-bottom'>
                            <Button
                                type="primary"
                                className="input-btn"
                                onClick={this.doLogin}
                                block
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);
