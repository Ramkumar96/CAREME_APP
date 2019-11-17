import React, { Component } from 'react'

export default class Adminup extends Component {
    render() {
        return (
            <div>
                <section className="content">
  <div className="container-fluid">
    {/* Info boxes */}
    <div className="row">
      <div className="col-12 col-sm-6 col-md-3">
        <div className="info-box">
          <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog" /></span>
          <div className="info-box-content">
            <span className="info-box-text">CPU Traffic</span>
            <span className="info-box-number">
              10
              <small>%</small>
            </span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
      {/* /.col */}
      <div className="col-12 col-sm-6 col-md-3">
        <div className="info-box mb-3">
          <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-thumbs-up" /></span>
          <div className="info-box-content">
            <span className="info-box-text">Likes</span>
            <span className="info-box-number">41,410</span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
      {/* /.col */}
    
    <div className="col-12 col-sm-6 col-md-3">
  <div className="info-box mb-3">
    <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-shopping-cart">
</i>
</span>
    <div class="info-box-content">
                <span class="info-box-text">Sales</span>
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
      <span className="info-box-text">New Members</span>
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
            </div>
        )
    }
}
