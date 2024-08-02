import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ALANINSTANCE, USER_CREDENTAILS } from '../../store/action'
import { USER_CREATION, USER_VALIDATE } from '../../Api'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './style.css'
import { Modal } from 'react-bootstrap'
import Webcam from 'react-webcam'

export default function Sign() {
  const alan_data = useSelector((state) => state.alanreducer)
  const User_credentails = useSelector((state) => state.User_credentails)
  const [login, setlogin] = useState(alan_data.page === 'signin' ? false : true)
  const [user_name, setuser_name] = useState(User_credentails.user_name)
  const [mail, setmail] = useState(User_credentails.mail)
  const [password, setpassword] = useState(User_credentails.password)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setshow] = useState(false)
  const webcam = useRef(null)
  const [store, setstore] = useState(null)
  const [choose, setchoose] = useState('user')
  const [cus_username, setcus_username] = useState('')
  const [cus_pass, setcus_pass] = useState('')











  if (show) {
    setTimeout(() => {
      sendImageToBackend();
      setshow(false);
    }, 4000);
  }




  const sendImageToBackend = () => {
    let arr = []
    for (let index = 0; index < 9; index++) {
      const imageSrc = webcam.current.getScreenshot();
      arr.push(imageSrc)
    }

    const data = {
      uri: arr,
      name: user_name,
    }

    console.log(arr, 'jj');
    const options = {
      method: 'POST',
      url: login ? "http://localhost:5000/login" : "http://localhost:5000/enroll",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };

    console.log(options.data);
    axios(options).then((res) => {
      console.log(res.data, 'res');
      setstore(res.data.success)
      if (res.data.success == "true") {
        user()
      } else {
        user_credentails('sigIn', '', 'your face are not detect')
      }
    })
  };

  function user_credentails(name, data, msg) {
    if (alan_data) {
      alan_data.alaninstance.activate();
      alan_data.alaninstance.callProjectApi(name, {
        data: data,
        msg: msg
      }, function (error, result) { });
    }
  }
  console.log(User_credentails.type);

  useEffect(() => {
    if (alan_data.page === 'signin') {
      setlogin(false)
      if (user_name == '' && mail == '' && password == '') {
        user_credentails('sigIn', '', 'provide user name, mail  password and ScanFace')
      }

    } else if (alan_data.page === 'login') {
      setlogin(true)
      if (user_name == '' && mail == '' && password == '') {
        user_credentails('sigIn', '', 'provide user name,  password, and ScanFace')
      }
    } else if (alan_data.page === 'scan_face') {
      if (User_credentails.user_name != '' && User_credentails.password !== '') {
        setshow(true)
        user_credentails('sigIn', '', `Scanning start show your face`)
      } else {
        user_credentails('sigIn', '', `Your username and password are empty. Please enter the username and password first`)
      }
    }
  }, [alan_data])

  useEffect(() => {
    if (User_credentails.page === 'sign-up') {
      if (User_credentails.current === 'user_name') {
        user_credentails('sigIn', '', ` your username is ${User_credentails.user_name}`)
        setuser_name(User_credentails.user_name)
      } else if (User_credentails.current === 'mail') {
        user_credentails('sigIn', '', `your mail is ${User_credentails.mail}@gmail.com,`)
        setmail(User_credentails.mail)
      } else if (User_credentails.current === 'password') {
        user_credentails('sigIn', '', `your password is ${User_credentails.password}`,)
        setpassword(User_credentails.password)
      }
    } else if (User_credentails.page === 'mainpage') {
      user_credentails('sigIn', '', 'your not in sign in page or log in page are you want to go to sign in page or log in page tell go to sign in page or go to log in page')
    } else if (User_credentails.type === 'login') {
      if (User_credentails.type === 'login' && alan_data.page === 'login user') {
        if (user_name !== '' && password !== '') {
          user()
        } else {
          user_credentails('sigIn', '', 'user name not be empty, and password not be empty')
        }
      } else {
        user_credentails('sigIn', '', 'you are in log in page you have to go to sign in page to sign in')
      }
    } else {
      if (User_credentails.type === 'signin') {
        if (User_credentails.type === 'signin' && alan_data.page === 'signin user') {
          if (user_name !== '' && mail !== '' && password !== '') {
            user()
          } else {
            user_credentails('sigIn', '', 'user name not be empty, mail not be empty, and password not be empty')
          }
        } else {
          user_credentails('sigIn', '', 'you are in sign in page you have to go to log in page to log in')
        }
      }
    }
  }, [User_credentails])


  function user() {

    // const username = localStorage.getItem("Client_Id")
    let val = {
      user_name: user_name,
      password: password,
      mail: mail,
      client_id: user_name,
      user_type: '',
      type: 'user',
    }

    const getStocksData = {
      url: User_credentails.type === 'signin' ? USER_CREATION : USER_VALIDATE,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: val
    }
    axios(getStocksData)
      .then(response => {
        console.log(response)
        if (User_credentails.type === 'signin') {
          dispatch({ type: USER_CREDENTAILS, click: 'user_name', user_name: '' })
          dispatch({ type: USER_CREDENTAILS, click: 'mail', mail: '' })
          dispatch({ type: USER_CREDENTAILS, click: 'password', password: '' })
          dispatch({ type: USER_CREDENTAILS, click: 'current', current: '' })
          setuser_name('')
          setmail('')
          setpassword('')
          user_credentails('sigIn', '', 'sign in successfully, now you have to log in')
        } else {
          if (response.data.status) {
            dispatch({ type: USER_CREDENTAILS, click: 'user_name', user_name: '' })
            dispatch({ type: USER_CREDENTAILS, click: 'mail', mail: '' })
            dispatch({ type: USER_CREDENTAILS, click: 'password', password: '' })
            dispatch({ type: USER_CREDENTAILS, click: 'current', current: '' })
            localStorage.setItem("userdata", JSON.stringify(response.data.data))
            navigate('/')
            user_credentails('sigIn', '', 'log in successfully')
          } else {
            user_credentails('sigIn', '', 'log in failed, user name, password, must be incorrect')
          }
        }
      })
      .catch(function (e) {
        if (e.message === 'Network Error') {
          alert("No Internet Found. Please check your internet connection")
        }
        else {
          alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
        }

      });



  }

  return (
    <div className='outer'>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        {
          show ? (
            <>
              {show && (
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.61)', width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ width: '500px', background: '#fff', padding: '20px', borderRadius: '8px', overflow: 'hidden' }}>
                    <Modal.Dialog>
                      <Webcam
                        audio={false}
                        height={500}
                        ref={webcam}
                        screenshotFormat="image/jpeg"

                      />

                    </Modal.Dialog>
                  </div>
                </div>
              )}
            </>
          ) :


            <div className="signup">
              <form onSubmit={(e) => { e.preventDefault() }} className='form'>

                <label className='label' for="chk" aria-hidden="true">{login ? 'Login' : 'Sign up'}</label>
                {login ?
                  <select
                    name="userType"
                    style={{ marginBottom: '10px', backgroundColor: "#E0DEDE", width: "13rem", height: "2.1rem", borderRadius: "5px" }}
                    onChange={(e) => { setchoose(e.target.value); console.log(e.target.value); }}
                    value={choose}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value='customer_admin'>Customer Admin</option>
                  </select>
                  : null
                }

                <input type="text" name="txt" placeholder="User name" value={user_name} required="" style={{ marginBottom: '10px' }} onChange={(e) => setuser_name(e.target.value)} />
                {
                  login ? ''
                    :
                    <input type="email" name="email" value={mail === '' ? '' : `${mail}@gmail.com`} placeholder="Email" required="" style={{ marginBottom: '10px' }} onChange={(e) => setmail(e.target.value)} />
                }

                <input type="password" name="pswd" value={password} placeholder="Password" required="" style={{ marginBottom: '10px' }} onChange={(e) => setpassword(e.target.value)} />
                <button className='button' onClick={() => {
                  if(user_name == '' || password ==''){
                    alert('please Enter the name and password')
                  }
                 else if (  choose === 'admin') {
                  if(user_name === 'admin' && password === 'admin'){
                    navigate('/admin');
                  }
                  else{
                    alert('please Enter the current admin username password')
                  }
                   
                  } else if (  choose === "customer_admin") {

                    if(user_name !== '' && password !== ''){

                      axios.post(USER_VALIDATE, {
                        "user_name": user_name,
                        "password": password
                      })
                        .then((res) => {
                          console.log(res.data.data);
                          if (res.data.status === true) {
                            localStorage.setItem("userdata", JSON.stringify(res.data.data))
                            navigate('/Customer');
                          } else {
                            console.log('Authentication failed');
                            alert("Authentication failed !     please Enter the correct username and password")
                          }
                        })
                        .catch((error) => {
                          console.error('Error:', error);
                        });
  
                    }else if(user_name =='' ||password ==''){
                      alert('please enter the correct name and password')
                    }
                    


                  } else {
                    setshow(true);
                  }
                }}>
               {login ? 'Login' : 'Sign up'}
                </button>





              </form >
            </div>
        }



        {
          show ? null :
            <div className="login">
              <form className='form'>
                <label className='label' aria-hidden="true" onClick={() => setlogin(!login)}>{login ? 'Login' : 'Sign up'}</label>
              </form>

            </div>
        }
      </div>
    </div>
  )
}
