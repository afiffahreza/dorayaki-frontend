import React, { Component } from "react";
import StockDataService from "../services/stock.service";
import DorayakiDataService from "../services/dorayaki.service";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../css-common"

class AddStock extends Component {
    constructor(props) {
        super(props);
        this.getStocks = this.getStocks.bind(this)
        this.getDorayakis = this.getDorayakis.bind(this)
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.onChangeVariant = this.onChangeVariant.bind(this)
        this.getRasaFromID = this.getRasaFromID.bind(this)
        this.dorayakiArray = this.dorayakiArray.bind(this)
        this.saveStock = this.saveStock.bind(this)
        this.newStock = this.newStock.bind(this)

        this.state = {
            tokoid: 0,
            dorayakiid: 0,
            quantity: 0,

            stocks: [],
            dorayakis: [],
            submitted: false
        };
    }

    componentDidMount() {
        this.getStocks(this.props.match.params.id)
        var i = parseInt(this.props.match.params.id)
        this.setState({
            tokoid: i
        })
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

    onChangeQuantity(e) {
        var i = parseInt(e.target.value)
        this.setState({
            quantity: i
        });
    }

    onChangeVariant(e) {
        this.setState({
            dorayakiid: e.target.value
        });
    }

    getRasaFromID(id) {
        var rasa = ""
        this.state.dorayakis.map((dorayaki, index) => {
            if (dorayaki.id == id) rasa = dorayaki.rasa
        })
        return rasa
    }

    dorayakiArray(){
        var arrstock = []
        console.log(arrstock)
        this.state.stocks.forEach((stock) => arrstock.push(stock.dorayakiid))
        var arrdorayaki = []
        this.state.dorayakis.forEach((dorayaki) => {
            if (arrstock.includes(dorayaki.id) == false) {
                arrdorayaki.push(dorayaki.id)
            }
        })
        console.log(arrdorayaki)
        return arrdorayaki
    }

    saveStock() {
        var data = {
            tokoid: this.state.tokoid,
            dorayakiid: this.state.dorayakiid,
            quantity: this.state.quantity
        }
        console.log(data)
        StockDataService.create(data)
            .then(response => {
                this.setState({
                    tokoid: response.data.tokoid,
                    dorayakiid: response.data.dorayakiid,
                    quantity: response.data.quantity,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newStock() {
        this.componentDidMount()
        this.setState({
            tokoid: 0,
            dorayakiid: 0,
            quantity: 0,

            submitted: false
        });
    }

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newStock}>
                            Add More
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>

                            <FormControl className={classes.formControl}>
                                    <InputLabel id="select-variant">Dorayaki Variant</InputLabel>
                                    <Select
                                        labelId="select-variant"
                                        id="select-variant"
                                        value={this.state.dorayakiid}
                                        onChange={this.onChangeVariant}
                                    >
                                        <MenuItem value={0}>None</MenuItem>
                                        {this.dorayakiArray().map((id, index) => {
                                            return(
                                                <MenuItem key={index} value={id}>{this.getRasaFromID(id)}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText>Add a variant</FormHelperText>
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
                                onClick={this.saveStock}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddStock)