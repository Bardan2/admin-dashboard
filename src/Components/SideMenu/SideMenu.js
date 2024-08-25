import { AppstoreAddOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SideMenu = () => {

    const location = useLocation()
    const [selectedKeys, setSelectedKeys] = useState('/')

    useEffect(() => {
        const pathname = location.pathname
        setSelectedKeys(pathname);
    }, [location.pathname])

    const navigate = useNavigate()

  return (
    <div className='SideMenu'>
        <Menu className='SideMenuVertical' mode='vertical' onClick={(item)=> {
            // items.key
            navigate(item.key);
        }} 
        selectedKeys={[selectedKeys]}
        items={[
        {
            label:"Dashboard",
            icon: <AppstoreAddOutlined/>,
            key:"/",
        },
        {
            label:"Inventory",
            icon: <ShopOutlined/>,
            key:"/inventory",
        },
        {
            label:"Orders",
            icon: <ShoppingCartOutlined/>,
            key:"/orders"
        },
        {
            label:"Customers",
            icon: <UserOutlined/>,
            key:"/customers"
        },
        ]}>

        </Menu>
    </div>
  )
}

export default SideMenu