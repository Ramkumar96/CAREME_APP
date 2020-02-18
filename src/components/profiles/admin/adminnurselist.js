import React, { Component } from 'react'
import Admindashleftnav from './admindashleftnav'
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserReg = props => (
    <tr>
        <td>{props.nurselist.FirstName}</td>
        <td>{props.nurselist.LastName}</td>
        <td>{props.nurselist.Email}</td>
        <td>{props.nurselist.nurseID}</td>
        <td>{props.nurselist.Tel}</td>
        <td>{props.nurselist.Location}</td>
        <td>{props.nurselist.nurseExp}</td>
        <td>{props.nurselist.nurseType}</td>
        <td>
            <Link to={"/adminviewnurseprofile/"+props.nurselist._id}>View</Link>
        </td>
    </tr>


)

export default class Adminnurselist extends Component {

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

    Nurses() {
        return this.state.CAREME_APP.map(function( currentlist, i){
            return <UserReg nurselist={currentlist} key={i} />;
        })
    }



    render() {
        return (
          
          <div>
                <div >
                <Admindashleftnav/>
                </div>
                <div className="content-wrapper mt-3">
                  {/* Main content */}
                  <section className="content">
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h3>Details of registered nurses of CareMe</h3>
                          </div>
                          {/* /.card-header */}
                          <div className="card-body">
                          <div className="table-striped">
                            <table id="example2" className="table table-bordered table-hover">
                              <thead className="thead-dark">
                                <tr>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Email</th>
                                  {/* <th>Home</th> */}
                                  <th>NurseID</th>
                                  <th>Telephone</th>
                                  <th>Location</th>
                                  {/* <th>Age</th> */}
                                  <th>Experience</th>
                                  <th>Nurse Type</th>
                                  {/* <th>Gender</th> */}
                                  <th>Profile</th>
                                </tr>
                              </thead>
                              <div className="table-striped"></div>
                              <tbody className="table-striped">
                                      { this.Nurses() }
                                  </tbody>
                            </table>
                            </div>
                          </div>
                          {/* /.card-body */}
                        </div>
                        {/* /.card */}
                      </div>
                      {/* /.col */}
                    </div>
                    {/* /.row */}
                  </section>
                  {/* /.content */}
                </div>
                {/* /.content-wrapper */}
          </div>

        )
    }
}
