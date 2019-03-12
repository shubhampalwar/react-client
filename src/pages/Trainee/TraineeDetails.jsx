/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  withStyles, Card, CardContent, Typography, Button, CircularProgress,
} from '@material-ui/core/';
import { Link, Route, Redirect } from 'react-router-dom';
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
  }
});

class TraineeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      id: '',
    };
    // this.getTrainee();
  }

  static async getDerivedStateFromProps(props, state) {
    try {
      const result = await callApi({
        method: 'get', url: '/api/trainee', headers: { Authorization: window.localStorage.getItem('token') },
      });
      const { data: { data: { records } } } = result;
      const { match: { params } } = props;
      const res = records.find(trainee => trainee['_id'] === params.id);
      console.log('>>>>>>', res);
      console.log(',,,,,,', state.id);
      console.log('>>>>>><<<<<<', params.id);
      // const { traineeDetails } = state;
      // traineeDetails = res;
      if (state.id !== params.id) {
        console.log('inside if', params.id, state.id);
        return {
          id: params.id,
          traineeDetails: res,
          loader: false,
        };
      }
    } catch (error) {
      return null;
    }
  }

  // getTrainee = async () => {
  //   try {
  //     this.setState({
  //       loader: true,
  //     });
  //     const result = await callApi({
  //       method: 'get', url: '/api/trainee', headers: { Authorization: window.localStorage.getItem('token') },
  //     });
  //     const { data: { data: { records } } } = result;
  //     const { match: { params: { id } } } = this.props;
  //     const res = records.find(trainee => trainee._id === id);
  //     this.setState({ traineeDetails: res, loader: false });
  //   } catch (error) {
  //     this.setState({});
  //   }
  // }

  renderCard = () => {
    const { classes, history } = this.props;
    const { traineeDetails, loader } = this.state;
    console.log(traineeDetails);
    // if (!traineeDetails && !loader) { return <NoMatch />a; }
    // const {
    //   name, email, createdAt,
    // } = traineeDetails;
    return (
      <div>
        {loader && <CircularProgress />}
        { !loader && !traineeDetails && <Route component={NoMatch} /> }
      </div>
      // !!traineeDetails && (
      //   <div>
      //     <Card className={classes.card}>
      //       <CardContent className={classes.content}>
      //         <Typography component="h6" variant="h6">
      //           {name}
      //         </Typography>
      //         <Typography variant="subtitle1" color="textSecondary">
      //           {dateFormat(createdAt)}
      //         </Typography>
      //         <Typography variant="body2" color="textPrimary">
      //           {email}
      //         </Typography>
      //       </CardContent>
      //     </Card>
      //     <div className={classes.divButton}>
      //       <Button className={classes.backButton} color="primary" variant="contained"><Link className={classes.link} to={TRAINEE}>Back</Link></Button>
      //     </div>
      //   </div>
      // )
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(TraineeDetails);
