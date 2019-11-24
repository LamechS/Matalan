import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Spinner from '../../components/spinner/Spinner'
import Hoc from '../../hoc/ReactAux';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import isLoggedIn from '../../helpers/LoggedIn';
import store from 'store'
import "./Division.css"

class Division extends Component {

    constructor(props) {
        super(props);
        this.state = {
            divisions: null,
        }
    }

    componentDidMount = () => {
        if (isLoggedIn()) {
            const db = firebase.firestore();
            const verRef = db.collection('ReportVersions').doc('Current');
            let StoreCurrVerCount = '';
            let stid = '';
            var temp = this;
            verRef.get()
                .then(doc => {
                    if (doc.exists) {
                        //this.setState({ "currentVers": doc.data().Name });
                        const currentVers = doc.data().Name;
                        const stid = store.get('storeid');
                        StoreCurrVerCount = `${stid}_${currentVers}`;
                        store.set('lamech', StoreCurrVerCount);
                        console.log(store.get('lamech'));
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                }).then(() => {
                    const collection = db.collection('divisions');
                    //const collection = db.collection('division');
                    const divisions = [];
                    collection.get().then(snapshot => {
                        snapshot.forEach(doc => {
                            //divisions.push(doc.data().name);
                            const stt = doc.get(store.get('lamech'));
                            if (typeof stt === 'undefined') {
                                divisions.push({name:doc.data().Name, state:'inProgress'});
                            } else {
                                divisions.push({name:doc.data().Name, state:'tick'});
                            }
                            //divisions.push(doc.data().Name);
                        });
                    }).then(() => {
                        this.setState({ divisions: divisions });
                    });
                });
        } else {
            this.props.history.push('/login')
        }

    }

    handleDepartments = (de) => event => {
        //this.props.history.push('/department');
        this.props.history.push({
            pathname: '/department',
            state: { detail: de }
        });
    }

    render() {
        return (
            <Hoc>
                {this.state.divisions === null ?
                    <Spinner /> : <Grid container justify="center" alignItems="center" direction="column">
                        <Typography variant="h5" component="h2" align='center' className="divisiontitle">DIVISIONS</Typography>
                        {this.state.divisions.map((division, index) => (
                            <Grid item key={index} >
                                <Avatar src={`../../img/${division.name.toLowerCase()}.jpg`} /*id="deptname" value={`${division}`} */ onClick={this.handleDepartments(`${division.name}`)} alt="Remy Sharp" className="avator" ></Avatar>
                                <Typography variant="body1" component="h2" align='center' className="names">{division.name}<img src={`../../img/${division.state}.png`}></img></Typography>
                            </Grid>
                        ))}
                    </Grid>}
            </Hoc>
        );
    }
}

export default withRouter(Division);