import React from 'react';
import './Table.css';

function getTypeNameFromID(typeId) {
    if (typeId === 1) {
        return "Figurine";
    } else {
        return "Electronice";
    }
}

function getCategoryNameFromID(categoryId) {
    if (categoryId === 1) {
        return "LEGO";
    } else if (categoryId === 2) {
        return "Papusi";
    } else if (categoryId === 3) {
        return "Masini";
    } else if (categoryId === 4) {
        return "Puzzle";
    } else if (categoryId === 5) {
        return "Exterior";
    }
}

class ListToys extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listOfToys: []
        };

        this.getToys = this.getToys.bind(this);
        
    }

    componentDidMount() {
        this.getToys();
    }

    
    

    getToys() {

        fetch("http://localhost:8080/toy/getAll", {
            method: "GET"
        })
        .then(response => {
            return response.json();

        })
        .then(response => {
            
            this.setState({
                listOfToys: response
            });
            var init = "<tr> <th>ToyID</th> <th>Description</th> <th>Price</th> <th>Type</th> <th>Category</th> </tr>";

            document.getElementById("table").innerHTML = init;
            
            this.state.listOfToys.forEach(toy => {
            
                var tr = document.createElement("tr");

                var toyId = document.createElement("td");
                toyId.innerText = toy.toyID;
                tr.appendChild(toyId);

                var desc = document.createElement("td");
                desc.innerText = toy.description;
                tr.appendChild(desc);

                var price = document.createElement("td");
                price.innerText = toy.price;
                tr.appendChild(price);

                var type = document.createElement("td");
                type.innerText = getTypeNameFromID(toy.typeID);
                tr.appendChild(type);

                var category = document.createElement("td");
                category.innerText = getCategoryNameFromID(toy.categoryID);
                tr.appendChild(category);

                document.getElementById("table").appendChild(tr);
            });
        });
       
    }

    render () {
        return <div className='listToysContainer'>
            <table id="table">
                <tr>
                    <th>ToyID</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Category</th>
                </tr>
                
            </table>
            <button id='refresh' onClick={this.getToys}>Refresh table</button>
        </div>
    }
}

export default ListToys;