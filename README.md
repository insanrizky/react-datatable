# React Datatable
This is an ```ONLY SERVER SIDE``` datatable for React based on [Bootstrap CSS](https://getbootstrap.com/docs/4.3/getting-started/introduction/) style.

> We do not need the client side version as it makes data load longer!

# Preview
You can see demo [here]().

# Key Features

This easiest awesome package has some features below:
- Searchable
- Pagination
- Custom Columns
- Custom Labels
- Auto Increments
- Loading Event

# Requirements
All you need is only attach [Bootstrap CSS](https://getbootstrap.com/docs/4.3/getting-started/introduction/) into your project.

# Installation
You can use `npm` or `yarn` as you like.

> npm install --save-dev react-datatable

or

> yarn add --dev react-datatable

# Example Usage
## Basic Table

<pre>
import React from 'react';
import ReactDatatable from 'react-datatable';

class Page extends React.Components {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: 'First Name', key: 'first_name' },
        { name: 'Last Name', key: 'last_name' },
        { name: 'Username', key: 'username' },
        { name: 'Email', key: 'email' },
      ],
      data: [
        {
          id: 1,
          first_name: 'John,
          last_name: 'Doe',
          username: 'john.doe',
          email: 'john.doe@gmail.com',
        },
        {
          id: 2,
          first_name: 'Jane,
          last_name: 'Doe',
          username: 'jane.doe',
          email: 'jane.doe@gmail.com',
        },
        {
          id: 3,
          first_name: 'Joe,
          last_name: 'Doe',
          username: 'joe.doe',
          email: 'joe.doe@gmail.com',
        },
      ],
      meta: {
        page: '1',
        limit: '10',
        search: '',
        total_data: 3,
        total_page: 1
      }
    }
  }

  fetchData = async () => {
    // HTTP Request to get your data here
    // Based on your meta as updated in updateMeta()
  }

  updateMeta = (meta = this.state.meta) => {
    this.setState({ meta }, () => this.fetchData());
  }

  render() {
    return (
      <ReactDatatable
        columns={this.state.columns}
        rows={this.state.rows}
        meta={this.state.meta}
        updateMeta={this.updateMeta}
        />
    )
  }
}
</pre>

# Documentation

Property | Type | Required | Default | Description
--- | --- | --- | --- | ---
columns | array | yes | | Columns definition to be shown.<hr/>```[{ name: 'First Name', key: 'first_name' }]```
rows  | array | yes | | Data definition to be shown.<hr/>```[{id: 1,first_name: 'John,last_name: 'Doe',username: 'john.doe',email: 'john.doe@gmail.com'}]```
meta | object | yes | ```{page: 1, limit: 10, search: '', total_data: 0, total_page: 1 }``` | Meta data
updateMeta | function | no | | Function to update meta data props. It will be called when you change ```page/search/total per page```.
autoIncrement | bool | no | `false` | Numbering at the first column
autoIncrementLabel | string | no | `No` | Numbering column title
customs | array | no | ```[]``` | Custom column definition with its data pattern.<hr/>```[{ columnName: 'Action', element: item => <button>Click Me!</button> }]```
loading | bool | no | `false` | Event loading
loadingLabel | string | no | `'Loading...'` | Text will be shown while loading
noDataLabel | string | no | ```No data available``` | Text will be shown while no data


