let booksFile = require("./books");

function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.map((account) => accounts.id).length
}

function getBooksBorrowedCount(books) {

 const booksOut = books.filter(book => book.borrows[0].returned === false)
 return booksOut.length

}



// helper
function _sortObjectByValues(obj) {
	const keys = Object.keys(obj);
	return keys.sort((keyA, keyB) => {
		if (obj[keyA] > obj[keyB]) {
			return -1;
		} else if (obj[keyB] > obj[keyA]) {
			return 1;
		} else {
			return 0;
		}
	});
}

function getMostCommonGenres(books) {
	const count = books.reduce((acc, { genre }) => {
		if (acc[genre]) {
			acc[genre] += 1;
		} else {
			acc[genre] = 1;
		}

		return acc;
	}, {});

	const sorted = _sortObjectByValues(count); // called here
	return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const bookList = books.map((book) => {
    return { 
      name: book.title,
      count: book.borrows.length
    };
  });
   const sortedBookList = bookList.sort((bookA, bookB) => 
    bookA.count < bookB.count ? 1 : -1
   );
   return sortedBookList.slice(0,5)
}


function getMostPopularAuthors(books, authors) {
const authorsList = authors.map((author) => {
  const booksByAuthor = books.filter((book) => {
    return author.id === book.authorId; 
  }); 
  const totalBorrows = booksByAuthor.reduce((acc, bookByAuthor) => {
    return bookByAuthor.borrows.length + acc;
  }, 0);
  return {
    name: `${author.name.first} ${author.name.last}`,
    count: totalBorrows
  };
}); 
 let noRepeats = authorsList.reduce((acc, author) => {
   if (!acc.some(temp => temp.name == author.name)){
      acc.push(author)
   } return acc 
 }, []); console.log(noRepeats)
 const sortAuthorList = noRepeats.sort((authorA, authorB) => 
 authorA.count < authorB.count ? 1 : -1
 ); 
 return sortAuthorList.slice(0, 5);
} 

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
