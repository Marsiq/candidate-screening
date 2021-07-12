import React from 'react';
import App from './App';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.render = render;

describe('<App />', () => {
  let appWrapper;
  let appInstance;
  const app = (disableLifecycleMethods = false) =>
      shallow(<App />, { disableLifecycleMethods });

  beforeEach(() => {
    appWrapper = app();
    appInstance = appWrapper.instance();
  });

  afterEach(() => {
    appWrapper = undefined;
    appInstance = undefined;
  });

  it('renders without crashing', () => {
    expect(app().exists()).toBe(true);
  });
});