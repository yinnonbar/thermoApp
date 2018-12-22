import React from "react";

export default class Environment extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            sensor1 : {temperature: 0, humidity : 0},
            sensor2 : {temperature: 0, humidity : 0}
        }
        this._isMounted = false;
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.timer)
        this.timer = null;
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.pollData();
        this.timer = setInterval(()=> this.pollData(), 5000);
    }
    pollData() {
        this.getSensorData(1);
        this.getSensorData(2);
    }

    getSensorData(sensorNum){
        fetch('http://localhost:3001/environment/getSensorData?sensorNum=' + sensorNum)
            .then(response => response.json())
            .then(data => {
                if(sensorNum === 1){
                    this.setState({sensor1 : data})
                }else {
                    this.setState({sensor2 : data})
                }
            }).catch(error => {
                if (sensorNum === 1){
                    this.setState({sensor1temperature : JSON.stringify({ temperature: "N/A",  humidity: "N/A"})});
                }else{
                    this.setState({sensor2temperature : JSON.stringify({ temperature: "N/A",  humidity: "N/A"})});
                }
        })
    }

    render() {
        return <div>
            <h2>Environment</h2>
            <h3>Sensor 1</h3>
            <table>
                <tbody>
                <tr>
                    <td>Temperature</td>
                    <td>{this.state.sensor1.temperature} degrees</td>
                </tr>
                <tr>
                    <td>Humidity</td>
                    <td>{this.state.sensor1.humidity}%</td>
                </tr>
                </tbody>
            </table>
            <h3>Sensor 2</h3>
            <table>
                <tbody>
                <tr>
                    <td>Temperature</td>
                    <td>{this.state.sensor2.temperature} degrees</td>
                </tr>
                <tr>
                    <td>Humidity</td>
                    <td>{this.state.sensor2.humidity}%</td>
                </tr>
                </tbody>
            </table>
        </div>;
    }
}