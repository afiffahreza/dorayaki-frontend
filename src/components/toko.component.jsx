import React, { Component } from "react";
import TokoDataService from "../services/toko.service";

import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class Toko extends Component {
    constructor(props) {
        super(props);
        this.onChangeNama = this.onChangeNama.bind(this);
        this.onChangeJalan = this.onChangeJalan.bind(this);
        this.onChangeKecamatan = this.onChangeKecamatan.bind(this);
        this.onChangeProvinsi = this.onChangeProvinsi.bind(this);
        this.getToko = this.getToko.bind(this);
        this.updateToko = this.updateToko.bind(this);
        this.deleteToko = this.deleteToko.bind(this);

        this.state = {
            currentToko: {
                id: null,
                nama: "",
                jalan: "",
                kecamatan: "",
                provinsi: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getToko(this.props.match.params.id);
    }

    onChangeNama(e) {
        const nama = e.target.value;

        this.setState(function (prevState) {
            return {
                currentToko: {
                    ...prevState.currentToko,
                    nama: nama
                }
            };
        });
    }

    onChangeJalan(e) {
        const jalan = e.target.value;

        this.setState(function (prevState) {
            return {
                currentToko: {
                    ...prevState.currentToko,
                    jalan: jalan
                }
            };
        });
    }

    onChangeKecamatan(e) {
        const kecamatan = e.target.value;

        this.setState(function (prevState) {
            return {
                currentToko: {
                    ...prevState.currentToko,
                    kecamatan: kecamatan
                }
            };
        });
    }

    onChangeProvinsi(e) {
        const provinsi = e.target.value;

        this.setState(function (prevState) {
            return {
                currentToko: {
                    ...prevState.currentToko,
                    provinsi: provinsi
                }
            };
        });
    }

    getToko(id) {
        TokoDataService.get(id)
            .then(response => {
                this.setState({
                    currentToko: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateToko() {
        TokoDataService.update(
            this.state.currentToko.id,
            this.state.currentToko
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The toko was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteToko() {
        TokoDataService.delete(this.state.currentToko.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/toko')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentTokol } = this.state;
        const { classes } = this.props

        return (
            <div>
                {currentToko ? (
                    <div className={classes.form}>
                        <h2>Store</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Nama"
                                    name="nama"
                                    value={currentToko.nama}
                                    onChange={this.onChangeNama}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Jalan"
                                    name="jalan"
                                    value={currentToko.jalan}
                                    onChange={this.onChangeJalan}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Kecamatan"
                                    name="Kecamatan"
                                    value={currentToko.kecamatan}
                                    onChange={this.onChangeKecamatan}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Provinsi"
                                    name="provinsi"
                                    value={currentToko.provinsi}
                                    onChange={this.onChangeProvinsi}
                                    required
                                />
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                            <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteToko}
                            >
                                Delete
                            </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateToko}
                            >
                                Update
                            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Store...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Toko)