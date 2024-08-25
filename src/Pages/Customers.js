
import { Avatar, Rate, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getCustomers } from '../API/allApi'

const Customers = () => {

  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setLoading(true)

    getCustomers().then((res)=> {
      setLoading(false)
      setDataSource(res.users)
    })
}, [])

  return (
    <div>
      <Space size={20} direction='vertical' >
      <Typography.Title level={4}>Customers</Typography.Title>
      <Table columns={[
      {
        title: "Photo",
        dataIndex: "image",
        render: (link)=> {
          return <Avatar src={link} />
        }
      },
      {
        title: "First name",
        dataIndex: "firstName",
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },    
      {
        title: "Address",
        dataIndex: "address",
        render: (address) => {
          return <span>{address.address}, {address.city}</span>
        }
      },
      
      ]}
      dataSource={dataSource}
      loading={loading}
      style={{width: 1140}}
      pagination= {{
        pageSize: 5,
      }}
      ></Table>
      </Space>
    </div>
  )
}

export default Customers