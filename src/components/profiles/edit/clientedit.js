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
                                        <option selected>Colombo 01</option>
                                        <option selected>Colombo 02</option>
                                        <option selected>Colombo 03</option>
                                        <option selected>Colombo 04</option>
                                        <option selected>Colombo 05</option>
                                        <option selected>Colombo 06</option>
                                        <option selected>Colombo 07</option>
                                        <option selected>Colombo 08</option>
                                        <option selected>Colombo 09</option>
                                        <option selected>Colombo 10</option>
                                        <option selected>Colombo 11</option>
                                        <option selected>Colombo 12</option>
                                        <option selected>Colombo 13</option>
                                        <option selected>Colombo 14</option>       
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