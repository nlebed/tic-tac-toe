import TicTacToe from '../../src/TicTacToe';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { assert, expect } from 'chai';

'use strict';

describe('TicTacToe component', () => {

  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<TicTacToe width={ 4 }/>);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
  });

  it('should exist', () => {
    assert.ok(TicTacToe);
  });
});
