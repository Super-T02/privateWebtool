import {Component} from "react";
import {Card, Table} from "react-bootstrap";
import {carData} from "./data";

export class DataTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { type, datasets } = this.props;

        let rows = [];

        for (const dataset of datasets) {
            rows.push(
                <tr>
                    <td>{dataset.id}</td>
                    <td>{dataset.costs}€</td>
                    <td>{dataset.date.toString()}</td>
                </tr>
            );
        }

        return (
            <>
                <Card>
                    <h3>{type}</h3>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Kosten</th>
                            <th>Datum</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </Table>
                </Card>

            </>
        );
    }
}

export default DataTable;