import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Broker_list from "./components/broker_list/broker_list";
import Broker_card from "./components/broker_card/broker_card";
import Add_broker from "./components/add_broker/add_broker";
import Stocks_list from "./components/stocks_list/stocks_list";
import Stock_card from "./components/stock_card/stock_card";
import Start from "./components/start/start";
import Start_trade from "./components/start_trade/start_trade";
import Stock_graphics from "./components/stocks_graphics/stock_graphics";

function App() {
    return (
        <BrowserRouter>
            <div className="App" style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "max-content"}}>
                <Routes>
                   <Route path="/" Component={Start}/>
                   <Route path="/brokers_list" Component={Broker_list}/>
                   <Route path="/stocks_list" Component={Stocks_list}/>
                   <Route path="/broker_card" Component={Broker_card}/>
                   <Route path="/stock_card" Component={Stock_card}/>
                   <Route path="/add_broker" Component={Add_broker}/>
                   <Route path="/start_trade" Component={Start_trade}/>
                   <Route path="/stock_graphics" Component={Stock_graphics}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
