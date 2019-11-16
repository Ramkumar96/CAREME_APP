import React, { Component } from "react";
import "./FeaturesBanner.css";

class FeaturesBanner extends Component {
  render() {
    return (
      <div>
        {/* Skills Banner */}
        <div class="container-fluid">
          <div class="row skillsback">
            {/* Left Container */}
            <div className="col-sm-6 col-md-6">
              
            </div>

            {/* Right container with skill category */}
            <div className="col-sm-3 col-md-3">
              <div className="wow fadeInRight" data-wow-delay="0.1s">
                <div className="service-box">
                  <div className="service-icon">
                    <span className="fa fa-stethoscope fa-3x" />
                  </div>
                  <div className="service-desc">
                    <h5 className="h-light">Find Your Nurse</h5>
                    <p>Find a number of nurses who fit your necessities</p>
                  </div>
                </div>
              </div>
              <div className="wow fadeInRight" data-wow-delay="0.2s">
                <div className="service-box">
                  <div className="service-icon">
                    <span className="fa fa-wheelchair fa-3x" />
                  </div>
                  <div className="service-desc">
                    <h5 className="h-light">Check their reliability</h5>
                    <p>Analyse your choices based on what others had to say about their service</p>
                  </div>
                </div>
              </div>
              <div className="wow fadeInRight" data-wow-delay="0.3s">
                <div className="service-box">
                  <div className="service-icon">
                    <span className="fa fa-plus-square fa-3x" />
                  </div>
                  <div className="service-desc">
                    <h5 className="h-light">Talk to them</h5>
                    <p>Talk to them and see whether they're your real match</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-md-3">
              <div className="wow fadeInRight" data-wow-delay="0.1s">
                <div className="service-box">
                  <div className="service-icon">
                    <span className="fa fa-h-square fa-3x" />
                  </div>
                  <div className="service-desc">
                    <h5 className="h-light">Support the others</h5>
                    <p>Help the others by rating your experience with the nurse you hired</p>
                  </div>
                </div>
              </div>
              <div className="wow fadeInRight" data-wow-delay="0.2s">
                <div className="service-box">
                  <div className="service-icon">
                    <span className="fa fa-filter fa-3x" />
                  </div>
                  <div className="service-desc">
                    <h5 className="h-light">Tell us if you need to</h5>
                    <p>Contact us directly if you have anything to report about</p>
                  </div>
                </div>
              </div>
              <div className="wow fadeInRight" data-wow-delay="0.3s">
                <div className="service-box">
                  <div className="service-icon">
                    <span className="fa fa-user-md fa-3x" />
                  </div>
                  <div className="service-desc">
                    <h5 className="h-light">Don't suit your needs?</h5>
                    <p>Tell us how we can improve. We aim to improve your lifestyle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          < div class="container" >
            <div class="row">
              <div class="col-md-4 text-center my-3">

                <h6 class="text-uppercase my-3 service-title">User Friendly</h6>
                <p class="w-75 mx-auto text-left service-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem quia expedita necessitatibus, tempore
                  veritatis quod praesentium laboriosam nesciunt placeat.
                                </p>
              </div>

              <div class="col-md-4 text-center my-3">

                <h6 class="text-uppercase my-3 service-title">Cost Effective</h6>
                <p class="w-75 mx-auto text-left service-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem quia expedita necessitatibus, tempore
                  veritatis quod praesentium laboriosam nesciunt placeat.
                                </p>
              </div>

              <div class="col-md-4 text-center my-3">
                <h6 class="text-uppercase my-3 service-title">Easy Accessible</h6>
                <p class="w-75 mx-auto text-left service-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem quia expedita necessitatibus, tempore
                  veritatis quod praesentium laboriosam nesciunt placeat.
                          </p>
              </div>
            </div>


            <div class="row">
              <div class="col-md-4 text-center my-3">

                <h6 class="text-uppercase my-3 service-title">Boring</h6>
                <p class="w-75 mx-auto text-left service-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem quia expedita necessitatibus, tempore
                  veritatis quod praesentium laboriosam nesciunt placeat.
                              </p>
              </div>

              <div class="col-md-4 text-center my-3">

                <h6 class="text-uppercase my-3 service-title">Time waste</h6>
                <p class="w-75 mx-auto text-left service-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem quia expedita necessitatibus, tempore
                  veritatis quod praesentium laboriosam nesciunt placeat.
                              </p>
              </div>

              <div class="col-md-4 text-center my-3">

                <h6 class="text-uppercase my-3 service-title">Useless</h6>
                <p class="w-75 mx-auto text-left service-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem quia expedita necessitatibus, tempore
                  veritatis quod praesentium laboriosam nesciunt placeat.
                              </p>
              </div>
            </div>
          </div >
        </div >
      </div >
    );
  }
}

export default FeaturesBanner;