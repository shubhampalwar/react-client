/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  withStyles, Card, CardMedia, CardContent, Typography,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import { trainees } from './data';
import { NoMatch } from '../NoMatch';

const styles = {
  card: {
    display: 'flex',
  },
  cover: {
    width: 151,
    height: 150,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',

  },
  content: {
    flex: '1 0 auto',
  },
};

class TraineeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getTrainee = () => {
    const { match: { params: { id } } } = this.props;
    return trainees.find(trainee => trainee.id === id);
  }

  renderCard = () => {
    const { classes } = this.props;
    const trainee = this.getTrainee();
    if (!trainee) { return <NoMatch />; }
    const {
      name, email, createdAt, img,
    } = trainee;
    console.log('trainee', trainee);
    return (
      <Card className={classes.card}>
        <CardMedia image={img} title={NamedNodeMap} className={classes.cover} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {createdAt}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {email}
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
  }

  render() {
    return (
      <>
        {this.renderCard()}
      </>
    );
  }
}

TraineeDetails.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(TraineeDetails);
