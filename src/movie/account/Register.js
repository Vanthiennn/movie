import { Modal, Row, Col, Form, Input, Select, Button, Tag } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword, signInWithGoogle, } from "../../firebase/index";
import Background from '../main/static/background.jpg'


import Loading from '../base/components/loading/Loading';
import { Helmet } from 'react-helmet';
export default function Register() {
    const [form] = Form.useForm();

    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    const handleSignUp = (value) => {
        if (value) {
            let { password, email, name } = value
            if (password && email, name) {
                registerWithEmailAndPassword(name, email, password);
            }
        }
    }
    useEffect(() => {
        if (loading) return;
        if (user) {
            navigate('/')
        }
    }, [user, loading])

    return (
        <React.Fragment>
            {
                loading ? <Loading />
                    :
                    <React.Fragment>
                        <Helmet>
                            <title>Register</title>
                            <meta
                                name="description"
                                content="Register"
                            />

                        </Helmet>
                        <div style={{ position: 'absolute', background: 'linear-gradient(to right, rgba(3,37,65, 0.75) 0%, rgba(3,37,65, 0.75) 100%)', width: '100%', height: '100%' }}>
                            <div className='background' style={{ opacity: 0.5, height: '100%' }}>
                                <img src={Background} alt='Background Login' style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div className='form'
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    backgroundColor: '#fff',
                                    padding: '60px 68px 40px'
                                }}>
                                <h3 style={{ fontSize: 30 }}>Sign Up</h3>
                                <Form
                                    layout="vertical"
                                    name="form_in_modal"
                                    form={form}
                                    initialValues={{

                                    }}
                                >
                                    <Row style={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly'
                                    }}>
                                        <Col span={24} >
                                            <Form.Item
                                                name="name"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập Email đăng nhập!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Vui lòng nhập name" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} >
                                            <Form.Item
                                                name="email"
                                                rules={[
                                                    {
                                                        type: 'email',
                                                        message: 'Email không đúng định dạng!',
                                                    },
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập tên đăng nhập!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="Vui lòng nhập email" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} >
                                            <Form.Item
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true, message: 'Vui lòng nhập Mật khẩu!'
                                                    },
                                                ]}
                                            >
                                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                                                    placeholder="Mật khẩu" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} >
                                            <Form.Item
                                                name="passwordConfirm"
                                                rules={[
                                                    {
                                                        required: true, message: 'Vui lòng nhập Mật khẩu!'
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('password') === value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error('Mật khẩu không giống nhau!'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                                                    placeholder="Nhập lại mật khẩu" />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    {
                                        error ?
                                            <Row>
                                                <Col span={24} style={{ textAlign: 'center' }}>
                                                    <Tag color={'volcano'}>{error}</Tag>
                                                </Col>
                                            </Row>
                                            :
                                            null
                                    }
                                </Form>
                                <div style={{ padding: '20px 0' }}>
                                    <Button type="primary" htmlType="submit"
                                        style={{ width: '100%' }}
                                        onClick={() => {
                                            form.validateFields().then((values) => {
                                                handleSignUp(values);
                                            }).catch((info) => {

                                            })
                                        }}>
                                        Register
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
            }
        </React.Fragment >
    )
}   
