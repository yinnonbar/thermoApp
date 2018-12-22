import React from 'react';

export default class Thermostat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: "Auto",
            temperature: 0,
            heaterStatus: "On"
        };
        this._isMounted = false;
        this.handleModeChange = this.handleModeChange.bind(this);
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.timer)
        this.timer = null;
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getMode();
        this._isMounted && this.getTemperature();
        this._isMounted && this.getHeaterStatus();
        this.timer = setInterval(()=> this.pollData(), 5000);
    }
    pollData() {
        this.getHeaterStatus();
        this.getTemperature();
    }

    getMode() {
        fetch('http://localhost:3001/thermostat/getMode')
            .then(response => response.text())
            .then(data => {
                this.setState({mode: data})
            }).catch(error => this.setState({mode : "Auto"}))
    }

    getHeaterStatus() {
        fetch('http://localhost:3001/thermostat/getHeaterStatus')
            .then(response => response.text())
            .then(data => {
                this.setState({heaterStatus: data})
            }).catch(error => this.setState({heaterStatus : "N/A"}))
    }

    getTemperature() {
        fetch('http://localhost:3001/thermostat/getTemperature')
            .then(response => response.text())
            .then(data => {
                this.setState({temperature: data})
            }).catch(error => this.setState({temperature : "N/A"}))
    }

    handleModeChange(event) {
        this.setState({mode: event.target.value});
    }

    render() {
        return <div>
            <h2>Thermostat</h2>
            <label>
                Mode:
                <select value={this.state.mode} onChange={this.handleModeChange}>
                    <option value="Auto">Auto</option>
                    <option value="On">On</option>
                    <option value="Off">Off</option>
                </select>
            </label>
            <br/>
            <p>Current Temperature: {this.state.temperature} degrees Celsius</p>
            <p>Heater status: {this.state.heaterStatus}</p>
        </div>;
    }
}