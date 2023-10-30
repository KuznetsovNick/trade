const SET_BROKERS = "SET_BROKERS"
const SET_STOCKS = "SET_STOCKS"
const SET_BROKER = "SET_BROKER"
const SET_STOCK = "SET_STOCK"
const SET_STOCK_INFO = "SET_STOCK_INFO"
const SET_TRADE_STOCK = "SET_TRADE_STOCK"

let brokers = JSON.parse(localStorage.getItem("brokers"))
if(brokers === null) brokers = []

let stocks = JSON.parse(localStorage.getItem("stocks"))
if(stocks === null) stocks = []

let trade_stock = JSON.parse(localStorage.getItem("trade_stock"))
if(trade_stock === null) trade_stock = []

let default_state = {
    brokers: brokers,
    stocks: stocks,
    choosed_broker: JSON.parse(localStorage.getItem("choosed_broker")),
    choosed_stock: JSON.parse(localStorage.getItem("choosed_stock")),
    stock_info: JSON.parse(localStorage.getItem("stock_info")),
    trade_stock: trade_stock
}


export function Reducer(state = default_state, action){
    switch (action.type){
        case SET_BROKERS:
            state.brokers = action.payload
            localStorage.setItem("brokers", JSON.stringify(action.payload))
            break
        case SET_STOCKS:
            state.stocks = action.payload
            localStorage.setItem("stocks", JSON.stringify(action.payload))
            break
        case SET_BROKER:
            state.choosed_broker = action.payload
            localStorage.setItem("choosed_broker", JSON.stringify(action.payload))
            break
        case SET_STOCK:
            state.choosed_stock = action.payload
            localStorage.setItem("choosed_stock", JSON.stringify(action.payload))
            break
        case SET_STOCK_INFO:
            state.stock_info = action.payload
            localStorage.setItem("stock_info", JSON.stringify(action.payload))
            break
        case SET_TRADE_STOCK:
            state.trade_stock = action.payload
            localStorage.setItem("trade_stock", JSON.stringify(action.payload))
            break
        default:
            break
    }

    return structuredClone(state)
}

export const setBrokers = (brokers) => ({
    type:SET_BROKERS,
    payload:brokers
})

export const setStocks = (stocks) => ({
    type:SET_STOCKS,
    payload:stocks
})

export const setBroker = (broker) => ({
    type:SET_BROKER,
    payload:broker
})

export const setStock = (stock) => ({
    type:SET_STOCK,
    payload:stock
})

export const setStockInfo = (info) => ({
    type:SET_STOCK_INFO,
    payload:info
})

export const setTradeStock = (stocks) => ({
    type:SET_TRADE_STOCK,
    payload:stocks
})
