import React from 'react';
import './Table.css';

class ListToys extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: []
        };

        this.onChange = this.onChange.bind(this);
        

    }

    onChange() {

    }

    render () {
        return <table id="table">
            <tr>
                <th>ToyID</th>
                <th>Description</th>
                <th>Price</th>
                <th>TypeID</th>
                <th>CategoryID</th>
            </tr>
            
        </table>
    }
}

export default ListToys;