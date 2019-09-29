import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const NurseReg = props => (
    <tr>
        <td>{props.nurselist.nurseFirstName}</td>
        <td>{props.nurselist.nurseLastName}</td>
        <td>{props.nurselist.nurseID}</td>
        <td>{props.nurselist.nurseEmail}</td>
        <td>{props.nurselist.nurseHome}</td>
        <td>{props.nurselist.nurseTel}</td>
        
        <td>
            <Link to={"/edit/"+props.nurselist._id}>Edit</Link>
        </td>
    </tr>
)

export default class NurseList extends Component {

    constructor(props) {
        super(props);
        this.state = {CAREME_APP: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/nurseReg/')
            .then(response => {
                this.setState({ CAREME_APP: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    Nurses() {
        return this.state.CAREME_APP.map(function( currentlist, i){
            return <NurseReg nurselist={currentlist} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Nurse List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Nurse Registration No</th>
                            <th>Email</th>
                            <th>Home</th>
                            <th>Telephone</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.Nurses() }
                    </tbody>
                </table>
            </div>
        )
    }
}