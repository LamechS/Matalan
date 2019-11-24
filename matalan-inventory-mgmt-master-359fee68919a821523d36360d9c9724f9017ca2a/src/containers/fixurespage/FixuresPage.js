import React, { Component } from 'react';
import Fixure from '../../components/fixure/Fixure'
import { Divider } from '@material-ui/core';
import Hoc from '../../hoc/ReactAux';
import Header from '../../components/header/Header';
import Grid from "@material-ui/core/Grid";
import Spinner from '../../components/spinner/Spinner'
import firebase from '../../firebase/firebase';
import Button from "@material-ui/core/Button";
import isLoggedIn from '../../helpers/LoggedIn';
import Typography from '@material-ui/core/Typography';
import store from 'store';
import './FixuresPage.css';

class FixuresPage extends Component {
    constructor(props) {
        super();
        this.state = {
            fixures: null,
        }
    }

    componentDidMount = () => {
        if (isLoggedIn()) {
            const db = firebase.firestore();
            const collection = db.collection(this.props.location.state.detail + '/Fixtures');
            //const verRef = "Aug2010";
            const verRef = db.collection('ReportVersions').doc('Current');
            let StoreCurrVerCount = '';
            var temp = this;
            verRef.get()
                .then(doc => {
                    if (doc.exists) {
                        //this.setState({ "currentVers": doc.data().Name });
                        const currentVers = doc.data().Name;
                        const stid = store.get('storeid');
                        StoreCurrVerCount = `${stid}_${currentVers}`;
                        this.setState({ "lamech": StoreCurrVerCount });

                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                }).then(() => {
                    const fixures = [];
                    collection.get().then(snapshot => {
                        snapshot.forEach(doc => {
                            if (typeof doc.data().Name === 'undefined') {
                                console.log(doc.data());
                            } else {
                            fixures.push({ name: doc.data().Name, count: doc.get(this.state.lamech) });
                            }
                        });
                    }).then(() => {
                        this.setState({ fixures: fixures });
                    });
                });

        } else {
            this.props.history.push('/login')
        }
    }

    handleSubmitData = () => {
        // Lamech to code here for submit functionality 
        let fullUpdate = true;
        const db = firebase.firestore();
        for (var i = 0; i < this.state.fixures.length; i++) {
            const cityRef = db.collection(this.props.location.state.detail + '/Fixtures').doc(this.state.fixures[i].name);
            const newValue = document.getElementsByName(this.state.fixures[i].name)[0].value;
            if (newValue == "") {
                fullUpdate = false;
            } else {
                const oldval = this.state.fixures[i].count ;
                if (oldval == "") {
                    const setWithMerge = cityRef.set({
                        [this.state.lamech]: newValue
                    }, { merge: true });
                } else {
                    if(newValue==oldval){
                        // do nothing
                    }else {
                        const setWithMerge = cityRef.set({
                            [this.state.lamech]: newValue
                        }, { merge: true });
                    }

                }
            }
            console.log("Name " + this.state.fixures[i].name + " Value " + this.state.fixures[i].count + " field " + [this.state.lamech])
        }
        if (fullUpdate == true) {
            var cityRef = db.doc(this.props.location.state.detail);
            var setWithMerge = cityRef.set({
                [this.state.lamech]: true
            }, { merge: true });
            window.history.back();
        }

    }

    render() {
        return (
            <Hoc>
                <Header />
                {this.state.fixures === null ? <Spinner /> :
                    <Hoc>
                        <Typography variant="h5" component="h2" align='center' className="divisiontitle">FIXTURES</Typography>
                        <Grid container justify="center" spacing={0}>
                            <Grid item lg={9} xl={9} >
                                {this.state.fixures.map((data, index) => (
                                    <Hoc key={index}>
                                        <Fixure data={data} key={index} />
                                        <Divider light={true} variant='middle' />
                                    </Hoc>
                                ))}
                            </Grid>
                        </Grid>
                        <br />
                        <Button
                            className="submitbtn"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="secondary"
                            onClick={this.handleSubmitData}
                        >
                            Submit Data
                            </Button>
                    </Hoc>
                }
            </Hoc>

        );
    }
}
export default FixuresPage;