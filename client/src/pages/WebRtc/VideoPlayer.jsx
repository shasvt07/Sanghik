import React, { useContext, useEffect } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";

import { SocketContext } from "../../context/SocketContext";
import { Button } from "@mui/material";
import { PhoneDisabled } from "@material-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useBackListener } from "../../components/hooks/useBackListner";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));



const VideoPlayer = ({ currentUserName}) => {
  
  const {
    name,
    callAccepted,
    leaveCall,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);
  const classes = useStyles();


  useEffect(() => {
    if (callEnded) {
      window.location.assign("/");
    }
  }, [callEnded]);



  useEffect(() => {
    window.onpopstate = () => {
      leaveCall()
    }
  }, [])


  return (
    <div >
      <Grid container className={classes.gridContainer}>
        {stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {currentUserName || "Name"}
              </Typography>
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className={classes.video}
              />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {name || "Name"}
              </Typography>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className={classes.video}
              />
            </Grid>
          </Paper>
        )}
      </Grid>

      <Button
        style={{ width: "300px", marginLeft:'40%', marginTop:'10px',backgroundColor:'#f0544f'}}
        variant="contained"
        startIcon={<PhoneDisabled fontSize="large" />}
        fullWidth
        onClick={leaveCall}
        className={classes.margin}
      >
        Hang Up
      </Button>
    </div>
  );
};

export default VideoPlayer;
