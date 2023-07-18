import React, { useContext, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';

import { SocketContext } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from '../../context/darkModeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));

const Notifications = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const {
    me,
    callAccepted,
    setCallAccepted,
    answerCall,
    call,
    callEnded,
    leaveCall,
    callUser,
  } = useContext(SocketContext);
  const classes = useStyles();

  const handleAnswer = () =>{
    navigate("/room/123");
    answerCall();
  }
  useEffect(() => {
  }, [call, callAccepted]);

  return (
    <div style={{width:250, height:'100%', justifyItems:'center'}}>
      {(call.isReceivingCall && !callAccepted) ? (
        <div>
        <div style={{width:250, alignItems:'center', margin:5, justifyContent:'space-between'}}>
          <p style={{fontSize:20, margin:20, justifyContent:'center', flex:1,display:'flex', overflow:'auto'}}>{call.name} is calling</p>
          <div style={{display:'flex', gap:10, flex:1, justifyContent:'center'}}>
          <button variant="contained" style={{ cursor:'pointer',fontSize:16, color:'#FFFFFF', borderRadius:5, height:'30px', backgroundColor:'#5271ff',border:'none'}} onClick={()=>handleAnswer()}>
            Answer
          </button>
          <button variant="contained" style={{ cursor:'pointer',fontSize:16, color:'#FFFFFF', borderRadius:5, height:'30px', backgroundColor:'#f0544f',border:'none'}} onClick={() => leaveCall()}>
            Reject
          </button>
          </div>
      </div>
      <div style={{height:1,backgroundColor:'lightgray', marginTop:20, width:'100%'}}></div>
      </div>
      )
      :
      <div style={{margin:10}}><p >No Notifications</p></div>
    }
    </div>
  );
};

export default Notifications;
