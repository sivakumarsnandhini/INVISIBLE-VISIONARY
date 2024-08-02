
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
import Main_page from './Components/Main_page';
import alan from './Components/Alan'
import Sign from './Components/Sign-Login/Sign'
import Customer from './Components/Admin/index_Cus_admin'
import Cart from './Components/CartPage/Cart'
import Wishlist from './Components/Whishlist/whishlist'
import Orders from './Components/orders/Orders'
import Account from './Components/account/account'
import Admin from './Components/Admin/index'
import Help from './Components/Admin/ProductCreations/Help'
import axios from 'axios'
import './App.css'
import Empty from './Empty';
import { useSelector } from 'react-redux'


export default function DrawRectangle() {

  const [ready, setready] = useState(false)
  const [url, seturl] = useState('')
  const [video, setvideo] = useState('')
  alan()

  // const load = async () => {
  //   await ffmpeg.load()
  //   setready(true)
  // }

  // const convertvideo = async () => {
  //   ffmpeg.FS('writeFile', 'test.avi', await fetchFile('https://sgp1.digitaloceanspaces.com/tentovision/JN-01/2023-07-14/Conference_Room/14:23:41.mp4'));
  //   await ffmpeg.run('-i', 'test.avi','-vcodec', 'h264','test.mp4');


  //   const data = ffmpeg.FS('readFile', 'test.mp4');
  //   const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  //   console.log(url);
  //   seturl(url)
  //   setready(false)
  //   // console.log(uri);
  // }

  // if (ready === true) {
  //  convertvideo()
  // }

  return (


    <Router>
      <Routes>
        <Route path="/" element={<Main_page />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/sign-up" element={<Sign />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/Customer" element={<Customer/>} />
        <Route path="/Helpline" element={<Help/>} />
      </Routes>
    </Router >
  )
}