import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Text from './Text'
import SelectDownPayment from './SelectDownPayment'
import SelectMortgage from './SelectMortgage'
import Button from './Button'
import { Grid } from 'semantic-ui-react'
import Auth from '../adapters/auth'
import { affordability } from '../adapters/Calculations'
import { getMortgage } from '../adapters/Calculations'
import { getMI } from '../adapters/Calculations'





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
      financialData: []
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

  changeHOA = (value) => {
    debugger
    this.setState({
      HOA: value
    })
  }

  changeHOI = (value) => {
    this.setState({
      HOI: value
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

    let price = this.state.purchasePrice === undefined ? 0 : this.state.purchasePrice
    let dp = this.state.downPayment === undefined ? 0 : this.state.downPayment
    let mortgage = this.state.mortgage
    debugger
    let HOI = isNaN(this.state.HOI) ? 0 : parseInt(this.state.HOI)
    let HOA = isNaN(this.state.HOA) ? 0 : parseInt(this.state.HOA)
    this.props.submitForAnalysis(price, mortgage, dp, HOI, HOA)
  };




  componentWillMount() {
    if (localStorage.getItem("token")) {
      Auth.getFinancialData()
        .then(res => {
          this.setState({
            financialData: res
          })
        })
    } else {
      this.setState({
        financialData: ''
      })
    }
  }



  render() {
    // 
    let advice;
    if (this.state.financialData.length < 1 && typeof this.state.financialData === "object") {
      advice = <h3>Loading</h3>
    } else if (this.state.financialData[0] !== undefined && this.state.financialData[0].average_annual_income === "0") {
      advice = <h3>Please fill out your financial profile in order to receive mortgage advice</h3>
    } else if (this.state.financialData === '') {
      advice = <h3>Please login to see if you can afford this house</h3>
    } else {
      if (this.props.purchasePrice === '') {
        advice = <h3>Please fill out a purchase scenario in order to receive advice</h3>
      } else {
        let data = affordability(this.props, this.state, getMortgage, getMI)
        // 
        let message;
        if (data[0].credit < 620 && data[0].assets < (data[0].downpayment + 10000)) {
          message = <h3>Your credit score is too low and you do not have enough cash to buy this property. </h3>
        } else if (data[0].credit < 620) {
          message = <h3>Your credit score is too low, please work on it. </h3>
        } else if (data[0].assets < (data[0].downpayment + 10000)) {
          message = <h3>Based on your financial profile, you do not have enough money to purchase this property</h3>
        }
        else if (((data[0].debts + data[0].housingPayment) / (data[0].income) > .45 + data[0].rent)) {
          message = <h3>Based on your financial profile that you filled out, you will not be able to get a mortgage with these paramaters. This is too expensive for you. </h3>
        } else {
          message = <h3>Based on your financial profile that you filled out, you should be able to get a mortgage with these paramaters:</h3>
        }
        advice = (
          <div>
            {message}
            <br></br>
            <h3>Mortgage Payment: </h3>
            <h3>Down Payment: </h3>
            <h3>Tax Payment: </h3>
            <h3>Mortgage Insurance: </h3>
            <h3>HOA Payment: </h3>
            <h3>Homeowners Insurance: </h3>
          </div>
        )
      }
    }

    return (
      <Tabs value={this.state.value} onChange={this.handleChange} >
        <Tab label="Purchase Details" value="a" style={{ backgroundColor: '#191a1c' }}>
          <div>
            <h2 style={styles.headline}>Enter the additional info below for your cashflow analysis</h2>
            <Grid padded relaxed>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Text label="Purchase Price" handleChange={this.changePrice} />
                  <Text label="HOA Fees/month (if applicable)" handleChange={this.changeHOA} />
                  <Text label="Homeowner's Insurance/month" handleChange={this.changeHOI} />
                  <SelectDownPayment changeDP={this.changeDP} />
                  <SelectMortgage changeMortgage={this.changeMortgage} />
                  <Button label="Calculate" handleClick={this.handleClick} />
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </div>
        </Tab>
        <Tab label="Mortgage Advice" value="b" style={{ backgroundColor: '#191a1c' }} >
          <div>
            <h2 style={styles.headline}>Headline</h2>
            {advice}
          </div>
        </Tab>


      </Tabs>
    );
  }
}