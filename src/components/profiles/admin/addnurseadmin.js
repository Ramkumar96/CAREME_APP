import React, { Component } from 'react'
import Admindashleftnav from './admindashleftnav'

export default class Addnurseadmin extends Component {
    render() {
        return (
            <div>
            <div >
                <Admindashleftnav/>
             </div>
            <div className="col-12">
              <section className="content">
  <div className="container-fluid">
    <div className="row">
      {/* left column */}
      <div className="col-md-6">
        {/* general form elements */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Add Nurses Here</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form role="form">
              
            <div className="card-body">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">First Name</label>
                            <input type="text" className="form-control" id="fname" placeholder="Enter First Name" />
                         </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Last Name</label>
                            <input type="text" className="form-control" id="lname" placeholder="Enter Last Name" />
                         </div>
                    </div>
                </div>
            
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Nurse Council Number</label>
                <input type="text" className="form-control" id="NCnumber" placeholder="Nurse Council Number" />
              </div>
              <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">NIC</label>
                            <input type="text" className="form-control" id="nic" placeholder="9#######v" />
                         </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Mobile Number</label>
                            <input type="text" className="form-control" id="mobile" placeholder="07########" />
                         </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">PASSWORD</label>
                            <input type="password" className="form-control" id="pw" placeholder="password" />
                         </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Confirm PASSWORD</label>
                            <input type="password" className="form-control" id="cpw" placeholder="confirm password" />
                         </div>
                    </div>
                </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        {/* /.card */}
        {/* Form Element sizes */}
      
              
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
      {/*/.col (right) */}
    
    
  
</section>
{/* /.content */}

            </div>
            </div>
        )
    }
}
