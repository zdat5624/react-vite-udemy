import { Button, Input, notification } from "antd"
import { useState } from "react"
import { createUserAPI } from "../../services/api.service"
import Modal from "antd/es/modal/Modal";


const UserForm = (props) => {

    const { loadUsers } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const handleSubmitBtn = async () => {

        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "create user",
                description: "create user success"
            })

            closeAndCloseModal();
            await loadUsers();
        } else {
            notification.error({
                message: "error create user",
                description: JSON.stringify(res.message)
            })
        }

    }

    const closeAndCloseModal = () => {
        setIsModalOpen(false);

        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    type="primary" > Create user </Button >


            </div>

            <Modal
                title="Create User"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                        <span>Full Name</span>
                        <Input
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input
                            value={phone}
                            onChange={(event) => { setPhone(event.target.value) }} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserForm