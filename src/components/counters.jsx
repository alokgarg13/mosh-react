import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <button 
                    className="btn btn-primary btn-sm m-2"
                    onClick={this.props.onhandleCoutnerReset}
                >
                    Reset
                </button>
                {this.props.counters.map(counter => (
                        <Counter 
                            key={counter.id}
                            counter={counter}
                            onHandleCounterValue={this.props.onhandleCounterValue}
                            onHandleDelete={this.props.onhandleCounterDelete}
                        />
                    )
                )}
               
            </React.Fragment>
         );
    }
}
 
export default Counters;
