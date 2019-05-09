import React, {Component} from 'react';

import './Welcome.css';
import Navbar from '../Common/Navbar'
import Footer from '../Common/Footer'

class Welcome extends Component {
    render() {
        return <React.Fragment>
            <header className="intro">
                <h2>Welcome to datalink</h2>
                <Navbar/>
                <Footer/>
            </header>
        </React.Fragment>;
    }
}

export default Welcome;
