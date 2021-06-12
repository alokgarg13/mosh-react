import React, { Component } from 'react';
import { Route } from 'react-router';
import Movies from './components/movies';
import Counters from './components/counters';
import Navbar from './components/navbar';
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
      counters.map(c => {
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
        {/* <Route path="/movies" component={movies} /> */}
        <Movies />
        <Counters
          counters = {this.state.counters}
          onhandleCounterValue = {this.handleCounterValue}
          onhandleCounterDelete = {this.handleCounterDelete}
          onhandleCoutnerReset = {this.handleCoutnerReset}
        />
  
      </main>
    );
  }
}
 
export default App;
