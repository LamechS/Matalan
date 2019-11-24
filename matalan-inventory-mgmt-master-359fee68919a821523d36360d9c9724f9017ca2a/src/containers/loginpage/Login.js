import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Hoc from '../../hoc/ReactAux';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import firebase from '../../firebase/firebase';
import Button from "@material-ui/core/Button";
import logo from '../../img/matalan-logo.png';
import store from 'store';
import isLoggedIn from '../../helpers/LoggedIn';
import './Login.css';

class LoginPage extends Component {
    state = {
        err: ''
    }

    componentDidMount = () => {
        if (isLoggedIn()) {
            if(store.get('storename') === "admindata") {
                this.props.history.push('/reportview')
            } else {
                this.props.history.push('/divisions')
            }
        }
    }


    handleLogin = () => {
        //const user = firebase.firestore().collection('store').doc('318');
        const user = firebase.firestore().collection('store').doc(this.state.email);
        user.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    /*this.setState({ "storeemail": doc.data().user_name })
                    this.setState({ "storepassword": doc.data().password })
                    */
                    store.set('storeemail', this.state.email);
                    this.setState({ "storepassword": doc.data().Password });
                    this.setState({ "storeid": doc.data().StoreId });
                    this.setState({ "storename": doc.data().StoreName });
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            })
            .then(() => {
                if (/*this.state.email === this.state.storeemail && */ this.state.password === this.state.storepassword) {
                    store.set('loggedIn', true);
                    //store.set('storeid', '318');
                    store.set('storeid', this.state.storeid);
                    //store.set('storename', 'Belfast');
                    store.set('storename', this.state.storename);

                    if(this.state.storename === "admindata") {
                        this.props.history.push('/reportview')
                    } else {
                    this.props.history.push('/divisions')
                    }
                } else {
                     this.setState({ err: 'Wrong Credentials' })
                }
            });
    }

    handleChange = key => event => {
        this.setState({ [key]: event.target.value })
        this.setState({ err: '' })
    }

    render() {
        return (
            <Hoc>
                <Header />
                <Grid container justify="center" className="login">
                    <Grid
                        item
                        xs={11}
                        sm={6}
                        md={4}>
                        <div style={{ textAlign: "center" }}>
                            <img
                                title="Matalan"
                                alt="Matalan"
                                src={logo}
                                className="loginlogo"
                            />
                        </div>
                        <Typography variant="h5" align="center" className="signin">
                            Sign in
                        </Typography>
                        <form noValidate autoComplete="off" className='login' >
                            <TextField
                                id="email"
                                label="Email"
                                margin="normal"
                                onChange={this.handleChange('email')}
                                value={this.state.email || ''}
                                required
                                fullWidth
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                margin="normal"
                                onChange={this.handleChange('password')}
                                value={this.state.password || ''}
                                required
                                fullWidth
                            />
                            <br />
                            <Typography variant="caption" align="center" color="secondary">
                                {this.state.err}
                            </Typography>
                            <br />
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={this.handleLogin}
                            >
                                Log In
                        </Button>
                            <br />
                            <br />
                        </form>
                    </Grid>
                </Grid>
                <br />
            </Hoc>
        );
    }
}
export default LoginPage;