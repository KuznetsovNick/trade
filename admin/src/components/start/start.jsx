import React, { Component } from "react";
import {withRouter} from "../../services/with_router";

class Start extends Component {
    constructor(props){
        super(props)
        this.navigation=this.navigation.bind(this);
    }

    navigation(url)
    {
        this.props.navigate(url)
    }


    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "max-content"}}>
                <button onClick={() => {
                    this.navigation("/brokers_list");
                }}>brokers</button>
                <button onClick={() => {
                    this.navigation("/stocks_list");
                }}>stocks</button>
            </div>
        );
    }
}

export default withRouter(Start)
