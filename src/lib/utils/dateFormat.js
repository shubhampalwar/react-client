import * as moment from 'moment';

export default date => (moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a'));
