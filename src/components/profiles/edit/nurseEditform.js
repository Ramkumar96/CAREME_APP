import React, { Component } from 'react';
import NurseMainPage from '../nurse/NurseMainPage'
import { Button, Form, Col } from 'react-bootstrap';
import axios from 'axios';


class nurseEditform extends Component {

  constructor(props) {
    super(props);

    this.onChangeNurseLocation = this.onChangeNurseLocation.bind(this);
    this.onChangeNurseUni      = this.onChangeNurseUni.bind(this);
    this.onChangeNurseExp     = this.onChangeNurseExp.bind(this);
    this.onChangeNurseSkill      = this.onChangeNurseSkill.bind(this);
    this.onSubmitNurse = this.onSubmitNurse.bind(this);



    this.state = {
        NurseLocation: '',
        NurseUni: '',
        NurseExp: '',
        NurseSkill: ''
    }
}

/*componentDidMount() {
  axios.get('http://localhost:4000/nurse_edit/'+this.props.match.params.id)
      .then(response => {
          this.setState({ 
        NurseLocation: response.data.NurseLocation,
        NurseUni: response.data.NurseUni,
        NurseExp: response.data.NurseExp,
        NurseSkill: response.data.NurseSkill });

        
      })
      .catch(function (error) {
          console.log(error);
      })
}
*/



onChangeNurseLocation(e){
  this.setState({
      NurseLocation : e.target.value
  });
}

onChangeNurseUni(e){
  this.setState({
      NurseUni : e.target.value
  });
}

onChangeNurseExp(e){
  this.setState({
      NurseExp : e.target.value
  });
}

onChangeNurseSkill(e){
  this.setState({
      NurseSkill : e.target.value
  });
}

onSubmitNurse(e) {
  e.preventDefault();
  const obj = {
    NurseLocation: this.state.NurseLocation,
    NurseUni: this.state.NurseUni,
    NurseExp: this.state.NurseExp,
    NurseSkill: this.state.NurseSkill
  };

  axios.post('http://localhost:4000/nurse_edit'+this.props.match.params.id, obj)
  .then(res => console.log(res.data));

this.props.history.push('/index');
}

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
              <li className="breadcrumb-item"><a href="/nurseprofile">Profile</a></li>
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
      <div className="col-md-9">
        {/* general form elements */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">General Information</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form className="form-margin">
            <div className="card-body">
            <div className="form-group">
                    <label>Select Your Location</label>
                    <select title="location" className="form-control" value={this.state.NurseLocation} onChange={this.onChangeNurseLocation}>
                      <option value="Colombo">Colombo</option>
                      <option value="Gampaha">Gampaha</option>
                      <option value="Kaluthara">Kaluthara</option>
                      <option value="Kandy">Kandy</option>
                      <option value="Galle">Galle</option>
                      <option value="Mathara">Mathara</option>
                      <option value="Kurunegala">Kurunegala</option>
                    </select>
                  </div>
              <div className="form-group">
                <label>Studied At</label>
                <input type="text" title="University name" class="form-control" id="uni" value={this.state.NurseUni} onChange={this.onChangeNurseUni} placeholder="University of ######" />
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
                    <select className="form-control" value={this.state.NurseExp} onChange={this.onChangeNurseExp}>
                      <option value="1-2">1-2 Years</option>
                      <option value="3-4">3-4 Year</option>
                      <option value="5-10">5-10 Year</option>
                      <option value="10+">Over 10+ Years</option>
                    </select>
                  </div>

            <form role="form">
                <label>Skill Category</label>
              <div className="row" value={this.state.NurseSkill} onChange={this.onChangeNurseSkill}>
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
              <button type="submit" className="btn btn-primary"  onClick={this.onSubmitNurse.bind(this)}>Submit</button>
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





        );
    }
}

export default nurseEditform;