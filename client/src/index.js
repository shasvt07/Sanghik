import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthContextProvider } from './context/authContext';
import { FormpageContextProvider } from './context/formPageContext';
import { Provider } from 'react-redux';
import { store, persistor } from './reducers/store.js'
import { UpdateContext, UpdateContextProvider } from './context/UpdateContext';
import { ContextProvider  } from './context/SocketContext';
import { } from './context/SocketContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <FormpageContextProvider>
          <UpdateContextProvider>
              <ContextProvider>
                <Provider store={store}>
                  <App />
                </Provider> 
              </ContextProvider>
          </UpdateContextProvider>
        </FormpageContextProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);


