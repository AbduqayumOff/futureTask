const searchInitiated = (newBooksList, request) => {
  return {
    type: "SEARCH_INITIATED",
    newBooksList,
    request,
  };
};

const searchMore = (addToBooksList) => {
  return {
    type: "SEARCH_MORE",
    addToBooksList,
  };
};

const booksUnfiltered = () => {
  return {
    type: "BOOKS_UNFILTERED",
  };
};

const booksRequested = () => {
  return {
    type: "REQUEST_SENT",
  };
};

const booksReceived = () => {
  return {
    type: "REQUEST_FULLFILLED",
  };
};

const booksLoadedFiltered = (filter) => {
  return {
    type: "BOOKS_LOADED_FILTERED",
    filter: filter,
  };
};

const booksToBeLoadedAndFiltered = (filter) => {
  return {
    type: "BOOKS_TO_BE_LOADED_AND_FILTERED",
    filter: filter,
  };
};

const booksToggleSorting = (typeOfSorting) => {
  return {
    type: "BOOKS_TOGGLE_SORTING",
    typeOfSorting: typeOfSorting,
  };
};

const clearPrevRequest = () => {
  return {
    type: "CLEAR_PREV_REQUEST",
  };
};

export {
  // booksFound,
  searchInitiated,
  searchMore,
  booksRequested,
  booksToBeLoadedAndFiltered,
  booksLoadedFiltered,
  booksUnfiltered,
  booksToggleSorting,
  clearPrevRequest,
  booksReceived,
};
