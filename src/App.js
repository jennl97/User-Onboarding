import React from 'react';
import ReactDom from 'react-dom';
import './App.css';

//import form component
import MainForm from './components/MainForm';

function App() {
  return (
   <div className="App">
     <div>
       <h1>User Onboarding Form</h1>
     </div>
     <div>
     <MainForm></MainForm>
     </div>
    </div>
  );
}

export default App;
