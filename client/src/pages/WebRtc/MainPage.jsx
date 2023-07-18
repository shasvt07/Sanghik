import {ContextProvider} from '../../context/SocketContext';
import VideoCall from './VideoCall';
import './styles.css';
import React from 'react'

const MainPage = () => {
  return (
    <ContextProvider>
      <VideoCall/>
    </ContextProvider>
  )
}

export default MainPage