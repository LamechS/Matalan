import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hoc from '../../hoc/ReactAux';
import Header from '../header/Header';
import Spinner from '../spinner/Spinner'
import firebase from '../../firebase/firebase';
import isLoggedIn from '../../helpers/LoggedIn';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import store from 'store';
import "./ReportView.css";

class ReportView extends Component {

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
            const collection = db.collection('ReportVersions');
            const departments = [];
            collection.get().then(snapshot => {
                snapshot.forEach(doc => {
                    const stt = doc.data().State;
                    if (typeof stt === 'undefined') {
                        departments.push({ name: doc.data().Name, state: 'inProgress' });
                        divState = false;
                    } else {
                        departments.push({ name: doc.data().Name, state: 'tick' });
                    }
                });
            }).then(() => {
                this.setState({ departments: departments });
            });
        } else {
            this.props.history.push('/login')
        }
    }

    getIndex(value, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    handleFixtures = (de) => event => {
        //this.props.history.push('/fixures');
        /* dummy code used for data creation. Can be used in future 
        var A =[['Half Wallbays','24x7 Gondola','2-Way','4-Way','6-Way','A-Frame','Belt Stand','Brand Rail','Castellated Nib Wall','Catwalk High','Core Table','C-Rail','Cross(or)Edit Rail','Denim 73 Gondola','Denim 73 Low','End Frame','Fashion Gondola','Medium Table','Nib Wall','Quad','Slab','Straight Rail','Trouser Spine','Wallbays'],
        ['Half Wallbays','2-Way','4-Way','6-Way','Castellated Nib Wall','Catwalk High','End Frame','Fashion Gondola','Nib Wall','Slab','Trouser Spine','Wallbays']
        ];
        var B = ['Mens Nightwear','Mens Swimwear'];
        const db = firebase.firestore();
        for (var j=0;j<B.length;j++) {
            var c = A[j]; 
        for (var i=0; i<c.length;i++){
            const cityRef = db.collection('divisions/Mens/Department/'+B[j]+'/Fixtures').doc(c[i]);
            let setAda = cityRef.set({
                Name: c[i],
              });
        }
    } */
    
        const divisions = [];
        const storeid = [];
        const storeDetails = [];
        var finaldoc = [];
        const departments = [];
        const departmentFulldetails = [];
        finaldoc.push("Store Id, Store Location, Division, Department, Fixture,Count,");
        const db = firebase.firestore();
        let collection = db.collection('store');
        let downloadReport = 'true';
        collection.get().then(snapshot => {
            snapshot.forEach(doc => {
                const stn = doc.get('StoreName');
                if (typeof stn === 'undefined') {
                    console.log("Invalid credentials");
                } else {
                    const stid = doc.get('StoreId');
                    storeid.push(stid);
                    storeDetails.push(stid + "," + stn);
                    this.setState({ [stid]: stn });
                    console.log(this.state[stid]);
                }
            });
            const divisionDetails = [];
            collection = db.collection('divisions');
            collection.get().then(snapshot => {
                snapshot.forEach(doc => {
                    const stn = doc.get('Name');
                    if (typeof stn === 'undefined') {
                        console.log("Invalid credentials");
                    } else {
                        console.log(stn);
                        divisions.push(stn);
                        for (var k = 0; k < storeid.length; k++) {
                            const deptStatus = doc.get(storeid[k] + "_" + de);
                            if (typeof deptStatus === 'undefined') {
                                divisionDetails.push(stn + ",Incomplete");
                            } else {
                                divisionDetails.push(stn + ",Completed");
                            }
                        }
                    }
                });
            }).then(() => {
                for (var i = 0; i < divisions.length; i++) {
                    //const departments = [];
                    //const departmentFulldetails = [];
                    const cityRef = db.collection('divisions/' + divisions[i] + '/Department/');
                    cityRef.get().then(snapshot => {
                        snapshot.forEach(doc => {
                            const stn = doc.get('Name');
                            if (typeof stn === 'undefined') {
                                console.log("Invalid credentials");
                            } else {
                                //console.log(stn);
                                departments.push(stn);
                                for (var k = 0; k < storeid.length; k++) {
                                    const deptStatus = doc.get(storeid[k] + "_" + de);
                                    if (typeof deptStatus === 'undefined') {
                                        departmentFulldetails.push(stn + ",Incomplete");
                                    } else {
                                        departmentFulldetails.push(stn + ",Completed");
                                    }
                                }
                            }
                        });
                    }).then(() => {
                        const FixturesFulldetails = [];
                        //for (var divz=0; divz<divisions.length; divz++) {
                        for (var divz = 0; divz < divisions.length; divz++) {
                            for (var l = 0; l < departments.length; l++) {
                                const cityRef = db.collection('divisions/' + divisions[divz] + '/Department/' + departments[l] + '/Fixtures');
                                cityRef.get().then(snapshot => {
                                    snapshot.forEach(doc => {
                                        const stn = doc.get('Name');
                                        if (typeof stn === 'undefined') {
                                            console.log("Invalid credentials");
                                        } else {
                                            //console.log(stn);
                                            //divisions.push(stn);
                                            for (var k = 0; k < storeid.length; k++) {
                                                const deptStatus = doc.get(storeid[k] + "_" + de);
                                                if (typeof deptStatus === 'undefined') {
                                                    finaldoc.push(storeDetails[k] + "," + doc._document.key.path.segments[6] + "," + doc._document.key.path.segments[8] + "," + stn + ",NA,");
                                                    console.log(storeDetails[k] + "," + doc._document.key.path.segments[6] + "," + doc._document.key.path.segments[8] + "," + stn + ",NA");
                                                } else {
                                                    finaldoc.push(storeDetails[k] + "," + doc._document.key.path.segments[6] + "," + doc._document.key.path.segments[8] + "," + stn + "," + deptStatus + ",");
                                                    console.log(storeDetails[k] + "," + doc._document.key.path.segments[6] + "," + doc._document.key.path.segments[8] + "," + stn + "," + deptStatus);
                                                }
                                                if ((doc._document.key.path.segments[6] === divisions[divisions.length-1]) && (doc._document.key.path.segments[8] === departments[departments.length-1]) && (k == storeid.length-1)&& (downloadReport === 'true')) {
                                                    downloadReport='fasle';
                                                    var csvString = finaldoc.join("\n");
                                                    console.log(csvString);
                                                    const blob = new Blob([csvString], { type: 'text/csv' });
                                                    const url = window.URL.createObjectURL(blob);
                                                    const a = document.createElement('a');
                                                    a.setAttribute('hidden', '');
                                                    a.setAttribute('href', url);
                                                    a.setAttribute('download', de+'_report.csv');
                                                    document.body.appendChild(a);
                                                    a.click();
                                                    document.body.removeChild(a);
                                                    //function javascript_abort()
                                                    //
                                                    return "Report Generated";
                                                    //process.exit();
                                                    throw new Error('Your report is downloaded succsfully. This is not an error');
                                                }
                                            }
                                        }
                                    });
                                    console.log("EEEEEEE !!!!!!!!!!!");

                                });
                            }
                        } console.log("This should be right target");
                    });
                }
            });
        }).catch(err => {
            console.log('Error getting document', err);
        })
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

export default ReportView;