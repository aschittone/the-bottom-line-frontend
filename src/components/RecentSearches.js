
import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import Avatar from 'material-ui/Avatar';


const styles = {
    titleLink: { textDecoration: 'none', color: '#000' },
    card: { borderLeft: 'solid 4px #f44336', flex: 1, marginRight: '1em', marginTop: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#f44336' },
};



class translate extends React.Component {


    render() {
        let recentSearches;
        if (localStorage.getItem('token') && !localStorage.getItem('search')) {
            recentSearches = <h3>You have no recent searches!</h3>
        } else if (localStorage.getItem('token') && localStorage.getItem('search')) {
            let searches = JSON.parse(localStorage.getItem('search'))  
            recentSearches = searches.map((search, i) => {
                if (i < 7) {
                  return (<ListItem
                        key={i}
                        href={`http://localhost:3001/listing/${search}`}
                        primaryText={search}
                    />)
                }
            })
            
        }

        return (
    <Card style={styles.card}>
        <CommentIcon style={styles.icon} />
        <CardTitle title="Recent Searches" style={styles.titleLink} subtitle="Here's a list of your recent searches. Click on any of them below to analyze the property again." />
        <List>
        {recentSearches}
        </List>
    </Card>
        )
    }
}
	
	
export default translate
    
    // leftAvatar={customers[record.customer_id] ? <Avatar src={`${customers[record.customer_id].avatar}?size=32x32`} /> : <Avatar />}