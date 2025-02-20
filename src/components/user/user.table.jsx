import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../../services/api.service';

const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([])

    useEffect(() => {
        loadUsers();
    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',

        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',

        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
    ];

    const loadUsers = async () => {
        const res = await fetchAllUserAPI()
        setDataUsers(res.data)
    }


    return (
        <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
    )
}

export default UserTable