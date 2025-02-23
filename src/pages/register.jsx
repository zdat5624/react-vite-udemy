import { Button, Col, Form, Input, notification, Row } from "antd"
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // console.log("check values: ", values);

        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone)

        if (res.data) {
            notification.success({
                message: "Register",
                description: "Register success"
            })
            navigate("/login");
        } else {
            notification.error({
                message: "Register error",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        // onFinishFailed={}
        >


            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        <Button onClick={() => { form.submit() }} type='primary'>Register</Button>
                    </div>
                </Col>
            </Row>




        </Form >


    )
}

export default RegisterPage