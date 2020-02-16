import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

class Admindashleftnav extends Component {
  render() {
    return (
      <div className="position:fixed">
        <aside className="main-sidebar sidebar-dark-primary elevation-4 ">  
            {/* <a href="/adminmaindash" className="brand-link">
            <img src="/images/careme.png" alt="careme Logo" className="brand-image img-circle elevation-5" style={{ opacity: '.8' }} />
            <span className="brand-text font-weight-light">CareMe</span>
          </a> */}
          {/* Sidebar */}
          <div className="sidebar pt-10">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
              </div>
              <div className="info">
                <a href="/adminmaindash" className="d-block"><b>Admin</b></a>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}
                <li className="nav-item has-treeview">
                  <a className="nav-link active">
                    <i className="fa fa-user-md" />
                    <p>
                      Nurse
                    <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/addnurseadmin" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Add Nurse</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/nurselistadmin" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>View Nurse Lists</p>
                      </a>
                    </li>
                  </ul>
                </li>


                <li className="nav-item has-treeview">
                  <a className="nav-link active">
                    <i className="fas fa-users" />
                    <p>
                      Clients
              <i className="right fas fa-angle-left" />

                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/addclientadmin" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Add Client</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/clientlistadmin" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>View Client Lists</p>
                      </a>
                    </li>
                  </ul>
                </li>    
        
        <li className="nav-header">Reports</li> 
        <li className="nav-item">
          <a href="totalUserReport" className="nav-link">
            <i className="fas fa-circle nav-icon" />
            <p>Total Users</p>
          </a>
        </li>

        <li className="nav-item">
          <a href="userReport" className="nav-link">
            <i className="fas fa-circle nav-icon" />
            <p>System Reports</p>
          </a>
        </li>

                <li className="nav-item">
                  <a href="complaintsReview" className="nav-link">
                    <i className="fas fa-circle nav-icon" />
                    <p>Complaint Report</p>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>





      </div>



    )
  }
}

export default Admindashleftnav;
