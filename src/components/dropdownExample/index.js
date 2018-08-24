import React from 'react';
// import { h, render, Component } from 'preact';
import ReactDOM from 'react-dom';
import Dropdown from '../library/react/dropdown';
import DropdownItem from '../library/react/dropdown-item';

import style from "./style";

export default class dropDown extends React.Component {
  render() {
    return (
      <div class={style.header}>
      <Dropdown color="primary" label="Dropdown">
        <DropdownItem link="#/link1">Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
        <DropdownItem>Option 4</DropdownItem>
      </Dropdown>
      </div>
    );
  }
}