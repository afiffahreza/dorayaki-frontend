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
      toko: [],
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
          toko: response.data
        });
        console.log(response.data);
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
          toko: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props
    const { searchQuery, toko, currentToko, currentIndex } = this.state;

    return (
      <div className={classes.form}>
        <Grid container>
          <Grid className={classes.search} item sm={12} xs={12} md={12} xl={12} lg={12}>
            <TextField
              label="Search by query"
              value={searchQuery}
              onChange={this.onChangeSearchQuery}
            />
            <Button
              size="small"
              variant="outlined"
              className={classes.textField}
              onClick={this.searchTitle}>
              Search
            </Button>
          </Grid>
          <Grid item md={4}>
            <h2>Store List</h2>

            <div className="list-group">
              {toko &&
                toko.map((toko, index) => (
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