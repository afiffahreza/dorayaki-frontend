import React, { Component } from "react";
import StockDataService from "../services/stock.service";
import DorayakiDataService from "../services/dorayaki.service";

import { styles } from "../css-common"
import { withStyles, Grid, ListItem } from "@material-ui/core";

class Stock extends Component {
    constructor(props) {
        super(props);
        this.getStocks = this.getStocks.bind(this)
        this.getDorayakis = this.getDorayakis.bind(this)
        this.setActiveStock = this.setActiveStock.bind(this)
        this.getRasaFromID = this.getRasaFromID.bind(this)

        this.state = {
            stocks: [],
            dorayakis: [],
            currentStock: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.getStocks(this.props.match.params.id)
        this.getDorayakis()
    }

    getStocks(id) {
        StockDataService.getByStoreID(id)
            .then(response => {
                this.setState({
                    stocks: response.data.data
                })
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })  
    }

    getDorayakis(){
        DorayakiDataService.getAll()
            .then(response => {
                this.setState({
                    dorayakis: response.data.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getRasaFromID(id) {
        var rasa = ""
        this.state.dorayakis.map((dorayaki, index) => {
            if (dorayaki.id == id) rasa = dorayaki.rasa
        })
        return rasa
    }

    setActiveStock(stock, index) {
        this.setState({
            currentStock: stock,
            currentIndex: index
        });
    }

    render() {
        const { classes } = this.props
        const { stocks, currentIndex, currentStock } = this.state
        //console.log(rasa)
        return (
            <div className={classes.form}>
                <Grid container>
                    <Grid item md={4}>
                        <h2>Inventory</h2>
                        <div className="list-group">
                            {stocks &&
                            stocks.map((stock, index) => (
                                <ListItem
                                    selected={index === currentIndex}
                                    onClick={() => this.setActiveStock(stock, index)}
                                    divider
                                    button	
                                    key={index}>
                                    {this.getRasaFromID(stock.dorayakiid)}
                                </ListItem>
                            ))}
                        </div>
                    </Grid>
                    <Grid item md={8}>
                        {currentStock ? (
                            <div className={classes.toko}>
                                <h4>{this.getRasaFromID(currentStock.dorayakiid)} Stocks</h4>
                                <div className={classes.detail}>
                                    <label>
                                        <strong>Quantity:</strong>
                                    </label>{" "}
                                    {currentStock.quantity}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p className={classes.toko}>Please click on a dorayaki variant...</p>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Stock)