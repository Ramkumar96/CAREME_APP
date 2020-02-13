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
                <h3 align="center">Complaints over the period of a month</h3>
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
                        searchKeys: ['Location']
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