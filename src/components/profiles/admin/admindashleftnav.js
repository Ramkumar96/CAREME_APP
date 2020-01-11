import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Addnurseadmin from './addnurseadmin'
import addclientadmin from './addclientadmin'
import Adminnurselist from './adminnurselist'
import Adminclientlist from './adminclientlist'


class Admindashleftnav extends Component {
    render() {
        return (
  <div>
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="/images/careme.png" alt="careme Logo" className="brand-image img-circle elevation-5" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">CAREme</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a href="#" className="d-block">Admin</a>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item has-treeview">
          <a href="#" className="nav-link active">
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
              <a href="./index2.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Update Nurse</p>
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
          <a href="#" className="nav-link">
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
              <a href="./index2.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Update Client</p>
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
        
       
        
        
        <li className="nav-header">EXAMPLES</li>
        <li className="nav-item">
          <a href="pages/calendar.html" className="nav-link">
            <i className="nav-icon fas fa-calendar-alt" />
            <p>
              Calendar
              <span className="badge badge-info right">2</span>
            </p>
          </a>
        </li>
        <li className="nav-item has-treeview">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-envelope" />
            <p>
              Mailbox
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/mailbox/mailbox.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Inbox</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/mailbox/compose.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Compose</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/mailbox/read-mail.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Read</p>
              </a>
            </li>
          </ul>
        </li>
        
        
        <li className="nav-header">Documents</li>
        <li className="nav-item">
          <a href="https://adminlte.io/docs/3.0" className="nav-link">
            <i className="nav-icon fas fa-file" />
            <p>Company Policy</p>
          </a>
        </li>
        <li className="nav-header">Reports</li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-circle nav-icon" />
            <p>Monthly Income</p>
          </a>
        </li>
        
        <li className="nav-item">
          <a href="/userReports" className="nav-link">
            <i className="fas fa-circle nav-icon" />
            <p>User Details</p>
          </a>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-circle nav-icon" />
            <p>Complaint Report</p>
          </a>
        </li>

        <li className="nav-header">Information</li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-circle text-danger" />
            <p className="text">Company Details</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-circle text-warning" />
            <p>Service Details</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-circle text-info" />
            <p>Technical Assistance</p>
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
