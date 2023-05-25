import { Card, Form, Input, Checkbox, Button, InputNumber } from 'antd'
import { loginUser } from './utils/db-exp'
import { useEffect } from 'react'

const Login = () => {
    useEffect(() => {
        if(localStorage.getItem('username') != null) {
            window.location.href = "/dashboard"
        }
    }, [])
    
    const onFinish = (user) => {
        loginUser(user.username, user.password).then((result) => {
            if(result.data.data == true) {
                localStorage.setItem("username", user.username)
                window.location.href="/dashboard"
            }
        })
      };

    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    return (
        <div className="site-card-border-less-wrapper" style={{backgroundColor: "red", width: "100vw", height:"100vh"}}>
            <Card className='col-md-6 col-md-offset-3' style={{width: 300, borderRadius: 20, float: "none", margin: 0, 
                position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                <Form name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
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
                    didn't have and account?<a href='/register'>sign in</a></h1>

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

export default Login