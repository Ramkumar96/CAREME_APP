import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const UserReg = props => (
    <tr>
        <td>{props.clientlist.clientFirstName}</td>
        <td>{props.clientlist.clientLastName}</td>
        <td>{props.clientlist.clientEmail}</td>
        <td>{props.clientlist.clientHome}</td>
        <td>{props.clientlist.clientTel}</td>
        
        <td>
            <Link to={"/edit/"+props.clientlist._id}>Edit</Link>
        </td>
    </tr>
)

export default class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {CAREME_APP: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/User/')
            .then(response => {
                this.setState({ CAREME_APP: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    Clients() {
        return this.state.CAREME_APP.map(function( currentlist, i){
            return <UserReg clientlist={currentlist} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Client List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Home</th>
                            <th>Telephone</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.Clients() }
                    </tbody>
                </table>
            </div>
        )
    }
}