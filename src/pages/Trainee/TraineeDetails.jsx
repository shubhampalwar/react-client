import React, { Component } from 'react';
import {
  withStyles, Card, CardMedia, CardContent, Typography, Button,
} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { trainees } from './data';
import { NoMatch } from '../NoMatch';
import dateFormat from '../../lib/utils/dateFormat';
import { TRAINEE } from '../../configs/constants';

const styles = theme => ({
  card: {
    display: 'flex',
    backgroundColor: '#F0E6E4',
  },
  cover: {
    width: 175,
    height: 175,
  },
  divButton: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    flex: '1 0 auto',
  },
  backButton: {
    marginTop: theme.spacing.unit * 2,
    width: 'default',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

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
    return (
      <>
        <Card className={classes.card}>
          <CardMedia image={img} title={name} className={classes.cover} />
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {dateFormat(createdAt)}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {email}
            </Typography>
          </CardContent>
        </Card>
        <div className={classes.divButton}>
          <Button className={classes.backButton} color="primary" variant="contained"><Link className={classes.link} to={TRAINEE}>Back</Link></Button>
        </div>
      </>
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
