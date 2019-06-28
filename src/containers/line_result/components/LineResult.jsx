import React, { Component } from 'react'
import { Container, Row, Col, Label, Button } from "reactstrap";
import { TableComponent } from "../../../components/bases";
import Panel from "../../../components/Panel";
import { CustomDatePicker } from "../../../components/common";
import { callApi } from "../../../helpers";
import moment from "moment";

const columnAttrs = [
    {
        key: "line_name",
        name: "Line"
    },
    {
        key: "status",
        name: "Status"
    },
    {
        key: "model",
        name: "Model"
    },
    {
        key: "order",
        name: "Order"
    },
    {
        key: "elapsed",
        name: "Elapsed"
    },
    {
        key: "remain",
        name: "Remain"
    }
]

const sampleData = [
    {
        "lineId": 1,
        "line_name": "Line 1",
        "status": "RUN",
        "order": 100,
        "elapsed": 0,
        "remain": 100,
        "model": "L7E0",
        "color": "57f542"
    },
    {
        "lineId": 2,
        "line_name": "Line 2",
        "status": "ORDERING",
        "order": 150,
        "elapsed": 0,
        "remain": 150,
        "model": "L7E0",
        "color": "8E1E20"
    }
]

export class LineResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineResultData: [],
            date: moment()
        }
    }

    componentDidMount() {
        this.getData()
        setInterval(() => this.getData(), 1000 * 60);
    }

    getData = () => {
        const { date } = this.state;
        if (date) {
            callApi(
                `production/getLineResult/${date.format('DD-MM-YYYY')}`,
                "GET",
                {}
            )
                .then(res => {
                    if (res.status == 200)
                        this.setState({
                            lineResultData: res.data.data ? res.data.data : [],
                        });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ lineResultData: [] });
                });
        } else this.setState({ lineResultData: [] });
    }

    handleSetDate = date => {
        this.setState({
            date: date,
        });
    };


    render() {
        const { date, lineResultData } = this.state;
        let renderRowDatas = columnAttrs.map((cA, index) => {
            let renderColData = lineResultData.map(colData => {
                if (colData.key == "line_name") {
                    return <th key={colData.lineId} style={{ fontSize: "18px", backgroundColor: "#ddd" }}>{colData[cA.name]}</th>
                } else {
                    let bgColor = "#fff";
                    if (cA.key == "status") bgColor = `#${colData.color}`
                    return <td
                        key={colData.lineId}
                        style={{
                            backgroundColor: bgColor,
                            color: "#000000",
                            textAlign: "center",
                        }}
                    >
                        <strong style={{ fontSize: "18px" }}>
                            {colData[cA.key]}
                        </strong>
                    </td>
                }
            })

            return <tr key={index}>
                <th style={{ fontSize: "18px" }}>{cA.name}</th>
                {renderColData}
            </tr>
        })
        return (
            <Container>
                <Row>
                    <Col sm={3}>
                        <Label style={{ fontSize: "18px" }}>View Date</Label>
                        <CustomDatePicker
                            placeholderText="View Date"
                            name="date"
                            value={date}
                            showTimeSelect={false}
                            setSelectedDate={this.handleSetDate}
                        />
                    </Col>
                    <Col sm={3}>
                        <Button
                            color="primary"
                            style={{ marginTop: "10px", fontSize: "18px" }}
                            onClick={this.getData}
                        >
                            Search
                        </Button>
                    </Col>
                </Row>
                <Panel
                    title="LINE RESULT"
                    titleFontsize="30px"
                    style={{ fontSize: "30px" }}
                    className="p-0-m"
                    titleClassName="m-3-m"
                    collapseClassName="t-3-m"
                >
                    <TableComponent
                        className="table--bordered table--head-accent table-monitoring"
                        responsive={true}
                    >
                        <tbody>
                            {renderRowDatas}
                        </tbody>
                    </TableComponent>
                </Panel>
            </Container>
        )
    }
}