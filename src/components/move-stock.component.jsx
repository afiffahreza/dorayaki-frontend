import React, { Component } from "react";
import StockDataService from "../services/stock.service";
import DorayakiDataService from "../services/dorayaki.service";
import TokoDataService from "../services/toko.service";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../css-common"

class MoveStock extends Component {
    constructor(props) {
        super(props);
        this.getStocks = this.getStocks.bind(this)
        this.getDorayakis = this.getDorayakis.bind(this)
        this.getTokos = this.getTokos.bind(this)
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.onChangeToko = this.onChangeToko.bind(this)
        this.updateStock = this.updateStock.bind(this)
        this.deleteStock = this.deleteStock.bind(this)
        this.saveStock = this.saveStock.bind(this)
        this.moveStock = this.moveStock.bind(this)
        this.moveStockUtil = this.moveStockUtil.bind(this)
        this.getTokoName = this.getTokoName.bind(this)
        this.getDorayakiRasa = this.getDorayakiRasa.bind(this)
        this.tokoArray = this.tokoArray.bind(this)

        this.state = {
            currentStock: {
                id: 0,
                tokoid: 0,
                dorayakiid: 0,
                quantity: 0
            },
            tokopil: 0,
            quantity: 0,
            stocks: [],
            tokos: [],
            dorayakis: [],
            submitted: false
        };
    }

    componentDidMount() {
        this.getStocks(this.props.match.params.id)
        this.getDorayakis()
        this.getTokos()
    }

    getStocks(id) {
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
                console.log(response.data);
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

    onChangeQuantity(e) {
        var i = 0
        if (e.target.value!="") i = parseInt(e.target.value)
        this.setState({
            quantity: i
        });
    }

    onChangeToko(e) {
        this.setState({
            tokopil: e.target.value
        });
    }

    tokoArray(){
        var arrtoko = []
        this.state.tokos.forEach((toko) => {
            if (toko.id != this.state.currentStock.tokoid) {
                arrtoko.push(toko.id)
            }
        })
        return arrtoko
    }

    deleteStock(i) {
        StockDataService.delete(i)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateStock(i, t, d, q) {
        var data = {
            id: i,
            tokoid: t,
            dorayakiid: d,
            quantity: q
        }
        StockDataService.update(i, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    saveStock(t, d, q) {
        var data = {
            tokoid: t,
            dorayakiid: d,
            quantity: q
        }
        console.log(data)
        StockDataService.create(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    moveStockUtil(){
        var arrstock = []
        this.state.stocks.forEach((stock) => {
            if (stock.tokoid == this.state.tokopil) arrstock.push(stock)
        })
        var found = 0
        var target = 0
        var newQty = 0
        arrstock.forEach((stock) => {
            if (stock.dorayakiid == this.state.currentStock.dorayakiid) {
                found = 1
                target = stock.id
                newQty = stock.quantity
            }
        })
        if (found==1) {
            this.updateStock(target, this.state.tokopil, this.state.currentStock.dorayakiid, (this.state.quantity+newQty))
        }
        else {
            this.saveStock(this.state.tokopil, this.state.currentStock.dorayakiid, this.state.quantity)
        }
    }

    moveStock(){
        if (this.state.quantity == this.state.currentStock.quantity) {
            this.moveStockUtil()
            this.deleteStock(this.state.currentStock.id)
            this.setState({
                submitted: true
            })
        }
        else if (this.state.quantity < this.state.currentStock.quantity) {
            this.moveStockUtil()
            this.updateStock(this.state.currentStock.id, this.state.currentStock.tokoid, 
                this.state.currentStock.dorayakiid, (this.state.currentStock.quantity - this.state.quantity))
            this.setState({
                submitted: true
            })
        }
    }

    render() {
        const { classes } = this.props
        const { currentStock } = this.state

        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>Moved successfully!</h4>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <h4>Moving {this.getDorayakiRasa(currentStock.dorayakiid)} from {this.getTokoName(currentStock.tokoid)}</h4>
                            <h5>Max moved = {currentStock.quantity}</h5>
                            <FormControl className={classes.formControl}>
                                    <InputLabel id="select-toko">Store</InputLabel>
                                    <Select
                                        labelId="select-toko"
                                        id="select-toko"
                                        value={this.state.tokopil}
                                        onChange={this.onChangeToko}
                                    >
                                        <MenuItem value={0}>None</MenuItem>
                                        {this.tokoArray().map((id, index) => {
                                            return(
                                                <MenuItem key={index} value={id}>{this.getTokoName(id)}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText>Target Store</FormHelperText>
                            </FormControl>

                            <div className={classes.textField}>
                                <TextField
                                    label="Quantity"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.onChangeQuantity}
                                    required
                                />
                            </div>

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.moveStock}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MoveStock)