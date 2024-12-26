import logo from './logo.svg';
import './App.css';
import PieChart from './components/PieChart';
import dataBase from './/data_base/spotify_data_history.json';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

        <div className="App">
          <h1>Estatísticas</h1>
          <PieChart />
        </div>
      );
    }
    
    export default App;