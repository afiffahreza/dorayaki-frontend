import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { styles } from "./css-common"

import AddToko from "./components/add-toko.component";
import AddDorayaki from "./components/add-dorayaki.component";
import AddStock from "./components/add-stock.component";
import Toko from "./components/toko.component";
import Stock from "./components/stock.component";
import TokoList from "./components/toko-list.component";
import DorayakiList from "./components/dorayaki-list.component";

import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

class App extends Component {
    render(){
        const { classes } = this.props

        return (
            <div>
            <AppBar className={classes.appBar} position="static">
            <Toolbar>
                <Typography className={classes.name} variant="h6">
                Stand with Dorayaki
                </Typography>
                <Link to={"/toko"} className={classes.link}>
                <Typography variant="body2">
                    Store
                </Typography>
                </Link>
                <Link to={"/add"} className={classes.link}>
                <Typography variant="body2">
                    Add new store
                </Typography>
                </Link>
                <Link to={"/dorayaki"} className={classes.link}>
                <Typography variant="body2">
                    Dorayaki
                </Typography>
                </Link>
            </Toolbar>
            </AppBar>

            <Switch>
                <Route exact path={["/", "/toko"]} component={TokoList} />
                <Route exact path="/add" component={AddToko} />
                <Route exact path="/dorayaki" component={DorayakiList} />
                <Route exact path="/newdorayaki" component={AddDorayaki} />
                <Route path="/toko/:id" component={Toko} />
                <Route path="/stock/:id" component={Stock} />
                <Route path="/addstock/:id" component={AddStock} />
            </Switch>
        </div>
        )
    }
}

export default withStyles(styles) (App)
