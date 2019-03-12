/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  withStyles, Card, CardContent, Typography, Button, CircularProgress,
} from '@material-ui/core/';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NoMatch } from '../NoMatch';
import dateFormat from '../../lib/utils/dateFormat';
import { TRAINEE } from '../../configs/constants';
import { callApi } from '../../lib/utils';

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
  container: {
    position: 'relative',
  },
  circularProgress: {
    position: 'absolute',
    left: '47%',
    top: 200,
  },
});

class TraineeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      traineeDetails: {},
    };
  }


  componentDidMount() {
    this.getTrainee();
  }

  getTrainee = async () => {
    try {
      this.setState({
        loader: true,
      });
      const result = await callApi({
        method: 'get', url: '/api/trainee', headers: { Authorization: window.localStorage.getItem('token') },
      });
      const { data: { data: { records } } } = result;
      const { match: { params: { id } } } = this.props;
      const res = records.find(trainee => trainee._id === id);
      this.setState({ traineeDetails: res, loader: false });
    } catch (error) {
      this.setState({});
    }
  }

  renderCard = () => {
    const { classes } = this.props;
    const { traineeDetails } = this.state;
    const {
      name, email, createdAt,
    } = traineeDetails;
    return (
      !!traineeDetails && (
        <div>
          <Card className={classes.card}>
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
        </div>
      )
    );
  }

  render() {
    const { traineeDetails, loader } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {loader && <CircularProgress className={classes.circularProgress} size={100} />}
        { !loader && !traineeDetails && <Route component={NoMatch} /> }
        {!loader && this.renderCard()}
      </div>
    );
  }
}

TraineeDetails.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(TraineeDetails);
