import Home from './Home';
import ActivityManager from './components/ActivityManager';
import {useState, useEffect} from 'react'

function App() {


  return (
    <div className="App">
      <div className="display-container" >
        <Home  />
        <ActivityManager />
      </div>
    </div>
  );
}

export default App;
