import React, { useContext, useEffect } from 'react'
import { Typography,AppBar } from '@mui/material'
import VideoPlayer from './VideoPlayer'
import Options from './Options'
import Notification from './Notification'
import { makeStyles } from '@material-ui/core'
import { ContextProvider, SocketContext } from '../../context/SocketContext'
import { AuthContext } from '../../context/authContext'


const useStyles = makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: '30px 100px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      border: '2px solid black',
  
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
    image: {
      marginLeft: '15px',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  }));
  

const VideoCall = () => {
  const { me, callAccepted, answerCall, call, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  // console.log(name);
  const {currentUser} = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div className='wrapper'>
        <AppBar className='appBar' position='static' colot= 'inherit'>
            <Typography variant = "h2" align = "center">
                Video Call
            </Typography>
        </AppBar>
        <VideoPlayer currentUserName = {currentUser.name}/>
    </div>
  )
}

export default VideoCall