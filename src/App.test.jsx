import React from 'react';
import App from './App';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

global.shallow = shallow;
global.mount = mount;
global.render = render;

describe('<App />', () => {
  let appWrapper;
  let appInstance;

  const app = (disableLifecycleMethods = false) =>
      shallow(<App/>, {disableLifecycleMethods});

  beforeEach(() => {
    appWrapper = app();
    appInstance = appWrapper.instance();
  });

  afterEach(() => {
    appWrapper = undefined;
    appInstance = undefined;
  });

  it('should render all required component', function () {
    expect(appWrapper.find('#app-title')).toHaveLength(1);
    expect(appWrapper.find('#add-button')).toHaveLength(1);
    expect(appWrapper.find('#remove-button')).toHaveLength(1);
    expect(appWrapper.find('#table-row-head')).toHaveLength(1);
    expect(appWrapper.find('#table-row-body')).toHaveLength(20);
  });
  it('should open dialog on add button clicked then sholuld close dialog on close icon click',
      function () {
        expect(
            appWrapper.find('#add-task-dialog').props().open).not.toBeTruthy();
        appWrapper.find('#add-button').simulate('click');
        expect(appWrapper.find('#add-task-dialog').props().open).toBeTruthy();
        appWrapper.find('#dialog-close-button').simulate('click');
        expect(
            appWrapper.find('#add-task-dialog').props().open).not.toBeTruthy();
      });

  it('should open dialog and save new task on save button click', function () {
    expect(appWrapper.find('#add-task-dialog').props().open).not.toBeTruthy();
    appWrapper.find('#add-button').simulate('click');
    expect(appWrapper.find('#add-task-dialog').props().open).toBeTruthy();
    appWrapper.find('#task-name-text-field').simulate('blur',
        {target: {value: 'testName'}});
    appWrapper.find('#datetime-local-dialog').simulate('blur',
        {target: {value: '2021-08-24T10:30'}});
    appWrapper.find('#save-task-button').simulate('click');
    expect(appWrapper.find('#add-task-dialog').props().open).not.toBeTruthy();
    expect(appWrapper.find('#table-row-body')).toHaveLength(21);
    expect(appWrapper.find('#table-row-body').last().find(
        '#table-cell-task-name').text()).toEqual('testName')
  });

  it('should change state on change status button clicked', function () {
    const initText = appWrapper.find('#change-status-button').first().text();
    appWrapper.find('#change-status-button').first().simulate('click');
    expect(initText).toEqual("COMPLETED");
    expect(appWrapper.find('#change-status-button').first().text()).toEqual(
        "INCOMPLETED");
  });

  it('should filter out completed tasks', function () {
    appWrapper.find('#remove-button').simulate('click');
    expect(appWrapper.find('#table-row-body')).toHaveLength(11);
  });

  it('should change date onBlur', function () {
    appWrapper.find('#datetime-local').first().simulate('blur',
        {target: {value: '2021-08-24T10:30'}})
  })

});