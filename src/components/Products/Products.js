import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
const fetch = require("node-fetch");
var defaultList = [];

const products = () => {
  const [searchText, setSearchText] = useState('');
  const [bookList, setBookList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorContent, setErrorContent] = useState('');

  /*
    Write code here to fetch data from the given url and fill up the bookList useState.
  */

  const filterResults = (query) => {

    /*
      Write code here to filter the fetched bookList with only the ones that contains the
      query as a substring. The filtering should be done by ignoring case. The filtered 
      list should be set to bookList using setBookList();
    */
   
  };
  
  const Card = (props) => {
    var book = props.book;
    var name = book.name;
    var price = book.price;
    return (
      <>
        <div className="card">
          <img src={book.image} className="image"></img>
          <div className="title">{book.name}</div>
          <div className="author">{book.label}</div>
          <div className="description">{book.description}</div>
          <Link
            to={{
              pathname: '/cart',
              state: {...book}
            }}
            className="price"
          >
            PURCHASE FOR ${book.price}
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <h3>Book Store</h3>
      <div className="books">
        {bookList.map((ele) => {
          return <Card book={ele} />;
        })}
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default products;
