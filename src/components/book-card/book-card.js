import React from "react";

function BookCard(props) {
  console.log(props);
  const { bookInfo, onItemSelected } = props;
  return (
    <>
      <div className="book-card" onClick={() => onItemSelected(bookInfo.id)}>
        <img
          className="card-img"
          src={
            bookInfo.volumeInfo?.imageLinks?.smallThumbnail
              ? bookInfo.volumeInfo.imageLinks.smallThumbnail
              : ""
          }
          alt="book-img"
        ></img>
        <div className="item-info-cat">
          {bookInfo.volumeInfo.categories ? (
            bookInfo.volumeInfo.categories[0]
          ) : (
            <p>no information</p>
          )}
        </div>
        <div className="item-title">{bookInfo.volumeInfo.title}</div>
        <div className="item-description">
          Authors:{" "}
          {bookInfo.volumeInfo.authors ? (
            bookInfo.volumeInfo?.authors.join(",")
          ) : (
            <p>no information</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BookCard;
