import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router';
import Counters from './components/counter/counters';
import Navbar from './components/navbar';
import Products from './components/products/products';
import ProductDetails from './components/products/productDetails';
import Posts from './components/posts/posts';
import Home from './components/home';
import NotFound from './components/notFound';
import Dashboard from './components/admin/dashboard';
import MovieDashboard from './components/movies/movieDashboard';
import LoginForm from './components/users/login';
import UserRegistration from './components/users/userRegistration';
import HttpDashboard from './components/http-app/httpDashboard';
import './App.css';

class App extends Component {
  state = { 
    counters: [
        {id: 1, value: 4 },
        {id: 2, value: 0 },
        {id: 3, value: 0 },
        {id: 4, value: 2 },
    ]
  }

  constructor () {
    super();
    let totalCounts = this.getTotalCounts();
    this.state.count = totalCounts;
  }

  handleCounterValue = (counter, variation) => {
      let counters = [...this.state.counters];
      const index = counters.indexOf(counter);
      counters[index] = {...counter};
      if(counters[index].value === 0 && variation === -1) return;
      counters[index].value = counters[index].value + variation;
      let totalCounts = this.getTotalCounts();
      totalCounts += variation;
      this.setState({counters, count:  totalCounts});
      
  }

  handleCounterDelete = (counter) => {
      const counters = this.state.counters.filter(cnt => cnt.id !== counter.id);
      let totalCounts = this.getTotalCounts();
      totalCounts -= counter.value;
      this.setState({counters, count:  totalCounts});
  }

  handleCoutnerReset = () => {
      const counters = [...this.state.counters];
      counters.map(c=> {
          c.value = 0;
      });
      this.setState({counters, count: 0});
  }

  getTotalCounts = ()  => {
    let count = 0;
    this.state.counters.map(c => {
      count = count + c.value;
    });
    return count;
  }

  render() { 
    return (
      <main role="main" className="container">
        <Navbar totalCounters={this.state.count} />
        <div className="content">
          <Switch>
            <Route path="/user/login" component={LoginForm}/>
            <Route path="/user/register" component={UserRegistration}/>
            <Route path="/movies" component={MovieDashboard}/>
            <Route 
              path="/counters" 
              render={(props)=> <Counters 
                      counters = {this.state.counters}
                      onhandleCounterValue = {this.handleCounterValue}
                      onhandleCounterDelete = {this.handleCounterDelete}
                      onhandleCoutnerReset = {this.handleCoutnerReset}
                      {...props} 
                  />} 
            />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/products" component={Products} />
            <Route path="/posts/:year?/:month?" component={Posts} />
            <Route path="/admin" component={Dashboard} />
            <Redirect from="/messages" to="/posts" />
            <Route path="/http-dashboard" component={HttpDashboard} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found"/>   
          </Switch>
        </div>
      </main>
    );
  }
}
 
export default App;
