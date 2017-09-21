import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Text from './Text'
import SelectDownPayment from './SelectDownPayment'
import SelectMortgage from './SelectMortgage'
import Button from './Button'




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
      purchasePrice: '',
      downPayment: '',
      mortgage: ''
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  changePrice = (value) => {
    this.setState({
      purchasePrice: value
    })
    console.log(this.state.purchasePrice)
  }

  handleClick = () => {
    debugger
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Tabe One" value={0} />
          <Tab label="Cash Flow Analysis" value={1} />
          <Tab label="Tab Three" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            <h4>Enter the additional info below for your cashflow analysis</h4>
            <form onSumbit={this.handleSubmit}>
              <Text label="Purchase Price" changePrice={this.changePrice}/>
              <br/>
              <SelectDownPayment />
              <br/>
              <br/>
              <SelectMortgage /> 
              <br/>
              <br/>              
              <Button label="Calculate" handleChange={this.handleClick}/> 
            </form>
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    );
  }
}