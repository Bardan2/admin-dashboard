import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getCustomers, getData, getInventory, getOrders, getRevenue } from '../API/allApi'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {

  const [orders, setOrders] = useState(0)
  const [inventory, setInventory] = useState(0)
  const [customer, setCustomer] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    getOrders().then(res => {
      setOrders(res.total)
      setRevenue(res.discountedTotal)
    })
    getInventory().then(res => {
      setInventory(res.total)
    })
    getCustomers().then(res => {
      setCustomer(res.total)
    })
    getRevenue().then(res => {
      setRevenue(res.total)
    })
  }, [])

  return (
    <div>
      <Space direction='vertical' size={20}>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction='horizontal' >
          <DashboardCard icon={<ShoppingCartOutlined style={{color: "green", background:"rgba(0,255,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8}}/>} title={"Order"} value={orders} />
          <DashboardCard icon={<ShoppingOutlined style={{color: "blue", background:"rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8}}/>} title={"Inventory"} value={inventory} />
          <DashboardCard icon={<UserOutlined style={{color: "purple", background:"rgba(0,255,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8}}/>} title={"Customer"} value={customer} />
          <DashboardCard icon={<DollarCircleOutlined style={{color: "red", background:"rgba(255,0,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8}}/>} title={"Revenue"} value={revenue} />
      </Space>

      <Space>
        <RecentOrders/>
        <DashboardChart/>
      </Space>
      </Space>
    </div>
  )
}

function DashboardCard({title, value, icon}) {
  return (
    <Card style={{width: 280}}>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  )
}

function RecentOrders() {

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true) 

    getData().then((res)=>{
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
   
  }, [])


  return <>
  <Card style={{width: 555}}>

  <Typography.Text>Recent Orders</Typography.Text>
  <Table columns={[
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Quantity',
      dataIndex: "quantity",
    },
    {
      title: 'Price',
      dataIndex: "discountedTotal",
    },
  ]}
  loading={loading}
  dataSource={dataSource}
  pagination={false}
  ></Table>
  </Card>

  </>
}


function DashboardChart() {

  const [revenue, setRevenue] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(()=> {
    getRevenue().then((res) => {
      const labels = res.carts.map(cart => {
        return `User-${cart.userId}`;
      })
      const data = res.carts.map(cart => {
        return cart.discountedTotal;
      })

      const dataSource = {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data: data,
              backgroundColor: 'rgba(255, 0, 0, 1)',
          },
        
        ]
      }

      setRevenue(dataSource)

    })
  }, [])


   const options = {
    responsive: true,
    plugins: {
      Legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Revenue',
      }
    }
  }

  const labels = ['Junuary', 'Februry', 'March', 'April', 'May', 'June', 'July', 'August']


  return <Card style={{width: 580, height: 292}}>
    <Bar options={options} data={revenue} />
  </Card> 
}

export default Dashboard