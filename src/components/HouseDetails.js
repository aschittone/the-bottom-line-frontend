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


export default class ListExampleNested extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      saved: false,
      user: true
    };
    this.handleClick = this.handleClick.bind(this)
  }

  

  handleClick = () => {
    this.setState({
      saved: false
    })
    if (localStorage.getItem('token')) {
      Auth.save(this.props)
			.then((msg) => {
				this.setState({
            saved: msg.msg
				})
			})
    } else {
      this.setState({
        saved: 'promptLogin'
      })
    }
  }

  render() {
    console.log(this.props)
    if (this.props[0].useCode.toLowerCase() === "condominium") {
      return (
        <div>
          <List>
            <Subheader>Property Details (2017)</Subheader>
            <ListItem primaryText={`Estimated Value: ${this.props[0].zestimate.amount}`} leftIcon={<ContentSend />} />
            <ListItem primaryText={`Taxes: ${this.props[3] === "tax data not available" ? this.props[3] : JSON.parse(this.props[3].body).property[0].assessment.tax.taxamt}`} leftIcon={<ContentSend />} />
            <ListItem primaryText="HOA Fees: N/A" leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Living Space: ${this.props[0].finishedSqFt} sqft`} leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Property Type: ${this.props[0].useCode}`} leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Year Built: ${this.props[0].yearBuilt}`} leftIcon={<ContentSend />} />
          </List>
          {this.state.saved !== false ? <SnackBar text={this.state.saved}/> : null}
          {this.state.saved === 'promptLogin' ? <LoginModal text={this.state.saved} {...this.props}/> : null}
          <Button label="Save Listing" handleClick={this.handleClick}/>
        </div>
      );
    } else {
      return (
        <div>
          <List>
            <Subheader>Property Details (2017)</Subheader>
            <ListItem primaryText={`Estimated Value: ${this.props[0].zestimate.amount}`} leftIcon={<ContentSend />} />
            <ListItem primaryText={`Taxes: ${this.props[3] === "tax data not available" ? this.props[3] : JSON.parse(this.props[3].body).property[0].assessment.tax.taxamt}`} leftIcon={<ContentSend />} />
            <ListItem primaryText={`Living Space: ${this.props[0].finishedSqFt} sqft`} leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Lot Size: ${this.props[0].lotSizeSqFt} sqft`} leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Property Type: ${this.props[0].useCode}`} leftIcon={<ContentDrafts />} />
            <ListItem primaryText={`Year Built: ${this.props[0].yearBuilt}`} leftIcon={<ContentSend />} />
          </List>
          {this.state.saved !== false ? <SnackBar text={this.state.saved}/> : null}  
          {this.state.saved === 'promptLogin' ? <LoginModal text={this.state.saved} {...this.props}/> : null}                  
          <Button label="Save Listing" handleClick={this.handleClick}/>
        </div>
      );
    }
  }
}