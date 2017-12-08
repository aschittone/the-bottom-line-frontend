import React from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'

export default class Footer extends React.Component {


  render() {
    return (
      <div >
        <Segment inverted vertical style={{ padding: '5em 0em', backgroundColor: '#000' }} >
          <Container >
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>The Bottom Line</Header>
                  <p>A simple way to analyze cash flow.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}
