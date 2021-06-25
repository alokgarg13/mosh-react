import React from 'react';
import Form from '../common/forms/form';
import Joi from 'joi-browser';
import axios from 'axios';

class HttpForm extends Form {
    state = { 
        data: {
            title: '',
            body: ''
        },
        errors: {}
     }
     schema = {
        id: Joi.number(),
        title:Joi.string().required().label('Title'),
        body: Joi.string().required().label('Body')
     }

     async componentDidMount() {
        const postId = this.props.match.params.id;
        if(postId === "add") return;
        try {
            const { data: post } = await axios.get(`${this.props.apiEndPoint}/${postId}`);
           if(!post) return this.props.history.replace("/not-found");
            this.setState({data: this.mapToViewModel(post)});
        }
        catch(e) {
            console.log('catching error ');
            console.log(e);
        }
    }

    mapToViewModel(post) {
        return {
            id: post.id,
            title: post.title,
            body: post.body
        }
    }

    doSubmit = () => {
        if(this.state.data.id && this.state.data.id !== '') {
            this.props.onHandleUpdate(this.state.data);
        }
        else {
            this.props.onHandleAdd(this.state.data);
        }
        this.props.history.replace('/http-dashboard/http-posts');
     }

     handleCancel = () => {
        this.props.history.replace('/http-dashboard/http-posts')
     }

    render() { 
        return ( 
            <div>
                <h1>Add New</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderInput('body', 'Body')}
                    {this.renderButton('Save', 'submit')}
                    {this.renderButton('Cancel', 'button', this.handleCancel)}
                </form>
            </div>
         );
    }
}
 
export default HttpForm;