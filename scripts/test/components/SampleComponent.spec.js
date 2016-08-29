import React from 'react';
import sinon from 'sinon';
import expect from 'expect.js';
import { shallow, mount, render } from 'enzyme';
import SampleComponent from '../../components/SampleComponent';

describe('SampleComponent', function() {
    it('has a counter element', function() {
        expect(shallow(<SampleComponent />)
            .contains(<span className='counter' />)).to.equal(true);
    });
    // mount() won't be available since we are not running in a browser context!
    // it('has an increment button', function() {
    //     var onButtonClick = sinon.spy();
    //     var comp = mount(<SampleComponent onIncrement={onButtonClick} />);
    //     comp.find('button').simulate('click');
    //     expect(onButtonClick.callCount).to.equal(1);
    // });
});
