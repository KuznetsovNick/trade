import React, { Component } from "react";
import {connect} from "react-redux";
import { POST_REQUEST } from "../../services/request";
import {setBroker, setBrokers, setStockInfo} from "../../reduce/reducer";
import { Chart } from "chart.js/auto";
import "./stock_card.less";
import {withRouter} from "../../services/with_router";

class StockCard extends Component {
    constructor(props) {
        super(props);
        this.chart = null;
        this.navigation=this.navigation.bind(this);
    }

    navigation(url)
    {
        this.props.navigate(url)
    }

    componentDidMount() {
        POST_REQUEST("/api/stocks/info", this.props.stock)
            .then(res => res.json())
            .then(json => this.props.setStockInfo(json))
        if (this.chart != null) {
            this.chart.destroy();
        }
    }

    graphic = (period) => {
        const stock_info = this.props.stock_info;
        const stock = this.props.stock;

        const ctx = document.getElementById("myChart");
        if (!ctx) {
            return;
        }
        let x = structuredClone(stock_info.date);
        let y = structuredClone(stock_info.open);
        x = x.splice(stock_info.date.length - period, period);
        y = y.splice(stock_info.open.length - period, period);

        const data = {
            labels: x,
            datasets: [{
                label: stock.full,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: y,
            }]
        };

        if (this.chart != null) {
            this.chart.destroy();
        }
        let myChart = new Chart(ctx, {
            type: 'line',
            data: data
        });
        this.chart = myChart;
    };

    render() {
        const stock = this.props.stock;
        const stock_info = this.props.stock_info;
        let table =[]
        if(stock_info){
            for(let i = stock_info.date.length-1; i >= 0; i--){
                table.push(stock_info.date[i] + " - " + stock_info.open[i] + "$")
            }
            let key = 0

            return (
                <div>
                    {stock.full}
                    <div style={{ height: "15rem", width: "30rem"}}>
                        <canvas id="myChart"></canvas>
                    </div>
                    {this.graphic(365)}

                    <div id="scroll_bar" style={{ height: "5rem", width: "30rem", overflowY: "scroll" }}>
                        <ul id="info_table">
                            {table.map(table => (
                                <li key={key++}>
                                    {table}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button onClick={() => this.navigation("/stocks_list")}>close</button>
                    <button onClick={() => this.graphic(365)}>1 year</button>
                    <button onClick={() => this.graphic(stock_info.date.length)}>5 year</button>
                </div>
            );
        }
    }
}
const mapStateToProps = state => ({
    stock: state.reducer.choosed_stock,
    stock_info: state.reducer.stock_info
});

const mapDispatchToProps = {
    setStockInfo
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StockCard));
