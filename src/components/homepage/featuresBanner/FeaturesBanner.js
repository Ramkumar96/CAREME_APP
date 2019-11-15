import React, { Component } from "react";
import "./FeaturesBanner.css";

class FeaturesBanner extends Component{
    render(){
        return(
          <div>
            {/* Section: services */}
              <section id="service" className="home-section nopadding paddingtop-60">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6 col-md-6">
                      <div className="wow fadeInUp" data-wow-delay="0.2s">
                        <img src="img/dummy/img-1.jpg" className="img-responsive" alt />
                      </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                      <div className="wow fadeInRight" data-wow-delay="0.1s">
                        <div className="service-box">
                          <div className="service-icon">
                            <span className="fa fa-stethoscope fa-3x" />
                          </div>
                          <div className="service-desc">
                            <h5 className="h-light">Medical checkup</h5>
                            <p>Vestibulum tincidunt enim in pharetra malesuada.</p>
                          </div>
                        </div>
                      </div>
                      <div className="wow fadeInRight" data-wow-delay="0.2s">
                        <div className="service-box">
                          <div className="service-icon">
                            <span className="fa fa-wheelchair fa-3x" />
                          </div>
                          <div className="service-desc">
                            <h5 className="h-light">Nursing Services</h5>
                            <p>Vestibulum tincidunt enim in pharetra malesuada.</p>
                          </div>
                        </div>
                      </div>
                      <div className="wow fadeInRight" data-wow-delay="0.3s">
                        <div className="service-box">
                          <div className="service-icon">
                            <span className="fa fa-plus-square fa-3x" />
                          </div>
                          <div className="service-desc">
                            <h5 className="h-light">Pharmacy</h5>
                            <p>Vestibulum tincidunt enim in pharetra malesuada.</p>
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
                            <h5 className="h-light">Gyn Care</h5>
                            <p>Vestibulum tincidunt enim in pharetra malesuada.</p>
                          </div>
                        </div>
                      </div>
                      <div className="wow fadeInRight" data-wow-delay="0.2s">
                        <div className="service-box">
                          <div className="service-icon">
                            <span className="fa fa-filter fa-3x" />
                          </div>
                          <div className="service-desc">
                            <h5 className="h-light">Neurology</h5>
                            <p>Vestibulum tincidunt enim in pharetra malesuada.</p>
                          </div>
                        </div>
                      </div>
                      <div className="wow fadeInRight" data-wow-delay="0.3s">
                        <div className="service-box">
                          <div className="service-icon">
                            <span className="fa fa-user-md fa-3x" />
                          </div>
                          <div className="service-desc">
                            <h5 className="h-light">Sleep Center</h5>
                            <p>Vestibulum tincidunt enim in pharetra malesuada.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* /Section: services */}

              <div class="container">
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
              </div>
            </div> 
       );
    }
}

export default FeaturesBanner;