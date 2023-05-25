import { Card, Form, Input, Button } from 'antd';
import { registerUser } from './utils/db-exp'
import { useEffect } from 'react'

const Register = () => {
    useEffect = () => {
        if(localStorage.getItem("username") != null)
            window.location.href = "/dashboard"
    }
    
    const onFinish = (user) => {
        registerUser(user.username, user.password, user.email).then((result) => {
            localStorage.setItem("username", user.username)
            window.location.href = "/dashboard"
        })
    }

    return (
        <div className="site-card-border-less-wrapper" style={{backgroundColor: "gray", width: "100vw", height:"100vh"}}>
            <Card className='col-md-6 col-md-offset-3' style={{width: 300, borderRadius: 20, float: "none", margin: 0,
                position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                <Form name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                        ]}
                    >
                        <Input />
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
                        <Input.Password />
                    </Form.Item>

                    <h1>
                    Have an account?<a href='/login'>log in</a></h1>

                        <Form.Item
                            wrapperCol={{
                            offset: 8,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
            </Card>
        </div>
    )
}

export  default Register;