import React from 'react';
import Card from '../Card/Card';
import './CardList.css';


const CardList = ({ book }) => {
  return (
    <div className="searchCont">
      {
        book.map((books) => {

          return (
            <Card
              book_name={books.book_name}
              book_ISBN={books.book_ISBN}
              book_author={books.book_author}
              book_genre={books.book_genre}
              book_count={books.book_count}
            />
          );
        })
      }
    </div>
  );
}

export default CardList;