import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import booksLoaderService from "../../services/book-loader-service";
import Spinner from "../spinner/spinner";

import { booksRequested, booksReceived } from "../../actions/index";

function BookInfo(props) {
  const { projectAPI, booksRequested, booksReceived, loading } = props;
  let params = useParams();
  let bookId = params.bookId;
  let [bookInfo, setBookInfo] = useState();
  const booksLoader = new booksLoaderService();

  async function updateItem(id) {
    booksRequested();
    let loadedInfo = await booksLoader.loadBookInfo(id);
    setBookInfo({ ...loadedInfo.volumeInfo });
  }

  useEffect(() => {
    console.log("I update");
    updateItem(bookId);
  }, [bookId]);

  function renderInfo() {
    setTimeout(() => {
      booksReceived();
    }, 500);
    if (bookInfo) {
      return (
        <>
          <div className="book-info-container">
            <div className="book-img">
              <img
                src={
                  bookInfo.imageLinks?.thumbnail
                    ? bookInfo.imageLinks.thumbnail
                    : ""
                }
                alt="bookImg"
              ></img>
            </div>
            <div className="book-information">
              <div className="item-general">
                {bookInfo.categories ? bookInfo.categories[0] : ""}
              </div>
              <div className="item-title">
                {bookInfo.title ? bookInfo.title : ""}
              </div>
              <div className="item-info-cat">
                {bookInfo.authors ? bookInfo.authors.join(" ") : ""}
              </div>
              <div className="item-description">
                {bookInfo.description ? bookInfo.description : ""}
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <span>Please, select an item to see info</span>;
    }
  }

  return <>{loading ? <Spinner /> : renderInfo()}</>;
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    projectAPI: state.projectAPI,
  };
};

const mapDispatchToProps = {
  booksRequested,
  booksReceived,
};
export default connect(mapStateToProps, mapDispatchToProps)(BookInfo);
