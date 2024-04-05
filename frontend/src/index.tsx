import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/workoutContext'
import { AuthContextProvider } from './context/AuthContext'
import { SidebarProvider } from './context/SidebarContext'; // Import the SidebarProvider


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);