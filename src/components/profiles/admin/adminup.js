import React, { Component } from 'react'

export default class Adminup extends Component {
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
                      <span className="info-box-text">Messages</span>
                      <span className="info-box-number">102</span>
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
                      <span className="info-box-number">41,410</span>
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
                          <span class="info-box-number">760</span>
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
                <span className="info-box-number">2,000</span>
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
              <h3 className="card-title">Latest Orders</h3>
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
                <table className="table m-0">
                  <thead>
                    <tr>
                      <th>Nurse ID</th>
                      <th>Nurse Name</th>
                      <th>Status</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><a href="pages/examples/invoice.html">OR9842</a></td>
                      <td>Sumayya Ziyad</td>
                      <td><span className="badge badge-warning">Pending</span></td>
                      <td>
                        <div className="sparkbar" data-color="#00a65a" data-height={20}>4.5</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">OR1848</a></td>
                      <td>Ram Kumar</td>
                      <td><span className="badge badge-warning">Pending</span></td>
                      <td>
                        <div className="sparkbar" data-color="#f39c12" data-height={20}>5.0</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">OR7429</a></td>
                      <td>Lahiruka Wijesinghe</td>
                      <td><span className="badge badge-warning">Pending</span></td>
                      <td>
                        <div className="sparkbar" data-color="#f56954" data-height={20}>3.5</div>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              {/* /.table-responsive */}
            </div>
            {/* /.card-body */}
            <div className="card-footer clearfix">
              <a href="javascript:void(0)" className="btn btn-sm btn-info float-right">View the List</a>
            </div>
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
