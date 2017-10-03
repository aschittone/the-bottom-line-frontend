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
	}

	render() {

		return (
			<div>
				<List>
					<ListItem primaryText={`Taxes: ${this.props[3] === "tax data not available" ? this.props[3] : "$" + commas(JSON.parse(this.props[3].body).property[0].assessment.tax.taxamt)}`} />
					<ListItem primaryText={`Assessment: ${this.props[3] === "tax data not available" ? this.props[3] : commas(JSON.parse(this.props[3].body).property[0].assessment.assessed.assdttlvalue)}`}
						initiallyOpen={true}
						nestedItems={[
							<ListItem
								key={1}
								primaryText={`Improvement Value: ${this.props[3] === "tax data not available" ? this.props[3] : commas(JSON.parse(this.props[3].body).property[0].assessment.assessed.assdimprvalue)}`}
							/>,
							<ListItem
								key={2}
								primaryText={`Land Value: ${this.props[3] === "tax data not available" ? this.props[3] : commas(JSON.parse(this.props[3].body).property[0].assessment.assessed.assdlandvalue)}`}
							/>]}
					/>
					<ListItem primaryText={`Property Type: ${this.props[0].useCode}`} />
					<ListItem primaryText={`Year Built: ${this.props[0].yearBuilt === undefined ? "N/A" : this.props[0].yearBuilt}`} />
					<ListItem primaryText={`Last Sold Date: ${this.props[0].lastSoldDate === undefined ? "N/A" : this.props[0].lastSoldDate}`} />
					<ListItem primaryText={`Last Sold Price: ${this.props[0].lastSoldPrice === undefined ? "N/A" : "$" + commas(this.props[0].lastSoldPrice)}`} />
				</List>
			</div>
		);
	}
}





