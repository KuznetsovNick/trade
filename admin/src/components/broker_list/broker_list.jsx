import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBroker, setBrokers } from "../../reduce/reducer";
import { DELETE_REQUEST, GET_REQUEST } from "../../services/request";
import { useNavigate } from 'react-router-dom';
import {withRouter} from "../../services/with_router";
import {connect} from "react-redux";

class BrokerList extends Component {
    constructor(props) {
        super(props);
        this.navigation=this.navigation.bind(this);
    }

    navigation(url)
    {
        this.props.navigate(url)
    }

    componentDidMount() {
        GET_REQUEST("/api/brokers")
            .then(json => {
                this.props.setBrokers(json);
            });
    }

    handleBrokerClick = (broker) => {
        this.props.setBroker(broker);
        this.navigation("/broker_card");
    }

    render() {
        const { brokers } = this.props;

        return (
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "max-content"}}>
                <ul id="brokers_list" style={{padding: "0"}}>
                    {brokers.map(broker => (
                        <li key={broker.id} onClick={() => this.handleBrokerClick(broker)}>
                            {broker.name}
                        </li>
                    ))}
                </ul>
                <button onClick={() => this.navigation("/add_broker")}>Add</button>
                <button onClick={() => this.navigation("/")}>Close</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    brokers: state.reducer.brokers
});

const mapDispatchToProps = {
    setBroker,
    setBrokers
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BrokerList));
