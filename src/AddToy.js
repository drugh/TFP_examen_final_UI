import React from 'react';
import './AddToys.css';
import done from './done.png';
import ListToys from './ListToys';

class AddToy extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        var formData = new FormData(event.target);

        var data = {
            description: formData.get("description"),
            price: parseFloat(formData.get("price")),
            typeID: formData.get("typeID"),
            categoryID: formData.get("categoryID")
        };


        fetch("http://localhost:8080/toy/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json();
        })
        .then(response => {
            if (response.success) {
                this.setState({
                    message: "Toy saved successfully ! "
                });
                <ListToys shouldUpdate='true' />
            } else {
                this.setState({
                    message: "Toy was not saved !"
                });
            }
        })


    }

    render() {
        return <form id='toyForm' onSubmit={this.handleSubmit}>
            <h1>Add new toy</h1>
            <div id='msgContainer'>{this.state.message && <div id="message">{this.state.message}</div>} {this.state.message.includes("success") && <img id='done' src={done} alt='' />}</div>
            <div className='field'>
                <label>Description: </label>
                <input type="text" name="description" id="desc" />
            </div>

            <div className='field'>
                <label>Price: </label>
                <input type="number" name="price" id="price" />
            </div>

            <div className='field'>
                <label>Type ID:</label>
                <input type="number" max={2} min={1} name="typeID" id="typeID" />
            </div>

            <div className='field'>
                <label>Category ID:</label>
                <input type="number" max={5} min={1} name="categoryID" id="categoryID" />
            </div>

            <button id="submit">Trimite</button>
        </form>;

    }

}

export default AddToy;