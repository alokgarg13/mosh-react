import React from "react";
import { Route, Switch} from "react-router";
import Users from './users';
import Posts from './posts';
import SideBar from './sidebar';


const Dashboard = ({ match }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <SideBar />
      <Switch>
        <Route path="/admin/users" exact  component={Users} />
        <Route path="/admin/posts" exact component={Posts} />
      </Switch>
    </div>
  );
};

export default Dashboard;
