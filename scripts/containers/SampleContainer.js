import { connect } from 'react-redux';

import { incrementCount } from '../actions';
import SampleComponent from '../components/SampleComponent';


// transformation from state to visual properties.
// This is where conversions happen
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    };
};

// make available the actions as props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIncrement: () => {
            dispatch(incrementCount())
        }
    };
};

const SampleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SampleComponent);

export default SampleContainer;
