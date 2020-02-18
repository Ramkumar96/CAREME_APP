import React, { Component } from 'react'
import Admindashleftnav from './admindashleftnav'
import { Link } from 'react-router-dom';
import axios from 'axios';


const UserReg = props => (
    <tr>
        <td>{props.clientlist.FirstName}</td>
        <td>{props.clientlist.LastName}</td>
        <td>{props.clientlist.Email}</td>
        <td>{props.clientlist.Home}</td>
        <td>{props.clientlist.Tel}</td>
        <td>{props.clientlist.Location}</td>
     
        <td>
            <Link to={"/adminviewclientprofile/"+props.clientlist._id}>View</Link>
        </td>
    </tr>
)

export default class Adminclientlist extends Component {

    constructor(props) {
        super(props);
        this.state = {CAREME_APP: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/User/clientlist')
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
                        <h3>Details of registered Clients of CAREME</h3>
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
                              <th>Home</th>
                              <th>Tel</th>
                              <th>Location</th>
                              <th>Profile</th>
                            </tr>
                          </thead>
                          <div className="table-striped"></div>
                          <tbody className="table-striped">
                                  { this.Clients() }
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
