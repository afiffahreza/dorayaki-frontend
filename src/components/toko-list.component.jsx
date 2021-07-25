import React, { Component } from "react";
import TokoDataService from "../services/toko.service";
import { Link } from "react-router-dom";

import { styles } from "../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

class TokoList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this);
    this.retrieveToko = this.retrieveToko.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveToko = this.setActiveToko.bind(this);
    this.searchQuery = this.searchQuery.bind(this);

    this.state = {
      tokoAll: [],
      currentToko: null,
      currentIndex: -1,
      searchQuery: ""
    };
  }

  componentDidMount() {
    this.retrieveToko();
  }

  onChangeSearchQuery(e) {
    const searchQuery = e.target.value;

    this.setState({
      searchQuery: searchQuery
    });
  }

  retrieveToko() {
    TokoDataService.getAll()
      .then(response => {
        this.setState({
          tokoAll: response.data.data
        });
        console.log(response.data);
        //console.log(this.state.tokoAll);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveToko();
    this.setState({
      currentToko: null,
      currentIndex: -1
    });
  }

  setActiveToko(toko, index) {
    this.setState({
      currentToko: toko,
      currentIndex: index
    });
  }

  searchQuery() {
    TokoDataService.findByQuery(this.state.searchQuery)
      .then(response => {
        this.setState({
          tokoAll: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props
    const { searchQuery, currentToko, currentIndex } = this.state;
    //const { tokoAll } = this.state.tokoAll

    return (
      <div className={classes.form}>
        <Grid container>
          <Grid className={classes.search} item sm={12} xs={12} md={12} xl={12} lg={12}>
            <TextField
              label="Search Query"
              value={searchQuery}
              onChange={this.onChangeSearchQuery}
            />
            <Button
              size="small"
              variant="outlined"
              className={classes.textField}
              onClick={this.searchQuery}>
              Search
            </Button>
          </Grid>
          <Grid item md={4}>
            <h2>Store List</h2>

            <div className="list-group">
              {this.state.tokoAll &&
                this.state.tokoAll.map((toko, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveToko(toko, index)}
                    divider
                    button	
                    key={index}>
                    {toko.nama}
                  </ListItem>
                ))}
            </div>

          </Grid>
          <Grid item md={8}>
            {currentToko ? (
              <div className={classes.toko}>
                <h4>Store</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Nama:</strong>
                  </label>{" "}
                  {currentToko.nama}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Jalan:</strong>
                  </label>{" "}
                  {currentToko.jalan}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Kecamatan:</strong>
                  </label>{" "}
                  {currentToko.kecamatan}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Provinsi:</strong>
                  </label>{" "}
                  {currentToko.provinsi}
                </div>

                <Link
                  to={"/toko/" + currentToko.id}
                  className={classes.edit}
                >
                  Edit
                </Link>
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.toko}>Please click on a Store...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TokoList)