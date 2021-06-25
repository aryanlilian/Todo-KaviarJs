import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

export const Todo = ({ id, title }) => {
    return (
        <div className="item-row">
            <a href="#" className="btn btn-sm btn-danger">Delete</a>
            <span key={id}>{title}</span>
        </div>
    );
};