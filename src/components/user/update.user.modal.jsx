import { useEffect, useState } from "react";
import { Button, Input, Modal, notification } from "antd"
import { createUserAPI, updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUsers } = props;

    const [id, setId] = useState("")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]
    )


    const handleSubmitBtn = async () => {

        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "update user",
                description: "update user success"
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
        setIsModalUpdateOpen(false);

        setId("");
        setFullName("");
        setPhone("");
        setDataUpdate(null);
    }

    return (

        <Modal
            title="Update a user"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => setIsModalUpdateOpen(false)}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
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
    )
}

export default UpdateUserModal