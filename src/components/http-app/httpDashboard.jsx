import React, { Component } from "react";
import { Route , Switch} from "react-router";
import HttpPosts from './httpPosts';
import HttpForm from './httpForm';
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import _ from "lodash";
import httpAxios from './services/httpAxiosService';
import config from './services/config.json';
import 'react-toastify/dist/ReactToastify.css';

class HttpDashboard extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
      const result = await httpAxios.get(config.apiEndPoint);
      this.setState({posts: result.data});
  }

  handleAdd = async (post) => {

    const {data: newPost} = await httpAxios.post(config.apiEndPoint, post);
    const posts = [newPost, ...this.state.posts];
    this.setState({posts});
  };

  handleUpdate = async (post) => {

    await httpAxios.put(`${config.apiEndPoint}/${post.id}`, post);
  
    const { data: originalPost } = await httpAxios.get(`${config.apiEndPoint}/${post.id}`);
    const posts = [...this.state.posts];
    const index = _.findIndex(posts, originalPost);
    posts[index] =  {...post};
    this.setState({posts});
  };

  handleDelete = async post => {
    
    const originalPosts = [...this.state.posts];

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({posts});
    try {
     await httpAxios.delete(`${config.apiEndPoint}/${post.id}`);
    }
    catch(ex) {
      if(ex.response && ex.response.status === 404) {
        alert('This post has alredy been deleted. ');
      }
      this.setState({posts: originalPosts});
    }
  };

  render() {
    const { posts}  = this.state;
    return (
      <React.Fragment>
          <ToastContainer />
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2 mt-2">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">
                            Http Posts
                            <span className="badge bg-primary bg-sm ml-2 rounded-pill sm" style={{marginLeft:'5px'}}>
                                {this.state.posts.length}
                            </span>
                    </span>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-link" to="/http-dashboard">DashBoard</NavLink>
                            <NavLink className="nav-link" to="/http-dashboard/http-posts">View Posts</NavLink>
                            <NavLink className="nav-link" to="/http-dashboard/http-posts/add">Add New Posts</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
          <Switch>
            <Route 
                path="/http-dashboard/http-posts/:id" exact
                render={(props) => 
                    <HttpForm 
                        apiEndPoint = {config.apiEndPoint}
                        posts={posts} 
                        onHandleAdd={this.handleAdd}
                        onHandleUpdate={this.handleUpdate}
                        {...props}/> }
            />
            <Route 
                path="/http-dashboard/http-posts" exact
                render={(props) => <HttpPosts 
                    apiEndPoint = {config.apiEndPoint}
                    posts={posts} 
                    onDelete={this.handleDelete}
                    {...props}/> }
            />
          </Switch>
        
      </React.Fragment>
    );
  }
}

export default HttpDashboard;
