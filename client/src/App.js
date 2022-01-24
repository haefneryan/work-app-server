import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import AllOrders from './pages/AllOrders';
import AddOrder from './pages/AddOrder';
import Triage from './pages/Triage';
import Dashboard from './pages/Dashboard';
import Completed from './pages/Completed';

import axios from 'axios';
require('dotenv').config();

const App = () => {
  let url;
  const port = process.env.REACT_APP_PORT || 4000;
  console.log(process.env.REACT_APP_PORT);
  console.log(process.env.REACT_APP_NODE_ENV);
  if (process.env.REACT_APP_NODE_ENV === 'development') {
    url = `http://localhost:${port}`;
  } else {
    url = 'https://stormy-plateau-67088.herokuapp.com';
  }
  //const url = 'http://localhost:5000/'
  console.log(url);
  const [orders, setOrders] = useState({});
  const [triageOrders, setTriageOrders] = useState({});
  const [dashboardOrders, setDashboardOrders] = useState({});
  const [completedOrders, setCompletedOrders] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const renderCount = useRef(0);
 
  useEffect(() => {   
    getOrders();
  }, []);

  useEffect(() => {
    renderCount.current++
    if(renderCount.current > 0 && orders.length > 0) {
      setFilters(orders);
    }
  }, [orders])

  const getOrders = async () => {
    try {
      const res = await axios.get(url, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
          }
      })
      setOrders(res.data.data)
      setDataLoaded(true)
    } catch (err) {
      console.log(err)
    }
  }

  const addOrder = () => {
    if (document.getElementById('addOrderCustomer').value.length === 0) {
      alert('Please enter a Customer name')
    } else {
      alert('Order has been created!')
      axios
        .post(url, {
          customer: document.getElementById('addOrderCustomer').value,
          stylenumber: document.getElementById('addOrderStyleNumber').value,
          triageowner: 'None',
          owner: 'None',
          workload: 2,
          buildtime: null,
          triagecomplete: null,
          designcomplete: null,
          duedate: null
        })
        .then(getOrders())
        .catch(error => console.log(error))
        document.getElementById('addOrderCustomer').value = '';
        document.getElementById('addOrderStyleNumber').value = 'Style Number 1';
    }
  }

  const deleteOrder = (order) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      axios
        .delete(`${url}/${order._id}`)
        .then(getOrders())
        .catch(error => console.log(error))
    }
  }

  const updateWorkload = (order, e) => { 
    axios
    .put(`${url}/${order._id}`, { workload: e.target.value })
    .then(getOrders())
    .catch(error => console.log(error))
  }

  const updateBuildTime = (order, e) => {
    console.log(e.target.value)   
    axios
      .put(`${url}/${order._id}`, { buildtime: e.target.value })
      .then(getOrders())
      .catch(error => console.log(error))
  }

  const updateTriageOwner = (order, e) => {  
    axios
    .put(`${url}/${order._id}`, { triageowner: e.target.value })
    .then(getOrders())
    .catch(error => console.log(error))
  }
  
  const updateOwner = (order, e) => {    
    axios
      .put(`${url}/${order._id}`, { owner: e.target.value })
      .then(getOrders())
      .catch(error => console.log(error))
  }

  const getToday = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd
    return today
  }

  const updateTriageComplete = (order) => {
    let today = getToday()
    if (order.triageowner === 'None') {
      alert('Please select a triage owner')
    } else if (order.workload === null || order.workload.length === 0) {
      alert('Please enter a workload')
    } else {
      axios
        .put(`${url}/${order._id}`, { triagecomplete: today })
        .then(getOrders())
        .catch(error => console.log(error))
      alert(`Order has been marked with triage date of ${today}`)
    }
  }

  const updateDesignComplete = (order) => {
    let today = getToday()
    if (order.owner === 'None') {
      alert('Please select an owner')
    } else if (order.buildtime === null || order.buildtime.length === 0) {
      alert('Please enter a build time')
    } else {
      axios
        .put(`${url}/${order._id}`, { designcomplete: today })
        .then(getOrders())
        .catch(error => console.log(error))
    }
  }

  const setFilters = (orders) => {
    setTriageOrders(orders.filter((x) => x.triagecomplete === null))
    setDashboardOrders(orders.filter((x) => x.triagecomplete !== null && x.designcomplete === null))
    setCompletedOrders(orders.filter((x) => x.triagecomplete !== null && x.designcomplete !== null))
  }

  if(dataLoaded === false)
    return (
      <p>loading...</p>
  )

  if(dataLoaded === true && triageOrders !== null) {

    return (
      <>
        <div className="App">
          <Navbar />
          <h1>SCHEDULING TOOL</h1>
          <Routes>
            <Route path='/' element={<AllOrders orders={orders} triageOrders={triageOrders} deleteOrder={deleteOrder} />}></Route>
            <Route path='/triage' element={<Triage triageOrders={triageOrders} updateWorkload={updateWorkload} updateTriageOwner={updateTriageOwner} updateTriageComplete={updateTriageComplete} deleteOrder={deleteOrder}/>}></Route>
            <Route path='/dashboard' element={<Dashboard dashboardOrders={dashboardOrders} updateOwner={updateOwner} updateBuildTime={updateBuildTime} deleteOrder={deleteOrder} updateDesignComplete={updateDesignComplete}/>}></Route>
            <Route path='/completed' element={<Completed completedOrders={completedOrders} deleteOrder={deleteOrder}/>}></Route>
            <Route path='/create-new-order' element={<AddOrder addOrder={addOrder}/>}></Route>
          </Routes>
        </div>
      </>
    )
  }
}

export default App;
