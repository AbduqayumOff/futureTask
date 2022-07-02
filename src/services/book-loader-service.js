export default class booksLoaderService {
  constructor() {
    this._apiBase = "AIzaSyBegn1BYkKYId9tsTKsCtjKa1IhDsFK3JM";
    this._apiAddress = "https://www.googleapis.com/books/v1/volumes";
  }

  requestSender = async (url) => {
    let first = await fetch(url);
    let res = await first.json();
    return res;
  };

  loadBooks = async (request, sorting = "relevance", idx = 0) => {
    let res = await this.requestSender(
      `${this._apiAddress}?q=${request}&orderBy=${sorting}&startIndex=${idx}&maxResults=30&key=${this._apiBase}`
    );
    return res;
  };

  loadBookInfo = async (bookId) => {
    let res = await this.requestSender(
      `${this._apiAddress}/${bookId}?key=${this._apiBase}`
    );
    return res;
  };
}
