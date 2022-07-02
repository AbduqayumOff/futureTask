import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BookCard from "../book-card/book-card";
import { searchMore, booksRequested, booksReceived } from "../../actions";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/spinner";

import booksLoaderService from "../../services/book-loader-service";

function BooksFound(props) {
  let [paginateIdx, setPaginateIdx] = useState(31);
  const { userRequest, sortBy, searchMore, booksRequested, booksReceived } =
    props;
  let { loading, booksCounter } = props;
  const navigate = useNavigate();
  const booksLoader = new booksLoaderService();

  async function loadMore() {
    let heightToScroll = document.body.scrollHeight;
    booksRequested();
    let loaded = await booksLoader.loadBooks(userRequest, sortBy, paginateIdx);
    setTimeout(() => {
      searchMore(loaded.items);
      booksReceived();
      window.scrollTo(0, heightToScroll);
      setPaginateIdx(paginateIdx + 30);
    }, 500);
  }

  function renderBooks(array) {
    return (
      <div className="books-results">
        <div className="counter-contatainer">
          <p>
            The total amount found is:{" "}
            <span className="search-result">{booksCounter}</span>
          </p>
        </div>
        <div className="cards-container">
          {array.map((item) => {
            return (
              <BookCard
                onItemSelected={(bookId) => {
                  navigate(`/${bookId}`);
                }}
                bookInfo={item}
                key={item.id + Math.random()}
              ></BookCard>
            );
          })}
        </div>
        <div className="button-container">
          <div className="button-item">
            <button className="btn-small" onClick={() => loadMore()}>
              Load more
            </button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    console.log("books page update");
    booksRequested();
    setTimeout(() => {
      booksReceived();
    }, 500);
  }, []);

  function renderResult() {
    if (props.filterStatus && props.booksList.length > 0) {
      return renderBooks(props.booksFiltered);
    } else if (Array.isArray(props.booksList) && props.booksList.length > 0) {
      return renderBooks(props.booksList);
    } else {
      return (
        <div className="no-search-result">
          <p>please, submit your request</p>{" "}
        </div>
      );
    }
  }
  return <>{loading ? <Spinner /> : renderResult()}</>;
}

const mapStateToProps = (state) => {
  return {
    filterStatus: state.filterStatus,
    booksFiltered: state.booksFiltered,
    booksList: state.booksList,
    loading: state.loading,
    userRequest: state.userRequest,
    projectAPI: state.projectAPI,
    sortBy: state.sortBy,
    booksCounter: state.booksCounter,
  };
};

const mapDispatchToProps = {
  searchMore,
  booksRequested,
  booksReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksFound);
