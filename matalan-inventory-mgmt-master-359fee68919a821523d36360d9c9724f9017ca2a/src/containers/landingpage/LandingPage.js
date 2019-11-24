import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Division from '../../components/divisions/Division';
import Hoc from '../../hoc/ReactAux';

class LandingPage extends Component {

    constructor(props) {
        super();
        this.state = {}
    }

    render() {
        return (
            <Hoc>
                <Header />
                <Division />
            </Hoc>

        );
    }
}

export default LandingPage;