
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

const translate = () => (
    <Card style={styles.card}>
        <CommentIcon style={styles.icon} />
        <CardTitle title="Recent Searches" style={styles.titleLink} subtitle="Here's a list of your recent searches. Click on any of them below to analyze the property again." />
        
    </Card>
	);
	
	// <List>
  //           {reviews.map(record =>
  //               <ListItem
  //                   key={record.id}
  //                   href={`#/reviews/${record.id}`}
  //                   primaryText={<StarRatingField record={record} />}
  //                   secondaryText={record.comment}
  //                   secondaryTextLines={2}
  //                   leftAvatar={customers[record.customer_id] ? <Avatar src={`${customers[record.customer_id].avatar}?size=32x32`} /> : <Avatar />}
  //               />
  //           )}
	//       </List>
	
	export default translate