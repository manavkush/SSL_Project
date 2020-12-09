import React from 'react';
import './Card.css'
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';

const Card = ({
  book_name,
  book_ISBN,
  book_author,
  book_genre,
  book_count
}) => {
  return (
    <div className="books">

      <Fade >
        <div className="bookinf">
          <div className="bookinfhead">Book name:<br /></div>
          {book_name}<br />
          <div className="bookinfhead">Author:</div>
          {book_author}<br />
          <div className="bookinfhead">Genre:</div>
          {book_genre}<br />
          <div className="bookinfhead"> ISBN:</div>
          {book_ISBN}<br />
          <div className="bookinfhead">Count available:</div>
          {book_count}<br />
        </div>
      </Fade >


    </div >
  );
};

export default Card;