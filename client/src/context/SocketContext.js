import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:8082');
// const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  // const [stream, setStream] = useState();
  const stream = useRef();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  

  useEffect( () => {
    socket.on('me', (id) => setMe(id));

    socket.on("callEnded",() => {
      window.location.assign('/');
    })

    socket.on('callUser', ({signal, from, callerName}) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
      setName(callerName);
    });
  }, [socket,callEnded]);

  const answerCall = async() => {
    await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        stream.current = (currentStream);
        myVideo.current.srcObject = currentStream;
      });
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream:stream.current });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = async (id,callerName) => {

    await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        stream.current = currentStream
        myVideo.current.srcObject = currentStream;
      });

    const peer = new Peer({ initiator: true, trickle: false, stream:stream.current });
    peer.on('signal', (data) => {
    socket.emit('callUser', { userToCall: id, signalData: data, from: me, callerName});
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket.emit('callEnded');
    connectionRef.current.destroy();
    window.location.assign('/');
  };

  return (
    <SocketContext.Provider value={{
      call,
      socket,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };