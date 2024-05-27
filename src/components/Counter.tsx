import { count } from 'console';
import {Component, ReactNode} from 'react';

type CounterProps = {
    value: number,
    title?: string
}

class Counter extends Component<CounterProps>{

    state = {
        count : 0
    }

    constructor(props: CounterProps){
        super(props);
        console.log("Counter props", props);
       // this.inc = this.inc.bind(this); // bind the inc method to instance of the Counter component
        this.state.count = this.props.value;
    }

    inc = () => {
        console.log("inc clicked...");
        //this.props.value++;  // props is read-only
        //this.state.count++;  // state is immutable(considered)
        const updatedCount = this.state.count + 1;
        this.setState({
            count: updatedCount
        });
    }

    decr = () => {
        const updatedCount = this.state.count - 1;
        this.setState({
            count: updatedCount
        });
    }



    render() {      
        return (
            <div>
                <h4>Counter: {this.state.count}</h4>
                <p>This is a class component</p>
                <div>
                    <button onClick={this.inc}>Inc</button>&nbsp;
                    <button onClick={this.decr}>Decr</button>
                </div>
            </div>
        )
    }
}

export default Counter