import React, { Component } from 'react'
import { Container, Row, Col, Label, Button, Input } from "reactstrap";
import { TableComponent } from "../../../components/bases";
import Panel from "../../../components/Panel";
import { callApi, userHelper } from "../../../helpers";
import moment from "moment";

const LIST_STATUS = {
    "jig-shortage": "Jig Shortage",
    "magazin-shortage": "Magazin Shortage",
    "plasma-waiting": "Plasma Waiting",
    "pcb-shortage": "Pcb Shortage"
}

const sampleData = [
    {
        "id": 6,
        "WorkingDate": "10-07-2019",
        "FactoryID": 1,
        "ShiftID": 2,
        "LineID": 2,
        "ProductID": 1,
        "Amount": 24,
        "StartTime": "2019-07-12T15:30:33.000Z",
        "StopTime": null,
        "Message": null,
        "Finished": false,
        "product_name": "L7E0",
        "LineCode": "L2"
    }
]

export class LineOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineOrderData: [],
            selectedMessage: null
        }
    }

    componentDidMount() {
        this.getData()
        setInterval(() => this.getData(), 1000 * 10);
    }

    getData = () => {
        callApi(
            `production/getLstOrderByDate`,
            "GET",
            {}
        )
            .then(res => {
                if (res.status == 200)
                    this.setState({
                        lineOrderData: res.data.data ? res.data.data : [],
                    });
            })
            .catch(error => {
                console.log(error);
                this.setState({ lineOrderData: [] });
            });
    }

    handleChangeMessage = (e) => {
        this.setState({
            selectedMessage: e.target.value
        })
    }

    updateMessage = (rowIndex) => {
        const { lineOrderData, selectedMessage } = this.state;
        let rowData = lineOrderData[rowIndex];
        if (selectedMessage && rowIndex != null) {
            let updateData = {
                "WorkingDate": rowData["WorkingDate"],
                "FactoryID": rowData["FactoryID"],
                "LineID": rowData["LineID"],
                "ShiftID": rowData["ShiftID"],
                "Message": selectedMessage,
                "ProductID": rowData["ProductID"]
            }
            callApi(
                `production/updateMessage`,
                "POST",
                {},
                updateData
            )
                .then(res => {
                    if (res.data.code == "OK")
                        userHelper.showToastMessage(
                            "UPDATE_MESSAGE_SUCCESS",
                            "success"
                        );
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ lineOrderData: [] });
                });
        }

    }

    render() {
        const { lineOrderData } = this.state;
        let renderHeaderDatas = <tr>
            <th style={{ fontSize: "18px" }}>Line</th>
            <th style={{ fontSize: "18px" }}>Model</th>
            <th style={{ fontSize: "18px" }}>Amount</th>
            <th style={{ fontSize: "18px" }}>Status</th>
            <th style={{ fontSize: "18px" }}>Action</th>
        </tr>
        let renderRowDatas = lineOrderData.map((rowData, index) => {
            let options = Object.keys(LIST_STATUS).map((messageKey, index) => {
                return <option key={index} value={messageKey}>{LIST_STATUS[messageKey]}</option>
            })
            let messageSelect = <Input type="select" name="select-message" id="select-message" defaultValue={rowData.Message} onChange={this.handleChangeMessage}>
                <option value={null}></option>
                {options}
            </Input>;
            let action = <Button color="primary" onClick={() => this.updateMessage(index)}>Submit</Button>
            return <tr key={index}>
                <td style={{ fontSize: "18px" }}>{rowData.LineCode}</td>
                <td style={{ fontSize: "18px" }}>{rowData.product_name}</td>
                <td style={{ fontSize: "18px" }}>{rowData.Amount}</td>
                <td style={{ fontSize: "18px" }}>{messageSelect}</td>
                <td style={{ fontSize: "18px" }}>{action}</td>
            </tr>
        })
        return (
            <Container>
                <Panel
                    title="SMT LINE ORDER"
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
                            {renderHeaderDatas}
                            {renderRowDatas}
                        </tbody>
                    </TableComponent>
                </Panel>
            </Container>
        )
    }
}
