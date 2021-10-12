import {useState} from 'react'
import './Result.css';

export default function Result({vehicleTypes, match}) {


    return (
        <>
        {vehicleTypes && 
            (<div className="result">
                {match ? <h1>List of All Vehicle(s) that matches {match}</h1> : <h1>List of All Vehicle Types</h1>}
                <table>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Model</th>
                            <th>Typename</th>
                            <th>Month of Construction From</th>
                            <th>Month of Construction To</th>
                        </tr>
                    </thead>
                {vehicleTypes.map((vehicle, index) => (
                    <tbody>
                        <tr key={vehicle.id}>
                            <td>{index + 1}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.typeName}</td>
                            <td>
                            {vehicle.monthOfConstrFrom.substring(0, 4) + " - " + vehicle.monthOfConstrFrom.substring(4, vehicle.monthOfConstrFrom.length)}</td>
                            <td>
                            {vehicle.monthOfConstrTo ? vehicle.monthOfConstrTo.substring(0, 4) + " - " + vehicle.monthOfConstrTo.substring(4, vehicle.monthOfConstrTo.length) : 'In Stock'}</td>
                        </tr>
                    </tbody>
                ))}
                </table>
            </div>)
        }
        </>
    )
}
