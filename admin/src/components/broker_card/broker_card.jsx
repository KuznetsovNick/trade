import React, { Component } from "react";
import {connect} from "react-redux";
import { DELETE_REQUEST, POST_REQUEST } from "../../services/request";
import {withRouter} from "../../services/with_router";

class BrokerCard extends Component {
    constructor(props) {
        super(props);
        this.navigation=this.navigation.bind(this);
    }

    navigation(url)
    {
        this.props.navigate(url)
    }

    deleteBroker = (id) => {
        DELETE_REQUEST("/api/brokers", { id: id })
            .then(() => {
                this.navigation("/brokers_list");
            });
    };

    changeBalance = () => {
        const inputElement = document.getElementById("balance");
        const newBalance = Number(inputElement.value);

        if (!isNaN(newBalance)) {
            const data = {
                id: this.props.broker.id,
                balance: newBalance
            };

            POST_REQUEST("/api/brokers/redact", data)
                .then(() => {
                    this.navigation("/brokers_list");
                });
        } else {
            alert("Balance should be a number");
        }
    };

    render() {
        const broker = this.props.broker;

        return (
            <div>
                <h3>Hello, {broker.name}</h3>
                <p>Your balance <input id="balance" type="text" placeholder={broker.balance} /></p>
                <button onClick={() => this.navigation("/brokers_list")}>Close</button>
                <button onClick={() => this.deleteBroker(broker.id)}>Delete</button>
                <button onClick={() => this.changeBalance()}>Save</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    broker: state.reducer.choosed_broker
});

export default connect(mapStateToProps)(withRouter(BrokerCard));
