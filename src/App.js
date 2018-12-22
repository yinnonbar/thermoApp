import React, {Component} from 'react';
import './App.css';
import Thermostat from "./Tabs/Thermostat"
import Environment from "./Tabs/Environment";
import About from "./Tabs/About";
import * as ReactDOM from "react-dom";

const ABOUT = "about";
const ENVIRONMENT = "environment";
const THERMOSTAT = "thermostat";
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className='Menu'>
                    {/*<div className={['pure-menu custom-restricted-width', 'Menu'].join(' ')}>*/}
                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><p onClick={this.renderTab.bind(this, THERMOSTAT)}
                                                              className="pure-menu-link">Thermostat</p></li>
                            <li className="pure-menu-item"><p onClick={this.renderTab.bind(this, ENVIRONMENT)}
                                                              className="pure-menu-link">Environment</p></li>
                            <li className="pure-menu-item"><p onClick={this.renderTab.bind(this, ABOUT)}
                                                              className="pure-menu-link">About</p></li>
                        </ul>
                    </div>
                    <span className="Tab" id="tabToShow"/>
                </header>
            </div>
        );
    }

    renderTab(tab) {


        switch (tab) {
            case THERMOSTAT:
                ReactDOM.render(<Thermostat/>, document.getElementById('tabToShow'))
                break;
            case ENVIRONMENT:
                ReactDOM.render(<Environment/>, document.getElementById('tabToShow'))
                break;
            case ABOUT:
                ReactDOM.render(<About/>, document.getElementById('tabToShow'))
                break;
            default:
                console.log("error");
                break;
        }
    }
}

export default App;
