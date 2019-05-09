import React, {Component} from 'react';
import {connect} from 'react-redux';
import History from "../../history";
import Navbar from '../Common/Navbar'
import Footer from '../Common/Footer'


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        if (!this.props.authenticated)
            History.push('/signin');
    }

    static renderHello(user) {
        if (user) {
            return <p>Hello <strong> {user} </strong>, you logged in!</p>
        }
    }

    render() {
        return <React.Fragment>
        <Navbar/>
            <section>
                <h1>Home</h1>
                {this.props.me && Home.renderHello(this.props.me.name)}
                <p>This is a static page and you must be logged in to see the page.</p>
            </section>
                <Footer/>
        </React.Fragment>;
    }
}

const mapStateToProps = (state) => {
    return {authenticated: state.auth.authenticated, me: state.auth.me}
};

export default connect(mapStateToProps)(Home);
