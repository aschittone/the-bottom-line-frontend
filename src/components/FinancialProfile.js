import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CustomerIcon from 'material-ui/svg-icons/social/person-add';
import FinancialProfileForm from './FinancialProfileForm'




const styles = {
    card: { borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em', marginTop: '1em', marginRight: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50' },
};

class translate extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Card style={styles.card}>
                <CardTitle title="Financial Profile" subtitle="Fill out the form below to receive mortgage advise when browsing properties." />
                <FinancialProfileForm saveData={this.props.saveData} />
            </Card>
        )
    }
}

export default translate
