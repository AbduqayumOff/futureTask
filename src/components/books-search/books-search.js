import React, { useState } from "react";
import { connect } from "react-redux";
import {
  booksRequested,
  searchInitiated,
  booksUnfiltered,
  booksToBeLoadedAndFiltered,
  booksLoadedFiltered,
  booksToggleSorting,
  clearPrevRequest,
  booksReceived,
} from "../../actions";
import { Link } from "react-router-dom";
import booksLoaderService from "../../services/book-loader-service";
import img2 from "../../assets/books3.jpeg";
function BooksSearch(props) {
  const {
    searchInitiated,
    booksUnfiltered,
    booksToBeLoadedAndFiltered,
    booksLoadedFiltered,
    booksToggleSorting,
    clearPrevRequest,
    booksRequested,
    booksReceived,
  } = props;
  let { booksList, sortBy } = props;
  let [userRequest, setUserRequest] = useState();
  let [inFocus, setInFocus] = useState(false);
  const booksLoader = new booksLoaderService();

  async function searchForBooks(request, sorting) {
    booksRequested();
    let loaded = await booksLoader.loadBooks(request, sorting);
    setTimeout(() => {
      searchInitiated(loaded.items, request);
    }, 500);
  }

  function submitRequest(event, item) {
    event.preventDefault();
    if (userRequest) {
      searchForBooks(userRequest);
    }
  }

  function trackRequest(event) {
    let value = event.target.value;
    if (!value) {
      clearPrevRequest();
    }
    setUserRequest(value);
  }

  function toggleFilter(value) {
    booksRequested();
    if (value === "All") {
      booksUnfiltered();
    } else if (booksList.length > 0) {
      booksLoadedFiltered(value);
    } else {
      booksToBeLoadedAndFiltered(value);
    }
    setTimeout(() => {
      booksReceived();
    }, 500);
  }

  function toggleSorting(item) {
    booksRequested();
    setTimeout(() => {
      booksReceived();
    }, 500);
    +item.options.selectedIndex === 0
      ? booksToggleSorting("relevance")
      : booksToggleSorting("newest");
    if (booksList.length > 0) {
      searchForBooks(userRequest, sortBy);
    }
  }

  function toggleFocus(value) {
    setInFocus(value);
  }

  function returnToDefault() {
    clearPrevRequest();
    document.querySelector(".main-input").value = "";
    document.querySelector("#categories").value = "All";
    document.querySelector("#sort-by").value = "relevance";
  }

  return (
    <>
      <div
        className="search-container"
        style={{ backgroundImage: `url(${img2})` }}
      >
        <Link
          className="main-title"
          to="/"
          onClick={() => {
            returnToDefault();
          }}
        >
          Search for books
        </Link>

        <form
          className="form"
          type="submit"
          onSubmit={(e) => {
            if (inFocus) {
              submitRequest(e);
            }
          }}
        >
          <div className="input-container">
            <input
              className="main-input"
              type="text"
              placeholder="Please, enter your request"
              onChange={(e) => trackRequest(e)}
              onFocus={() => {
                toggleFocus(true);
              }}
              onBlur={() => toggleFocus(false)}
            ></input>
            <button
              className="btn-small"
              type="submit"
              onClick={(e) => {
                submitRequest(e);
              }}
            >
              search
            </button>
          </div>
          <div className="select-container">
            <label htmlFor="categories">Categories</label>
            <select
              onChange={(e) => toggleFilter(e.target.value)}
              id="categories"
            >
              <option id="All">All</option>
              <option id="Art">Art</option>
              <option id="Biography">Biography</option>
              <option id="Computers">Computers</option>
              <option id="History">History</option>
              <option id="Medical">Medical</option>
              <option id="Poetry">Poetry</option>
            </select>
            <label htmlFor="sort-by">Sort by</label>
            <select id="sort-by" onChange={(e) => toggleSorting(e.target)}>
              <option>relevance</option>
              <option>newest</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    booksList: state.booksList,
    loading: state.loading,
    sortBy: state.sortBy,
    projectAPI: state.projectAPI,
  };
};

const mapDispatchToProps = {
  searchInitiated,
  booksToBeLoadedAndFiltered,
  booksLoadedFiltered,
  booksUnfiltered,
  booksToggleSorting,
  clearPrevRequest,
  booksRequested,
  booksReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksSearch);
