import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import Button from './Button'
import Auth from '../adapters/auth'
import SnackBar from './SnackBar'
import LoginModal from './LoginModal'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { commas } from '../adapters/Calculations'






export default class ListExampleNested extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      saved: false,
    };
    this.handleClick = this.handleClick.bind(this)

  }

  handleClick = () => {
    Auth.save(this.props)
      .then((msg) => {
        this.setState({
          saved: msg.msg
        })
      })
    this.setState({
      saved: false,
    })
  }

  render() {
    console.log(this.props)
    if (this.props[0].useCode.toLowerCase() === "condominium") {
      return (
        <div>
          <List>
            <ListItem primaryText={`Estimated Value: ${this.props[0].zestimate === undefined ? "N/A" : "$" + commas(this.props[0].zestimate.amount)}`} />
            <ListItem primaryText={`Estimated Rent: ${this.props[0].rentzestimate === undefined ? "N/A" : "$" + commas(this.props[2])}`} />
            <ListItem primaryText={`Rent Valuation Range: ${this.props[0].rentzestimate === undefined || this.props[0].rentzestimate.valuationRange.low === undefined ? "N/A" : "$" + commas(this.props[0].rentzestimate.valuationRange.low) + " - " + "$" + commas(this.props[0].rentzestimate.valuationRange.high)}`} />
            <ListItem primaryText="HOA Fees: N/A" />
            <ListItem primaryText={`Living Space: ${this.props[0].finishedSqFt === undefined ? "N/A" : commas(this.props[0].finishedSqFt) + " sqft"}`} />
            <ListItem primaryText={`Lot: ${this.props[3] === "tax data not available" ? this.props[3] : JSON.parse(this.props[3].body).property[0].lot.lotnum}`} />
            <ListItem primaryText={`Block: ${this.props[3] === "tax data not available" ? this.props[3] : JSON.parse(this.props[3].body).property[0].area.blockNum}`} />
          </List>
          {this.state.saved !== false && this.state.saved !== 'You must be logged in to save' ? <SnackBar text={this.state.saved} /> : null}
          {this.state.saved === 'You must be logged in to save' ? <LoginModal text={this.state.saved} {...this.props} /> : null}
          <Button label="Save Listing" handleClick={this.handleClick} />
        </div>
      );
    } else {
      return (
        <div>
          <List>
            <ListItem primaryText={`Estimated Value: ${this.props[0].zestimate === undefined ? "N/A" : "$" + commas(this.props[0].zestimate.amount)}`} />
            <ListItem primaryText={`Estimated Rent: ${this.props[0].rentzestimate === undefined ? "N/A" : "$" + commas(this.props[2])}`} />
            <ListItem primaryText={`Rent Valuation Range: ${this.props[0].rentzestimate === undefined || this.props[0].rentzestimate.valuationRange.low === undefined ? "N/A" : "$" + commas(this.props[0].rentzestimate.valuationRange.low) + " - " + "$" + commas(this.props[0].rentzestimate.valuationRange.high)}`} />
            <ListItem primaryText={`Living Space: ${this.props[0].finishedSqFt === undefined ? "N/A" : commas(this.props[0].finishedSqFt) + " sqft"}`} />
            <ListItem primaryText={`Lot Size: ${this.props[0].lotSizeSqFt === undefined ? "N/A" : commas(this.props[0].lotSizeSqFt) + " sqft"}`} />
            <ListItem primaryText={`Lot: ${this.props[3] === "tax data not available" ? this.props[3] : JSON.parse(this.props[3].body).property[0].lot.lotnum}`} />
            <ListItem primaryText={`Block: ${this.props[3] === "tax data not available" ? this.props[3] : JSON.parse(this.props[3].body).property[0].area.blockNum}`} />
          </List>
          {this.state.saved !== false && this.state.saved !== 'You must be logged in to save' ? <SnackBar text={this.state.saved} /> : null}
          {this.state.saved === 'You must be logged in to save' ? <LoginModal text={this.state.saved} {...this.props} /> : null}
          <Button label="Save Listing" handleClick={this.handleClick} />
        </div>
      );
    }
  }
}






