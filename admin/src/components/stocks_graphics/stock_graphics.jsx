import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "../../services/with_router";
import {io} from "socket.io-client";
import { Chart } from "chart.js/auto";

class Stock_graphics extends Component {
    constructor(props) {
        super(props);
        this.navigation=this.navigation.bind(this);
        this.add_points=this.add_points.bind(this);
        this.graphic=this.graphic.bind(this);
        this.charts = []
    }
    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("graphics_data"))
        this.socket = io("http://localhost:4000");
        this.socket.on("message", (data) => {this.add_points(data)});
        this.socket.emit("message", data);
        this.graphic()
    }

    add_points(data){
        for(let i = 0; i < this.props.trade_stock.length; i++){
            this.charts[i].data.datasets[0].data.push(data[i].open);
            this.charts[i].data.labels.push(data[i].date);
            this.charts[i].update()
        }
    }

    graphic = () => {
        for(let i = 0; i < this.props.stocks.length; i++){
            const ctx = document.getElementById(i.toString());
            if (!ctx) {
                return;
            }
            let x = []
            let y = []

            const data = {
                labels: x,
                datasets: [{
                    label: this.props.stocks[this.props.trade_stock[i]].full,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: y,
                }]
            };

            let myChart = new Chart(ctx, {
                type: 'line',
                data: data
            });

            this.charts.push(myChart);
        }
    };

    navigation(url)
    {
        this.props.navigate(url)
    }
    render() {
        let trade_stock = this.props.trade_stock
        return(
            <div>
                {trade_stock.map((trade_stock, index) => (
                    <div key={index}>
                        <div style={{ height: "15rem", width: "30rem"}}>
                            <canvas id={index}></canvas>
                        </div>
                    </div>
                ))}

                <button onClick={() => {
                    this.navigation("/start_trade")
                }}>close</button>
            </div>
        )
    }

    componentWillUnmount() {
        this.socket.emit("message", {close: true});
        this.socket.disconnect();
    }
}

const mapStateToProps = state => ({
    stocks: state.reducer.stocks,
    trade_stock: state.reducer.trade_stock
});


export default connect(mapStateToProps)(withRouter(Stock_graphics));
