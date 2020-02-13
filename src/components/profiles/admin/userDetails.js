import React, { Component } from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import axios from "../../../../backend/node_modules/axios";
import TableRow from './TableRow';
import InteractiveTable from 'react-interactive-table';

class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: []
        };
        
    }
    
    temp=[];

    componentDidMount(){
        axios.get('http://localhost:4000/user/userDetails')
          .then(response => {
            console.log(response.data);
            response.data.forEach(element => {
              this.temp.push(element);
            });
            this.setState({ user: response.data });
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
              <div className="content-wrapper">
                <h3 align="center">CareMe Users</h3>
                <InteractiveTable
                    tableStyles={'responsive'}
                    dataList={this.tabRow()} 
                    columns={
                        {
                            FirstName: {
                                alias: 'First Name',
                                sortable: true,
                                active: false,
                                sortingKey: 'FirstName'
                            },
                            LastName: {
                                alias: 'Last Name',
                                sortable: true,
                                active: false,
                                sortingKey: 'LastName'
                            },
                            Location: {
                                alias: 'District',
                                sortable: true,
                                active: false,
                                sortingKey: 'Location'
                            },
                            RegDate: {
                                alias: 'Registration Date',
                                sortable: true,
                                active: false,
                                sortingKey: 'RegDate'
                            },
                            UserType: {
                              alias: 'User Type',
                              sortable: false,
                              active: false,
                              sortingKey: 'UserType'
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
        );
      }
}

export default UserDetails;