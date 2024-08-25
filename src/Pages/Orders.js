
import { Avatar, Rate, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {  getOrders } from '../API/allApi'

const Orders = () => {

  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setLoading(true)

    getOrders().then((res)=> {
      setLoading(false)
      setDataSource(res.products)
    })
}, [])

  return (
    <div>
      <Space size={20} direction='vertical' >
      <Typography.Title level={4}>Orders</Typography.Title>
      <Table columns={[
      
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        
      },
      {
        title: "DiscountedPrice",
        dataIndex: "discountedTotal",
        render: (value)=> <span>
          ${value}
        </span>
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
       
      },
      {
        title: "Total",
        dataIndex: "total",
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

export default Orders