import { BellFilled, MailOutlined } from '@ant-design/icons'
import { Badge, Drawer, Image, List, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getComments, getOrders } from '../../API/allApi'

const AppHeader = () => {
  const [comments, setComments] = useState([])
  const [orders, setOrders] = useState([])
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  useEffect(() => {
    getComments().then(res => {
      setComments(res.comments)
    })
    getOrders().then(res => {
      setOrders(res.products)
    })
  }, [])

  return (
    <div className='AppHeader'>
        <img src='https://cdn-icons-png.flaticon.com/512/12114/12114250.png' width={40} />
        <Typography.Title> Dashboard</Typography.Title>
        <Space>
            <Badge count={comments.length} dot>
            <MailOutlined style={{fontSize: 24}} onClick={() => {
              setCommentsOpen(true)
            }} />
            </Badge>
            <Badge count={orders.length}>
            <BellFilled style={{fontSize: 24}} onClick={() => {
              setNotificationsOpen(true)
            }}/>
            </Badge>
        </Space>
        <Drawer title="Comments" open={commentsOpen} onClose={() => setCommentsOpen(false)} maskClosable>
          <List dataSource={comments} renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>
          }}></List>
        </Drawer>
        <Drawer title="Notifications" open={notificationsOpen} onClose={() => setNotificationsOpen(false)} maskClosable><List dataSource={orders} renderItem={(item) => {
            return <List.Item><Typography.Text strong>{item.title}</Typography.Text> has been ordered!</List.Item>
          }}></List></Drawer>
    </div>
  )
}

export default AppHeader