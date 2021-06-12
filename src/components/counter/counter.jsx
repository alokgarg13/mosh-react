import React, { Component } from 'react';

class Counter extends Component {
    render() {  
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-sm-1">
                        <button className={this.getBtnClass()}>
                            {this.formatCount()}
                        </button>
                    </div>
                    <div className="col-sm-11">
                        <button 
                            className="btn btn-secondary btn-sm  m-2"
                            onClick={()=>this.props.onHandleCounterValue(this.props.counter, 1)}
                        >
                            +
                        </button>
                        <button disabled={this.props.counter.value === 0 ? 'disabled' : '' }
                            className="btn btn-secondary btn-sm m-2"
                            onClick={()=>this.props.onHandleCounterValue(this.props.counter, -1)}
                        >
                            -
                        </button>
                        <button 
                            className="btn btn-danger btn-sm m-2"
                            onClick={()=>this.props.onHandleDelete(this.props.counter)}
                        >
                            x
                        </button>
                    </div>
                </div>
            </div>
         );
    }

    getBtnClass() {
        let btnClass= 'btn btn-sm m-2 btn-';
        btnClass += (this.props.counter.value > 0)  ? 'primary' : 'warning';
        return btnClass;
    }

    formatCount() {
        let value;
        value = this.props.counter.value > 0 ? this.props.counter.value : 'Zero';
        return value;
    }
}
 
export default Counter;