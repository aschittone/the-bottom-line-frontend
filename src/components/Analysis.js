import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Table from './Table'



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
      rowData: []
    };
  }

  getMortgage(type, dp, price) {
    let r;
    let n;
    switch (type) {
      case "30 Year Fixed Conventional":
        r = 4.25
        n = 360
        break;
      case "15 Year Fixed Conventional":
        r = 3.75
        n = 180
        break;
      case "10 Year Fixed Conventional":
        r = 3.75
        n = 120
        break;
      default:
        r = 4.5
      }
    let loanAmount = (((100 - parseFloat(dp)) / 100) * price)      
    let i = ((r / 100) / 12) 
    let payment = (i / ((Math.pow((1 + i), n)) - 1 )) * ((Math.pow((1 + i), n))) * loanAmount
    return Math.round(payment, 2)
  }

  getMI(dp, price) {
    let loanAmount = (((100 - parseFloat(dp)) / 100) * price)  
    let MI;    
    switch (dp) {
      case "5%":
       MI = (loanAmount * .009) / 12
      break;
      case "10%":
        MI = (loanAmount * .0046) / 12
        break;
      case "15%":
        MI = (loanAmount * .0027) / 12
        break;
      default:
        MI = 0
      } 
    return Math.round(MI, 2)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.purchaseInfo !== this.props.purchaseInfo) {
      let mortgage = this.getMortgage(nextProps.purchaseInfo.mortgage, nextProps.purchaseInfo.downPayment, nextProps.purchaseInfo.purchasePrice)
      let MI = this.getMI(nextProps.purchaseInfo.downPayment, nextProps.purchaseInfo.purchasePrice)
      let taxes = 0
      let rent = nextProps.data[2]
      this.setState({
        rowData: [taxes, rent, MI, mortgage]
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
            <Table rowData={this.state.rowData}/>  
          </div>
          <div style={styles.slide}>
            <Table rowData={this.state.rowData}/>
          </div>
          <div style={styles.slide}>
            <Table rowData={this.state.rowData}/>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}