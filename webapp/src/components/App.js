import React, {PureComponent} from 'react';
//import Navbar from './Common/Navbar'
//import Footer from './Common/Footer'

class App extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            me: props.me
        }
    }

    render() {
        console.log('App render', this.state.me);
        return (
            <React.Fragment>
                <div className="page" data-spy="scroll" data-target="#navbar" data-offset="0">
                    {this.props.children}
                </div>
                
            </React.Fragment>
        );
    }
}

export default App;