import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import isLoggedIn from '../../helpers/LoggedIn';
import { withRouter } from 'react-router-dom';
import Hoc from '../../hoc/ReactAux';
import LogoutIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import store from 'store';
import "./Header.css";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            store: ''
        }

    }

    componentDidMount = () => {
        this.setState({ ...this.state, auth: isLoggedIn() })
    }

    handleLogoutClick = () => {
        store.remove('loggedIn')
        store.remove('storeid')
        store.remove('storename')
        this.props.history.push('/login')
    }
    render() {
        return (
            <AppBar position="static" color='secondary'>
                <Toolbar>
                    <Typography variant="h6" className="title">
                        MATALAN
                    </Typography>
                    {this.state.auth && (
                        <Hoc>
                            <div>
                            <Typography variant="caption" align="center" className="store">
                                storeid: {store.get('storeid')}
                            </Typography>
                            <br />
                            <Typography variant="caption" align="center" className="store">
                                store: {store.get('storename')}
                            </Typography>
                            </div>
                            <div></div>
                            <IconButton aria-label="logout" onClick={this.handleLogoutClick} >
                                <LogoutIcon className="logout" />
                            </IconButton>
                        </Hoc>
                    )}

                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(Header);