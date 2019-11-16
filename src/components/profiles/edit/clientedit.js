import React, { Component } from 'react'

class ClientEdit extends Component {
    render() {
        return (
            <div>


                <form role="form">
                    <div className="card-body">
                        {/* Edit Email Address */}
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                        </div>

                        {/* Edit Telephone Number */}
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Telephone</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                        </div>

                        {/* Edit Location */} 
                        <div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Address</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="Apartment Number" />
                            </div>
                            <div className="form-group">            
                                <input type="text" className="form-control" id="inputAddress2" placeholder="Street Name" />
                            </div>
                            <div className="form-group"> 
                                    <select id="inputState" className="form-control">
                                        <option selected>Ampara</option>
                                        <option selected>Anuradhapura</option>
                                        <option selected>Badulla</option>
                                        <option selected>Batticaloa</option>
                                        <option selected>Colombo</option>
                                        <option selected>Galle</option>
                                        <option selected>Gampaha</option>
                                        <option selected>Hambantota</option>
                                        <option selected>Jaffna</option>
                                        <option selected>Kalutara</option>
                                        <option selected>Kandy</option>
                                        <option selected>Kegalle</option>
                                        <option selected>Kilinochchi</option>
                                        <option selected>Kurunegala</option>
                                        <option selected>Mannar</option>
                                        <option selected>Matale</option>
                                        <option selected>Matara</option>
                                        <option selected>Monaragala</option>
                                        <option selected>Mullaitivu</option>
                                        <option selected>Nuwara Eliya</option>
                                        <option selected>Polonnaruwa</option>
                                        <option selected>Puttalam</option>
                                        <option selected>Ratnapura</option>
                                        <option selected>Trincomalee</option>
                                        <option selected>Vavuniya</option>       
                                    </select>
                            </div>
                        </div>







                        {/* Upload NIC Picture */}
                        <div className="form-group">
                            <label htmlFor="exampleInputFile">Upload NIC Copy</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="exampleInputFile" />
                                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text" id>Upload</span>
                                </div>
                            </div>
                        </div>


                        {/* Update Profile Picture */}
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
                        </div>

                    </div>

                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>



            </div>
        )
    }
}

export default ClientEdit;