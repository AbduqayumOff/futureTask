const initialState = {
  booksList: [],
  loading: false,
  userFilter: "",
  booksFiltered: [],
  filterStatus: false,
  sortBy: "relevance",
  userRequest: "",
  booksCounter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_INITIATED":
      if (state.filterStatus) {
        let filtered = action.newBooksList.filter((item) => {
          console.log(item.volumeInfo.categories?.includes(state.userFilter));
          return item.volumeInfo.categories?.includes(state.userFilter);
        });
        return {
          ...state,
          booksList: action.newBooksList,
          userRequest: action.request,
          booksFiltered: filtered,
          loading: false,
          booksCounter: filtered.length,
        };
      } else {
        return {
          ...state,
          booksList: action.newBooksList,
          userRequest: action.request,
          loading: false,
          booksCounter: action.newBooksList.length,
        };
      }

    case "SEARCH_MORE":
      if (state.filterStatus) {
        console.log(action.addToBooksList);
        console.log(state.userFilter);
        const addedFilteredBooks = [...action.addToBooksList].filter((item) => {
          console.log(item.volumeInfo.categories?.includes(state.userFilter));
          return item.volumeInfo.categories?.includes(state.userFilter);
        });
        console.log(addedFilteredBooks);
        return {
          ...state,
          booksList: [...state.booksList, ...action.addToBooksList],
          booksFiltered: [...state.booksFiltered, ...addedFilteredBooks],
          booksCounter: [...state.booksFiltered, ...addedFilteredBooks].length,
        };
      } else {
        return {
          ...state,
          booksList: [...state.booksList, ...action.addToBooksList],
          loading: false,
          booksCounter: [...state.booksList, ...action.addToBooksList].length,
        };
      }

    case "REQUEST_SENT":
      return {
        ...state,
        loading: true,
      };

    case "REQUEST_FULLFILLED":
      return {
        ...state,
        loading: false,
      };

    case "BOOKS_UNFILTERED":
      return {
        ...state,
        userFilter: "",
        booksFiltered: [],
        filterStatus: false,
        booksCounter: state.booksList.length,
      };

    case "BOOKS_LOADED_FILTERED":
      const filterRequest = action.filter;
      const booksFiltered = [...state.booksList].filter((item) => {
        return item.volumeInfo.categories?.includes(filterRequest);
      });
      return {
        ...state,
        filterStatus: true,
        userFilter: action.filter,
        booksFiltered: booksFiltered,
        booksCounter: booksFiltered.length,
      };

    case "BOOKS_TO_BE_LOADED_AND_FILTERED":
      return {
        ...state,
        filterStatus: true,
        userFilter: action.filter,
      };

    case "BOOKS_TOGGLE_SORTING":
      return {
        ...state,
        sortBy: action.typeOfSorting,
      };

    case "CLEAR_PREV_REQUEST":
      console.log("clearing");
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;
