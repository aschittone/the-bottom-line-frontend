import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Table from './Table'
import {getMortgage} from '../adapters/Calculations'
import {getMI} from '../adapters/Calculations'



const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

export default class TabsExampleSwipeable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      rowData: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.purchaseInfo !== this.props.purchaseInfo) {
      let taxes = nextProps.data[3] === "tax data not available" ? 0 : Math.round((parseInt(JSON.parse(nextProps.data[3].body).property[0].assessment.tax.taxamt) / 12))
      let HOI = nextProps.purchaseInfo.HOI
      let HOA = nextProps.purchaseInfo.HOA
      let rent = nextProps.data[2]
      if (nextProps.purchaseInfo.downPayment !== "Cash" && nextProps.purchaseInfo.mortgage !== "") {
        var mortgage = getMortgage(nextProps.purchaseInfo.mortgage, nextProps.purchaseInfo.downPayment, nextProps.purchaseInfo.purchasePrice)
        var MI = getMI(nextProps.purchaseInfo.downPayment, nextProps.purchaseInfo.purchasePrice)
      } else {
        var mortgage = 0
        var MI = 0
      }
      this.setState({
        rowData: [taxes, rent, MI, mortgage, HOI, HOA]
      })
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };


  render() {
    return (
      <div>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="Conservative" value={0} />
          <Tab label="Moderate" value={1} />
          <Tab label="Agressive" value={2} />
        </Tabs>
        <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
          <div style={styles.slide}>
            <Table rowData={this.state.rowData} rent={this.state.rowData[1] - 200} />
          </div>
          <div style={styles.slide}>
            <Table rowData={this.state.rowData} rent={this.state.rowData[1]} />
          </div>
          <div style={styles.slide}>
            <Table rowData={this.state.rowData} rent={this.state.rowData[1] + 200} />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}