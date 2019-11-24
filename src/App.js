import React,{Component} from "react";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './components/homepage/Homepage';
import ClientMainPage from './components/profiles/client/ClientMainPage';
import NurseMainPage from './components/profiles/nurse/NurseMainPage';
// import ClientList from './components/profiles/admin/ClientList';
// import NurseList from './components/profiles/admin/NurseList';
import NurseListMain from "./components/list/NurseListMain";
// import nurseEditMain from "./components/profiles/edit/nurseEditMain"
import AdminMaindash from './components/profiles/admin/adminMaindash'
import NurseListCLview from './components/list/NurseListCLview'
import Addnurseadmin from './components/profiles/admin/addnurseadmin'
import Adminnurselist from './components/profiles/admin/adminnurselist'





class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/clientprofile" exact component={ClientMainPage} />
        <Route path="/nurseprofile" exact component={NurseMainPage} />
        {/* <Route path="/clientlist" exact component={ClientList} /> */}
        {/* <Route path="/nurselist" exact component={NurseList} /> */}
        <Route path="/nursemainlist" exact component={NurseListMain}/>
        <Route path="/nurslistclientview" exact component={NurseListCLview}/>
        {/* <Route path="/nursemainedit" exact component={nurseEditMain}/> */}
        <Route path="/adminmaindash" exact component={AdminMaindash} />
        <Route path="/addnurseadmin" exact component={Addnurseadmin} />
        <Route path="/nurselistadmin" exact component={Adminnurselist} />
      </Router>
    );
  }
}

export default App;
