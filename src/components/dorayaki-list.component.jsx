import React, { Component } from "react";
import DorayakiDataService from "../services/dorayaki.service";

import { styles } from "../css-common"
import { Grid, ListItem, withStyles } from "@material-ui/core";

class DorayakiList extends Component {
  constructor(props) {
    super(props);
    this.retrieveDorayaki = this.retrieveDorayaki.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDorayaki = this.setActiveDorayaki.bind(this);

    this.state = {
      dorayakiAll: [],
      currentDorayaki: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveDorayaki();
  }

  retrieveDorayaki() {
    DorayakiDataService.getAll()
      .then(response => {
        this.setState({
          dorayakiAll: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDorayaki();
    this.setState({
      currentDorayaki: null,
      currentIndex: -1
    });
  }

  setActiveDorayaki(dorayaki, index) {
    this.setState({
      currentDorayaki: dorayaki,
      currentIndex: index
    });
  }

  render() {
    const { classes } = this.props
    const { currentDorayaki, currentIndex, dorayakiAll } = this.state;

    return (
      <div className={classes.form}>
        <Grid container>
          <Grid item md={4}>
            <h2>Dorayaki Variants</h2>
            <div className="list-group">
              {dorayakiAll &&
                dorayakiAll.map((dorayaki, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveDorayaki(dorayaki, index)}
                    divider
                    button	
                    key={index}>
                    {dorayaki.rasa}
                  </ListItem>
                ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentDorayaki ? (
              <div className={classes.toko}>
                <h4>Dorayaki Variant</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Rasa:</strong>
                  </label>{" "}
                  {currentDorayaki.rasa}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Deskripsi:</strong>
                  </label>{" "}
                  {currentDorayaki.deskripsi}
                </div>
                <br/>
                <div className={classes.detail}>
                  <img src = {currentDorayaki.gambar} class = {classes.image}/>
                </div>
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.toko}>Please click on a dorayaki variant...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(DorayakiList)