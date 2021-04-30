import { shallow, mount } from 'enzyme';
import { expect } from 'chai'
import React from 'react';
import '../setupTest'
import Overview from '../client/components/Overview/Overview.jsx';
// import { expect } from 'chai';

describe('<Overview />', () => {
  // const product = {
  //   "id": 19089,
  //   "campus": "hr-rfe",
  //   "name": "Camo Onesie",
  //   "slogan": "Blend in to your crowd",
  //   "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  //   "category": "Jackets",
  //   "default_price": "140.00",
  //   "created_at": "2021-02-23T19:24:34.450Z",
  //   "updated_at": "2021-02-23T19:24:34.450Z"
  // }
  it('renders seven children to the DOM', () => {
      const wrapper = mount((
        <Overview />
      ));
      // await wrapper.instance().componentDidUpdate();
      expect(wrapper.find('.no-products').exists()).to.equal(true)
      // expect(wrapper.find('.overview-container').exists()).to.equal(true)
  })
})