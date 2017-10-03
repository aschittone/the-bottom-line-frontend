import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import HouseDetails from './HouseDetails'
import FinancialDetails from './FinancialDetails'


const styles = {
	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400,
	},
}


const TabsExampleIconText = (props) => (
	<Tabs>
		<Tab
			icon={<FontIcon className="material-icons">phone</FontIcon>}
			style={{ backgroundColor: '#191a1c' }}
		>
			<div>
				<h2 style={styles.headline}>Property Details</h2>
				<HouseDetails {...props.data} {...props} />
			</div>
		</Tab>

		<Tab
			icon={<FontIcon className="material-icons">favorite</FontIcon>}
			style={{ backgroundColor: '#191a1c' }}
		>
			<div>
				<h2 style={styles.headline}>Tax Information</h2>
				<FinancialDetails {...props.data} {...props} />

			</div>
		</Tab>

	</Tabs>
);

export default TabsExampleIconText;