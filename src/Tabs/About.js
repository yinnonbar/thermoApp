import React from "react";

export default class About extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            version : "1.36",
            buildDate : new Date(1545077788172)
        }
    }

    render() {
        return <div>
            <h2>About</h2>
            <p>Version: {this.state.version}</p>
            <p>Build Date: {this.state.buildDate.toString()}</p>
        </div>
    }
}