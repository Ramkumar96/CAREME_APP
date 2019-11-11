import React, { Component } from 'react';






class nurseEditform extends Component {
    render() {
        return (
      <div>
  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Edit Your Profile</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">General Form</li>
            </ol>
          </div>
        </div>
      </div>{/* /.container-fluid */}
    </section>

    <section className="content">
  <div className="container-fluid">
    <div className="row">
      {/* left column */}
      <div className="col-md-6">
        {/* general form elements */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">General Information</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form role="form">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Studied At</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="University of Colombo" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputFile">Update your Profile Picture</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="exampleInputFile" />
                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                  </div>
                  <div className="input-group-append">
                    <span className="input-group-text" id>Upload</span>
                  </div>
                </div>

                <div className="form-group">
                    <label>Carrier Experience</label>
                    <select multiple className="form-control">
                      <option>1-2 Years</option>
                      <option>3-4 Year</option>
                      <option>5-10 Year</option>
                      <option>Over 10+ Years</option>
                    </select>
                  </div>


          


            <form role="form">
                <label>Skill Category</label>
              <div className="row">
                <div className="col-sm-6">
                  {/* checkbox */}
                  <div className="form-group">
                  <div className="custom-control custom-radio">
                      <input className="custom-control-input" type="radio" id="customRadio1" name="customRadio" />
                      <label htmlFor="customRadio1" className="custom-control-label">Emergency Nurse</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input className="custom-control-input" type="radio" id="customRadio2" name="customRadio" defaultChecked />
                      <label htmlFor="customRadio2" className="custom-control-label">Surgical Nurse</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input className="custom-control-input" type="radio" id="customRadio3" name="customRadio" defaultChecked />
                      <label htmlFor="customRadio3" className="custom-control-label">Geriatric Nurse</label>
                    </div>
                  </div>
                </div> 
                <div className="col-sm-6">
                  {/* radio */}
                  <div className="custom-control custom-radio">
                      <input className="custom-control-input" type="radio" id="customRadio4" name="customRadio" />
                      <label htmlFor="customRadio4" className="custom-control-label">Midwife Nurse</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input className="custom-control-input" type="radio" id="customRadio5" name="customRadio" defaultChecked />
                      <label htmlFor="customRadio5" className="custom-control-label">perdiactric Nurse</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input className="custom-control-input" type="radio" id="customRadio6" name="customRadio" defaultChecked />
                      <label htmlFor="customRadio6" className="custom-control-label">Mental Health Nurse</label>
                    </div>
                  </div>
                </div>
              
              </form>

              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        </div>
        </div>
        </div>
</section>
{/* /.content */}


  </div>
</div>





        )
    }
}

export default nurseEditform;
