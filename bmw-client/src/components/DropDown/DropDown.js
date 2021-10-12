import { useState } from "react";
import { BsArrowDownCircleFill } from "react-icons/bs";
// import {removeSpaces} from '../../helperfunction'
import "./DropDown.css";

export default function DropDown({
  vehicles,
  vehicleTypes,
  setVehiclesTypes,
  vehicleTypesCopy,
  setMatch
}) {
  const [dropdownDisplay, setDropDownDisplay] = useState(false);
  const [car, setCar] = useState({});
  const handleDropDown = () => {
    if (!dropdownDisplay) {
        setVehiclesTypes(vehicleTypesCopy);
        setMatch('');   
    }
    setDropDownDisplay(!dropdownDisplay);
  };

  function removeSpaces(string) {
    return string.replace(/\s/g, "").toLowerCase();
  }

  function combineModelAndType(model, type) {
    let newModel = "";
    for (let i = 0; i < model.length; i++) {
      if ((i === 0 && +model[i] === 5) || !model[i].trim()) continue;
      if (model[i] === "(") break;
      newModel += model[i];
    }

    return newModel.toLowerCase() + removeSpaces(type);
  }

  function sliceFirstFour(string) {
    if (!string) return new Date().getFullYear();
    return Number(string.slice(0, 4));
  }

  const matchVehicleModel = (obj) => {
    setCar(obj);
    setMatch(obj.model)
    let newVehicleTypes = vehicleTypes.filter((item) => {
      if (
        removeSpaces(item.typeName) === removeSpaces(obj.model) ||
        combineModelAndType(item.model, item.typeName) ===
          removeSpaces(obj.model)
      ) {
        if (
          new Date(obj.regDate).getFullYear() >=
            sliceFirstFour(item.monthOfConstrFrom) &&
          +new Date(obj.regDate).getFullYear() <=
            sliceFirstFour(item.monthOfConstrTo)
        ) {
          return true;
        }
      }
    });
    setVehiclesTypes(newVehicleTypes);
    setDropDownDisplay(!dropdownDisplay);
  };

  return (
    <div className="dropdown">
        <div className="dropdown-button" onClick={() => handleDropDown()}>
            <p> Click here </p>
            <span>
            <BsArrowDownCircleFill />
            </span>
        </div>
        <div
          className={
            vehicles && dropdownDisplay ? "dropdown-content" : "hide-dropdown"
          }
        >
          {vehicles.map((bmw) => (
            <li key={bmw.id}>
              <div
                className="dropdown-item"
                onClick={() => matchVehicleModel(bmw)}
              >
                {bmw.model}
              </div>
            </li>
          ))}
      </div>
    </div>
  );
}
