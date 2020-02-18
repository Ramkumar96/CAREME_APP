import React, { Component } from 'react';
import Admindashleftnav from "./admindashleftnav";
import ProfileNavbar from "../ProfileNavbar";
import InteractiveTable from "react-interactive-table";
import axios from '../../../../backend/node_modules/axios';

class ComplaintsReview extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            complaint: []
        };
        
    }
    
    temp=[];

    componentDidMount(){
        /**
            * @desc : Retrieves all the complaint records from the backend for the admin to view and filter through
        */
        axios.get('http://localhost:4000/complaint/complaintDetails')
          .then(response => {
            console.log(response.data);
            response.data.forEach(element => {
              this.temp.push(element);
            });

            this.setState({ 
                complaint: response.data 
            });
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    
      tabRow(){
        const data = this.temp;
        return data;
      }
  
      render() {
        return (
          <div>
            <Admindashleftnav />
            <div>
              <ProfileNavbar/>
              <div className="content-wrapper">
                <h3 align="center">Complaints Lodged</h3>
                {/*
                  * @desc : Displays the data retrieved from the backend to the table
                  * @requires : The InteractiveTable from react-interactive-table
                */}
                <InteractiveTable
                    tableStyles={'responsive'}
                    dataList={this.tabRow()} 
                    columns={
                        {
                            accusedUserFName: {
                                alias: 'Accused - First Name',
                                sortable: true,
                                active: false,
                                sortingKey: 'accusedUserFName'
                            },
                            accusedUserLName: {
                                alias: 'Accused - Last Name',
                                sortable: true,
                                active: false,
                                sortingKey: 'accusedUserLName'
                            },
                            accusedByFName: {
                                alias: 'Complainant - First Name',
                                sortable: true,
                                active: false,
                                sortingKey: 'accusedByFName'
                            },
                            accusedByLName: {
                                alias: 'Complainant - Last Name',
                                sortable: true,
                                active: false,
                                sortingKey: 'accusedByLName'
                            },
                            complaint: {
                              alias: 'Accusation',
                              sortable: false,
                              active: false,
                              sortingKey: 'complaint'
                            },
                            complainedDate: {
                                alias: 'Date of Complaint',
                                sortable: true,
                                active: false,
                                sortingKey: 'complainedDate'
                            }
                        }
                    }
                    searching={{
                        active: true,
                        searchPlaceholder: 'Search...',
                        searchKeys: ['accusedByFName', 'accusedByLName', 'accusedUserFName', 'accusedUserLName']
                    }}
                    paging={{
                        maxRows: 7,
                        prevBtn: 'Prev',
                        nextBtn: 'Next',
                        showAll: true,
                        showAllText: 'show all',
                        joinPages: false
                    }}
                />
              </div>
            </div>
          </div>
        );
      }
}

export default ComplaintsReview;