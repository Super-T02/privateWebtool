import { Component } from "react";
import DataTable from "./DataTable";
import {carData} from "./data";

export class CarApp extends Component {


    render() {
        return (
            <>
                <DataTable type={"Steuern"} datasets={carData.TAXES} />
                <DataTable type={"Tanken"} datasets={carData.FUEL} />
                <DataTable type={"Versicherung"} datasets={carData.INSURANCE} />
                <DataTable type={"Reperatur"} datasets={carData.REPAIR} />
                <DataTable type={"Rest"} datasets={carData.REST} />
            </>
        );
    }
}

export default CarApp;