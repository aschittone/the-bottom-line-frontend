import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
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
};

export default class TabsExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      purchasePrice: '',
      downPayment: '',
      mortgage: ''
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  changePrice = (value) => {
    this.setState({
      purchasePrice: value
    })
  }

  changeDP = (value) => {
    this.setState({
      downPayment: value
    })
  }

  changeMortgage = (value) => {
    this.setState({
      mortgage: value
    })
  }

  handleClick = () => {
    let price = this.state.purchasePrice
    let dp = this.state.downPayment
    let mortgage = this.state.mortgage
    this.props.submitForAnalysis(price, mortgage, dp)
  };

  render() {
    return (
      <Tabs value={this.state.value} onChange={this.handleChange}>


        <Tab label="Purchase Details" value="a">
          <div>
            <h2 style={styles.headline}>Enter the additional info below for your cashflow analysis</h2>
            <Text label="Purchase Price" changePrice={this.changePrice} />
            <br/>
            <SelectDownPayment changeDP={this.changeDP}/>
            <br/>
            <br/>
            <SelectMortgage changeMortgage={this.changeMortgage}/>
            <br/>
            <br/>
            <Button label="Calculate" handleClick={this.handleClick} />
          </div>
        </Tab>


        <Tab label="Sale History" value="b">
          <div>
            <h2 style={styles.headline}>Controllable Tab B</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>


      </Tabs>
    );
  }
}