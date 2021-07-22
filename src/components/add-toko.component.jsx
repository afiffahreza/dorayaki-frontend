import React, { Component } from "react";
import TokoDataService from "../services/toko.service";

import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../css-common"

class AddToko extends Component {
    constructor(props) {
        super(props);
        this.onChangeNama = this.onChangeNama.bind(this);
        this.onChangeJalan = this.onChangeJalan.bind(this);
        this.onChangeKecamatan = this.onChangeKecamatan.bind(this);
        this.onChangeProvinsi = this.onChangeProvinsi.bind(this);
        this.saveToko = this.saveToko.bind(this);
        this.newToko = this.newToko.bind(this);

        this.state = {
            nama: "",
            jalan: "",
            kecamatan: "",
            provinsi: "",

            submitted: false
        };
    }

    onChangeNama(e) {
        this.setState({
            nama: e.target.value
        });
    }

    onChangeJalan(e) {
        this.setState({
            jalan: e.target.value
        });
    }

    onChangeKecamatan(e) {
        this.setState({
            kecamatan: e.target.value
        });
    }

    onChangeProvinsi(e) {
        this.setState({
            provinsi: e.target.value
        });
    }

    saveToko() {
        var data = {
            nama: this.state.nama,
            jalan: this.state.jalan,
            kecamatan: this.state.kecamatan,
            provinsi: this.state.provinsi
        };

        TokoDataService.create(data)
            .then(response => {
                this.setState({
                    nama: response.data.nama,
                    jalan: response.data.jalan,
                    kecamatan: response.data.kecamatan,
                    provinsi: response.data.provinsi,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newToko() {
        this.setState({
            nama: "",
            jalan: "",
            kecamatan: "",
            provinsi: "",

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
                            onClick={this.newToko}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="Nama"
                                    name="nama"
                                    value={this.state.nama}
                                    onChange={this.onChangeNama}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Jalan"
                                    name="jalan"
                                    value={this.state.jalan}
                                    onChange={this.onChangeJalan}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Kecamatan"
                                    name="kecamatan"
                                    value={this.state.kecamatan}
                                    onChange={this.onChangeKecamatan}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Provinsi"
                                    name="provinsi"
                                    value={this.state.provinsi}
                                    onChange={this.onChangeProvinsi}
                                    required
                                />
                            </div>

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveToko}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddToko)