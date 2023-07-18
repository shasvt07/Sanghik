import React, { useState, useEffect, useCallback,useContext } from 'react'
import "./rightBar.scss"
import Login from "../../images/login.jpeg"
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUsers, followUser } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useRef } from 'react';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { SocketContext } from '../../context/SocketContext';
import { DarkModeContext } from '../../context/darkModeContext'; 

import { Button } from '@mui/material';
import Notification from '../../pages/WebRtc/Notification';




const RightBar = () => {
  // const {updateSocket,skt} = useContext(SocketContext);
  const darkMode = useContext(DarkModeContext);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const allusers = useSelector((state) => state.allusers.allusers)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {call,socket,setName,callUser,leaveCall} = useContext(SocketContext);

  const skt = useRef();


  // socket.current= useContext(SocketContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    skt.current = socket;
  }, [socket])



  const handleVideoCall = async (name,socketId) => {
    setName(name);
    callUser(socketId,currentUser.name);
    navigate(`/room/${socket.id+socketId}`);
  }

  useEffect(() => {
    dispatch(fetchUsers()); 
  },[dispatch])

  useEffect(() => {

    skt.current.emit('addUser', currentUser._id);
    skt.current.on('getUsers', users => {
      setOnlineUsers(allusers.filter(obj => {
        const foundUser = users.find(element => {
          return element.userId === obj._id;
        });
        if (foundUser) {
          obj.socketId = foundUser.socketId;
          return true;
        }
        return false;
      }));
      // setOnlineUsers(onlineUsers);
    })
  }, [skt,allusers,currentUser])



  const handleFollow = async (userid) => {
    dispatch(followUser(userid, currentUser._id))
  }


  const handleDismiss = (id) => {
    dispatch({type : 'DISMISS', payload: id});
  }

  return (
    <div className='rightBar'>
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          {allusers.filter(user => (user._id !== currentUser._id && !currentUser.followingUsers.includes(user._id))).slice(0, 4).map((user) => (
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img src={user.img} alt="" onClick={() => navigate(`/profile/${user._id}`)} />
                <span>{user.name}</span>
              </div>
              <div className="buttons">
                <button name = "followbutton" onClick={() => handleFollow(user._id)}>follow</button>
                <button onClick={() => handleDismiss(user._id)}>dismiss</button>
              </div>
            </div>
          )
          )}
        </div>

        {/* <div className="item">
          <span>Latest Activites</span>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className='content'>
                <span>Shashwat Verma</span>
                <p>
                  changed thier cover picture
                </p>
              </div>
            </div>
            <span> 1 min ago </span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className='content'>
                <span>Shashwat Verma</span>
                <p>
                  changed thier cover picture
                </p>
              </div>
            </div>
            <span> 1 min ago </span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className='content'>
                <span>Shashwat Verma</span>
                <p>
                  changed thier cover picture
                </p>
              </div>
            </div>
            <span> 1 min ago </span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className='content'>
                <span>Shashwat Verma</span>
                <p>
                  changed thier cover picture
                </p>
              </div>
            </div>
            <span> 1 min ago </span>
          </div>
        </div>
         */}
        
        <div className="item">
          <span>Online Friends</span>
          {onlineUsers.filter(user => user._id!== currentUser._id &&  currentUser.followingUsers.includes(user._id)).map((user) => (
            <div className="user">
              <div className="userInfo">
                <img src={user.img} alt="" />
                <div className="online" />
                <span>{user.name}</span>
              </div>
              <button variant="contained" style={{ cursor:'pointer',fontSize:16, color:'#FFFFFF', borderRadius:5, height:'30px', backgroundColor:'#5271ff',border:'none', alignItems:'center'}}
              onClick={() => {handleVideoCall(user.name, user.socketId)}}
              >
                  Video Call<VideoCallIcon/>
                </button>
            </div>

          ))}
        </div>
        {/* <div className="item"> */}
        {/* <Notification/> */}
        {/* </div> */}
        
      </div>
    </div>
  )
}

export default RightBar

