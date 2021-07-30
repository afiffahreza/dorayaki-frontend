import React, { Component } from "react";
import StockDataService from "../services/stock.service";
import DorayakiDataService from "../services/dorayaki.service";
import TokoDataService from "../services/toko.service";

import { styles } from "../css-common"
import { TextField, Button, withStyles, Grid } from "@material-ui/core";

class StockUpdate extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.getStock = this.getStock.bind(this);
        this.getDorayakis = this.getDorayakis.bind(this);
        this.getTokos = this.getTokos.bind(this);
        this.updateStock = this.updateStock.bind(this);
        this.deleteStock = this.deleteStock.bind(this);

        this.state = {
            stocks: [],
            tokos: [],
            dorayakis: [],
            currentStock: {
                id: 0,
                tokoid: 0,
                dorayakiid: 0,
                quantity: 0
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getStock(this.props.match.params.id)
        this.getDorayakis()
        this.getTokos()
    }

    onChangeQuantity(e) {
        var quantity = 0
        if (e.target.value!="") quantity = parseInt(e.target.value)
        this.setState(function (prevState) {
            return {
                currentStock: {
                    ...prevState.currentStock,
                    quantity: quantity
                }
            };
        });
    }

    getStock(id) {
        StockDataService.getAll()
            .then(response => {
                this.setState({
                    stocks: response.data.data
                });
                this.state.stocks.map((stock) => {
                    if (stock.id == id) {
                        this.setState({
                            currentStock: stock
                        })
                    }
                })
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getDorayakis(){
        DorayakiDataService.getAll()
            .then(response => {
                this.setState({
                    dorayakis: response.data.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    getTokos(){
        TokoDataService.getAll()
            .then(response => {
                this.setState({
                    tokos: response.data.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    getTokoName(id){
        var name = ""
        this.state.tokos.forEach((toko) => {
            if (toko.id == id) name = toko.nama
        })
        return name
    }

    getDorayakiRasa(id){
        var rasa = ""
        this.state.dorayakis.forEach((dorayaki) => {
            if (dorayaki.id == id) rasa = dorayaki.rasa
        })
        return rasa
    }

    deleteStock() {
        StockDataService.delete(this.state.currentStock.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/deleted')
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateStock() {
        if (this.state.currentStock.quantity==0) this.deleteStock()
        else {
            StockDataService.update(
                this.state.currentStock.id,
                this.state.currentStock
            )
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        message: "The stock was updated successfully!"
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    render() {
        const { currentStock } = this.state;
        const { classes } = this.props

        return (
            <div>
                <div className={classes.form}>
                    <h4>Update Stock {this.getDorayakiRasa(currentStock.dorayakiid)} on {this.getTokoName(currentStock.tokoid)}</h4>
                    <form>
                        <div>
                            <TextField
                                className={classes.textField}
                                label="Quantity"
                                name="quantity"
                                value={currentStock.quantity}
                                onChange={this.onChangeQuantity}
                                required
                            />
                        </div>
                    </form>
                    <div className={classes.buttonWrapper}>
                        <Button
                            type="submit"
                            className={`${classes.update} ${classes.button}`}
                            onClick={this.updateStock}
                        >
                            Update
                        </Button>
                    </div>
                    <p>{this.state.message}</p>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(StockUpdate)