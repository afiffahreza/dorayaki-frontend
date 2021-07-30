import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { styles } from "../css-common"

class Deleted extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.deleted}>
                <h4>Stock successfully deleted!</h4>
            </div>
        );
    }
}

export default withStyles(styles)(Deleted)