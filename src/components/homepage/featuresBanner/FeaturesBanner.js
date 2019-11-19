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
              <div className="wow fadeInRight" data-wow-delay="0.1s" style={{marginTop:'4em'}}>
                <div className="service-box">
                  <div className="service-icon">
                    <span className="fa fa-search fa-3x" />
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
                    <span className="fa fa-star fa-3x" />
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
                    <span className="fa fa-envelope fa-3x" />
                  </div>
                  <div className="service-desc">
                    <h5 className="h-light">Talk to them</h5>
                    <p>Talk to them and see whether they're your real match</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-md-3">
              <div className="wow fadeInRight" data-wow-delay="0.1s" style={{marginTop:'4em'}}>
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
                    <span className="fa fa-info-circle fa-3x" />
                  </div>
                  <div className="service-desc">
                    <h5 className="h-light">Report to us</h5>
                    <p>Contact us directly if you have anything to report about</p>
                  </div>
                </div>
              </div>
              <div className="wow fadeInRight" data-wow-delay="0.3s">
                <div className="service-box">
                  <div className="service-icon">
                    <span className="fa fa-question fa-3x" />
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

                <h6 class="text-uppercase my-3 service-title">Pediatric Nurse</h6>
                <p class="w-75 mx-auto service-text">
                  Pediatric nursing is the medical care of neonates and children up to adolescence, usually in an in-patient hospital or day-clinic. Pediatrics comes from the Greek words 'paedia' which means child, 'iatrike' which means physician.
                </p>
              </div>

              <div class="col-md-4 text-center my-3">

                <h6 class="text-uppercase my-3 service-title">Geriatric Nurse</h6>
                <p class="w-75 mx-auto service-text">
                  A Geriatric Nurse assists doctors in taking care of the mental and physical health of older patients who are at greater risk of injuries and diseases. You’ll perform check-ups, administer medication, and help with pain management and rehabilitation.
                </p>
              </div>

              <div class="col-md-4 text-center my-3">
                <h6 class="text-uppercase my-3 service-title">Midwife</h6>
                <p class="w-75 mx-auto service-text">
                A midwife is a trained health professional who helps healthy women during labor, delivery, and after the birth of their babies. Midwives may deliver babies at birthing centers or at home, but most can also deliver babies at a hospital.
                </p>
              </div>
            </div>


            <div class="row">
              <div class="col-md-4 text-center my-3">

                <h6 class="text-uppercase my-3 service-title">Emergency Nurse</h6>
                <p class="w-75 mx-auto service-text">
                  Emergency nursing is a specialty focusing on the care of patients who require prompt medical attention to avoid long-term disability or death. Emergency nurses increasingly care for people who are unwilling or unable to get primary medical care.
                </p>
              </div>

              <div class="col-md-4 text-center my-3">

                <h6 class="text-uppercase my-3 service-title">Surgical Nurse</h6>
                <p class="w-75 mx-auto service-text">
                  A surgical nurse, also referred to as a theatre nurse or scrub nurse, specializes in preoperative care, providing care to patients before, during and after surgery. To become a theatre nurse, Registered Nurses or Enrolled Nurses must complete extra training.
                </p>
              </div>

              <div class="col-md-4 text-center my-3">

                <h6 class="text-uppercase my-3 service-title">Mental Health Nurse</h6>
                <p class="w-75 mx-auto service-text">
                  Mental health nurses are responsible for planning and providing support and medical and nursing care to people who have a range of mental health issues. Mental health nurses support issues ranging from anxiety and depression to personality and eating disorders.
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