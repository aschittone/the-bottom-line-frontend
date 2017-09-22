import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Text from './Text'
import SelectDownPayment from './SelectDownPayment'
import SelectMortgage from './SelectMortgage'
import Button from './Button'
import { Grid } from 'semantic-ui-react'

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
      mortgage: '',
      HOA: '',
      HOI: ''
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
    let price = this.state.purchasePrice
    let dp = this.state.downPayment
    let mortgage = this.state.mortgage
    let HOI = parseInt(this.state.HOI)
    let HOA = parseInt(this.state.HOA)
    this.props.submitForAnalysis(price, mortgage, dp, HOI, HOA)
  };

  render() {
    return (
      <Tabs value={this.state.value} onChange={this.handleChange}>


        <Tab label="Purchase Details" value="a">
          <div>
            <h2 style={styles.headline}>Enter the additional info below for your cashflow analysis</h2>


            <Grid padded relaxed>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Text label="Purchase Price" handleChange={this.changePrice} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Text label="HOA Fees/month (if applicable)" handleChange={this.changeHOA} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={8}>
                  <SelectDownPayment changeDP={this.changeDP} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Text label="Homeowner's Insurance/month" handleChange={this.changeHOI} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={8}>
                  <SelectMortgage changeMortgage={this.changeMortgage} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Button label="Calculate" handleClick={this.handleClick} />
                </Grid.Column>
              </Grid.Row>
            </Grid>

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