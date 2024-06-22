import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DeleteIcon, EditIcon, ViewIcon } from '../../assets/icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SearchForm from '../../components/SearchForm';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';


const OrderList = () => {
  const [data, setData] = useState([
    { date: '10 Jan 2023' },
    { date: '10 Jan 2023' },
    { date: '10 Jan 2023' },
    { date: '10 Jan 2023' },
    { date: '10 Jan 2023' },
    { date: '10 Jan 2023' },
    { date: '10 Jan 2023' },
    { date: '10 Jan 2023' },
    { date: '10 Jan 2023' },
]);

const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });

    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key === 'date') {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA < dateB) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (dateA > dateB) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        } else {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        }
    });

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

  return (
    <div> 
       <div className="category-list">
    <h3>Product List</h3>
    <div className="d-flex justify-content-between mb-3">
      <SearchForm />
    </div>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Image</th>
          <th scope="col">status</th>
          <th scope="col">Action</th>
          <th onClick={() => requestSort('date')}>
                            Date
                            {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼') : null}
                        </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Attaa</td>
          <td>150</td>
          <td>1</td>
          <td>Image</td>
          <td>
            <span className="badge bg-success">Pending</span>
          </td>
          <td>
            <ViewIcon />
            <DeleteIcon />
          </td>
          {sortedData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.date}</td>
                        </tr>
                    ))}
        </tr>
      </tbody>
    </Table>
  </div>
  </div>
  )
}

export default OrderList