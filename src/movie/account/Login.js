import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input } from 'antd'

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle, } from "../../firebase/index";
import Background from '../main/static/background.jpg'
import Loading from '../base/components/loading/Loading'
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'
export default function Login() {
    const [form] = Form.useForm();
    const [value, setValue] = useState('')

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const handleSignIn = (value) => {
        if (value) {
            let { password, email } = value
            if (password && email) {
                logInWithEmailAndPassword(email, password);
            }

        }
    }
    useEffect(() => {
        if (loading) return;
        if (user) navigate('/')
    }, [user, loading])

    return (
        <React.Fragment>
            {
                loading ? <Loading />
                    :
                    <div style={{ position: 'absolute', background: 'linear-gradient(to right, rgba(3,37,65, 0.75) 0%, rgba(3,37,65, 0.75) 100%)', width: '100%', height: '100%' }}>
                        <div className='background' style={{ opacity: 0.5, height: '100%' }}>
                            <img src={Background} alt='Background Login' style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className='content-login'
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                                backgroundColor: '#fff',
                                padding: '60px 68px 40px'
                            }}>
                            <h3>Sign In</h3>
                            <div className='form' >
                                <Form
                                    form={form}
                                    name="basic"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}

                                    style={{
                                        maxWidth: 600,
                                    }}
                                >
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Email không đúng định dạng!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input autoComplete="off" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password autoComplete="off" />
                                    </Form.Item>
                                </Form>
                            </div>
                            <div style={{ padding: '40px 20px' }}>
                                <Button type="primary" htmlType="submit"
                                    style={{ width: '100%' }}
                                    onClick={() => {
                                        form.validateFields().then((values) => {
                                            handleSignIn(values);
                                        }).catch((info) => {
                                           
                                        })
                                    }}>
                                    Sign In
                                </Button>
                                <Button type="primary" htmlType="submit"
                                    style={{ width: '100%', marginTop: 10, marginBottom: 10, position: "relative" }}
                                    onClick={signInWithGoogle}>
                                    <FcGoogle style={{ fontSize: 19, backgroundColor: '#fff', position: 'absolute', top: 0, left: 0, width: 30, height: 30 }} />
                                    Sign In with Google
                                </Button>
                                <p>Don't have an account ? <a href='/sign-up' style={{ fontStyle: 20 }}>Sign Up Now</a></p>
                                <p>Forgot your password ?<a href='#' style={{ fontStyle: 20 }}>Reset Password</a></p>
                            </div>
                        </div>
                    </div>
            }
        </React.Fragment >
    )
}   
