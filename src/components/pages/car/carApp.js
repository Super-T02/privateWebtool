import { Component } from "react";
import { Button } from "react-bootstrap";

export class CarApp extends Component {
    render() {
        return (
            <>
                <Button onClick={() => alert("Moin alla")}>Test</Button>
            </>
        );
    }
}

export default CarApp;