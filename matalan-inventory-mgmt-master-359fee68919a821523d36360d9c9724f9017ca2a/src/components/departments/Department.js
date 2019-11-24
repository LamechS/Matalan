import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hoc from '../../hoc/ReactAux';
import Header from '../header/Header';
import Spinner from '../../components/spinner/Spinner'
import firebase from '../../firebase/firebase';
import isLoggedIn from '../../helpers/LoggedIn';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import store from 'store';
import "./Department.css";

class Department extends Component {

    constructor(props) {
        super();
        this.state = {
            departments: null,
        }
    }
    componentDidMount = () => {
        if (isLoggedIn()) {
            const db = firebase.firestore();
            let divState = true;
            //const collection = db.collection('departments');
            const collection = db.collection('divisions').doc(this.props.location.state.detail).collection('Department');
            const departments = [];
            collection.get().then(snapshot => {
                snapshot.forEach(doc => {
                    const stt = doc.get(store.get('lamech'));
                    if (typeof stt === 'undefined') {
                        departments.push({name:doc.data().Name, state:'inProgress'});
                        divState = false;
                    } else {
                        departments.push({name:doc.data().Name, state:'tick'});
                    }
                });
            }).then(() => {
                this.setState({ departments: departments });
            }).then(() => {
                if (divState == true) {
                    var cityRef = db.collection('divisions').doc(this.props.location.state.detail);
                    var setWithMerge = cityRef.set({
                        [store.get('lamech')]: true
                    }, { merge: true });
                    //window.history.back();
                }
            });
        } else {
            this.props.history.push('/login')
        }
    }

    handleFixtures = (de) => event => {
        //this.props.history.push('/fixures');
        this.props.history.push({
            pathname: '/fixures',
            state: { detail: 'divisions/'+this.props.location.state.detail+'/Department/'+de }
          });
    }

    render() {
        return (
            <Hoc>
                <Header />
                {this.state.departments === null ?
                    <Spinner /> :
                    <Grid container className="department" justify="center" alignItems="center" direction="column">
                        <Typography variant="h5" component="h2" align='center' className="divisiontitle">DEPARTMENTS</Typography>
                        {this.state.departments.map((department, index) => (
                            <Grid item key={index} >
                                <Paper className="paper" onClick={this.handleFixtures(`${department.name}`)}>{department.name}
                                <img src={`../../img/${department.state}.png`}></img>
                                </Paper>
                                <Divider light={true} variant='middle' />
                            </Grid>
                        ))}
                    </Grid>
                }
            </Hoc>
        );
    }
}

export default Department;