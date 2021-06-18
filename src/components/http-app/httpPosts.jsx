import React, { Component } from "react";
import axios from "axios";

class HttpPosts extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
      const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
      this.setState({posts: result.data});
  }

  handleAdd = () => {
    // console.log("Add");
    this.props.history.push('/http-dashboard/http-posts/add');
  };

  handleUpdate = post => {
    // console.log("Update", post);
    this.props.history.push(`/http-dashboard/http-posts/${post.id}`);
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        {/* <button 
            className="btn btn-primary"
            onClick={()=> this.props.history.push("/http-dashboard/http-posts/add")}>
               Add
        </button> */}

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.props.onDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default HttpPosts;
