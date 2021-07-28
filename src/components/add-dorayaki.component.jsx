import React, { Component } from "react"
import DorayakiDataService from "../services/dorayaki.service"
import axios from "axios"
import { TextField, Button, withStyles, IconButton, Grid } from "@material-ui/core"
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { styles } from "../css-common"

class AddDorayaki extends Component {
    constructor(props) {
        super(props);
        this.onChangeRasa = this.onChangeRasa.bind(this);
        this.onChangeDeskripsi = this.onChangeDeskripsi.bind(this);
        this.uploadGambar = this.uploadGambar.bind(this);
        this.saveDorayaki = this.saveDorayaki.bind(this);
        this.newDorayaki = this.newDorayaki.bind(this);

        this.state = {
            rasa: "",
            deskripsi: "",
            gambar: "",

            imgsubmitted: false,
            submitted: false
        };
    }

    onChangeRasa(e) {
        this.setState({
            rasa: e.target.value
        });
    }

    onChangeDeskripsi(e) {
        this.setState({
            deskripsi: e.target.value
        });
    }

    uploadGambar(e){
        const formData = new FormData()
        const files = e.target.files
        formData.append("file", files[0])
        formData.append("upload_preset", "ul2ocgo4")
        // https://res.cloudinary.com/cloudinary-afif/image/upload/VERSION/PUBLIC_ID
        axios.post("https://api.cloudinary.com/v1_1/cloudinary-afif/image/upload", formData
            ).then((response) => {
                console.log(response)
                this.setState({
                    gambar: "https://res.cloudinary.com/cloudinary-afif/image/upload/v" + response.data.version + "/" + response.data.public_id,
                    imgsubmitted: true
                })
            })
    }

    saveDorayaki() {
        var data = {
            rasa: this.state.rasa,
            deskripsi: this.state.deskripsi,
            gambar: this.state.gambar,
        };

        DorayakiDataService.create(data)
            .then(response => {
                this.setState({
                    rasa: response.data.rasa,
                    deskripsi: response.data.deskripsi,
                    gambar: response.data.gambar,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newDorayaki() {
        this.setState({
            rasa: "",
            deskripsi: "",
            gambar: "",

            imgsubmitted: false,
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
                            onClick={this.newDorayaki}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="Rasa"
                                    name="rasa"
                                    value={this.state.rasa}
                                    onChange={this.onChangeRasa}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Deskripsi"
                                    name="Deskripsi"
                                    value={this.state.deskripsi}
                                    onChange={this.onChangeDeskripsi}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="icon-button-photo">
                                    <IconButton color="primary" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="icon-button-photo"
                                    onChange={this.uploadGambar}
                                    type="file"
                                    hidden
                                    required
                                />
                                {this.state.imgsubmitted ? (
                                    <Grid>
                                        <img src = {this.state.gambar}/>
                                    </Grid>
                                ) : (
                                    <Grid>
                                        <h5>Please upload an Image!</h5>
                                    </Grid>
                                )}
                            </div>

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveDorayaki}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddDorayaki)