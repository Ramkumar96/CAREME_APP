import React, { Component } from 'react'
import axios from '../../../../backend/node_modules/axios';
import {  VictoryPie } from 'victory';

export default class Adminup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visibleUserCount : true,
    }
}

componentDidMount(){
      //total number of nurses in the system
      axios.get('http://localhost:4000/user/countNurses')
      .then(response => {
          this.setState({
              totalActiveNurses : response.data.nurseCount
          })

          console.log("The total active nurses now : ", this.state.totalActiveNurses)
      })

    //total number of clients in the system
    axios.get('http://localhost:4000/user/countClients')
      .then(response => {
          this.setState({
              totalActiveClients : response.data.clientCount
          })

          console.log("The total active clients now : ", this.state.totalActiveClients)
      })

    //total number of requests unattended to in the system
    axios.get('http://localhost:4000/request/countRequests')
    .then(response => {
        this.setState({
            requestCount : response.data.requestCount
        })

        console.log(this.state.requestCount)
    })

    //total number of complaints in the system
    axios.get('http://localhost:4000/complaint/countComplaints')
    .then(response => {
        this.setState({
            complaintCount : response.data.complaintCount,
            visibleUserCount: true
        })

        console.log(this.state.complaintCount)
    })
}
    render() {
      return (
        <div>
          
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0 text-dark">Admin Dashboard</h1>
                  </div>{/* /.col */}
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="#">Home</a></li>
                      <li className="breadcrumb-item active">Admin Dashboard</li>
                      
                    </ol>
                  </div>{/* /.col */}
                </div>{/* /.row */}
              </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            
            <section className="content">
            <div className="container-fluid">
              {/* Info boxes */}
              <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box">
                    <span className="info-box-icon bg-info elevation-1"><i class="far fa-envelope" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">Requests</span>
                      <span className="info-box-number">{this.state.requestCount}</span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-danger elevation-1"><i className="fa fa-exclamation-triangle" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">Complaints</span>
                      <span className="info-box-number">{this.state.complaintCount}</span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
              
              <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box mb-3">
              <span className="info-box-icon bg-warning elevation-1"><i className="fa fa-user-md">
          </i>
          </span>
              <div class="info-box-content">
                          <span class="info-box-text">Nurses</span>
                          <span class="info-box-number">{this.state.totalActiveNurses}</span>
                        </div>
              {/* /.info-box-content */}
            </div>
            {/* /.info-box */}
          </div>
          {/* /.col */}

          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box mb-3">
              <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users" /></span>
              <div className="info-box-content">
                <span className="info-box-text">Clients</span>
                <span className="info-box-number">{this.state.totalActiveClients}</span>
              </div>
              {/* /.info-box-content */}
            </div>
            {/* /.info-box */}
          </div>
          {/* /.col */}
              </div>
            </div>
        </section>

    <div>
      <div class="row">
        <div class="col-md-12">
         {/* TABLE: LATEST ORDERS */}
          <div className="card">
            <div className="card-header border-transparent">
              <h3 className="card-title">Latest User Statistics</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body p-0">
              <div className="table-responsive">
                  <VictoryPie 
                      radius = {30}
                      colorScale = {["blue", "silver"]}
                      innerRadius = {15}
                      outerRadius = {30}
                      height = {100}
                      data = {[
                          {x: "Nurses\n"+this.state.totalActiveNurses, y:this.state.totalActiveNurses},
                          {x: "Clients\n"+this.state.totalActiveClients, y:this.state.totalActiveClients}
                      ]}
                      style={{ labels: { fontSize: 7}}}
                  />       
              </div>
              {/* /.table-responsive */}
            </div>
            {/* /.card-body */}
            {/* /.card-footer */}
          </div>
          {/* /.card */}
          </div>
          </div>
        </div>
        </div>
        </div>
        )
    }
}
