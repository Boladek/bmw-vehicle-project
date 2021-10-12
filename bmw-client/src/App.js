import DropDown from "./components/DropDown/DropDown";
import Result from "./components/Result/Result";
import {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [match, setMatch] = useState('');
  const [vehicleTypes, setVehiclesTypes] = useState([]);
  const [vehicleTypesCopy, setVehiclesTypesCopy] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const getVehicleTypes = async () => {
    try {
      let data = await fetch('http://localhost:8000/api/vehicleTypes');
      data = await data.json();
      setVehiclesTypes(data);
      setVehiclesTypesCopy(data);
    } catch (e) {
      console.log(e);
    }
  }

  const getVehicles = async () => {
    try {
      let data = await fetch('http://localhost:8000/api/vehicles');
      data = await data.json();
      setVehicles(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(()=> {
    getVehicleTypes();
    getVehicles();
  },[])

  return (
    <div className="App">
      <Result 
      vehicleTypes={vehicleTypes} 
      setVehiclesTypes={setVehiclesTypes} 
      vehicleTypesCopy={vehicleTypesCopy} 
      vehicles={vehicles} 
      setVehicles={setVehicles}
      match={match}/>

      <DropDown 
      vehicleTypes={vehicleTypes} 
      setVehiclesTypes={setVehiclesTypes} 
      vehicleTypesCopy={vehicleTypesCopy} 
      vehicles={vehicles} 
      setVehicles={setVehicles}
      setMatch={setMatch} />
    </div>
  );
}

export default App;
