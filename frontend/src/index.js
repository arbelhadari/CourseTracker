import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CourseContextProvider } from './context/CourseContext';
import { StudentContextProvider } from './context/StudentContext';
import { AuthContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CourseContextProvider>
      <StudentContextProvider>
          <App />
      </StudentContextProvider>
      </CourseContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
