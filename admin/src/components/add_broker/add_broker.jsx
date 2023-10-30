import React, { Component } from "react";
import { POST_REQUEST } from "../../services/request";
import {withRouter} from "../../services/with_router";

class AddBroker extends Component {
    constructor(props) {
        super(props);
        this.navigation=this.navigation.bind(this);
    }

    navigation(url)
    {
        this.props.navigate(url)
    }

    save = () => {
        const nameInput = document.getElementById("broker_name");
        const balanceInput = document.getElementById("broker_balance");
        const name = nameInput.value;
        const balance = balanceInput.value;

        if (name && !isNaN(balance)) {
            const data = {
                name: name,
                balance: Number(balance)
            };

            POST_REQUEST("api/brokers/add_broker", data)
                .then(() => {
                    this.navigation("/brokers_list");
                });
        } else {
            alert("Wrong data");
        }
    };

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column",
                justifyContent: "center", width: "max-content", gap: "5px"}}>
                <input id="broker_name" placeholder="Name" />
                <input id="broker_balance" placeholder="Balance" />
                <button onClick={() => this.navigation("/brokers_list")}>Close</button>
                <button onClick={() => this.save()}>Save</button>
            </div>
        );
    }
}

export default withRouter(AddBroker);