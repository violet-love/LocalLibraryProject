let booksFile = require("./books");

function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.map((account) => accounsts.id).length
}

function getBooksBorrowedCount(books) {

 const booksOut = books.filter(book => book.borrows[0].returned === false)
 return booksOut.length

}



function getMostCommonGenres(books) {

const genres = books.reduce((acc, book) => {
  if(!acc[book.genre]){
    acc[book.genre] = 1;
  } else {
    acc[book.genre] = acc[book.genre]+1;
  }
  return acc
}, {})

return Object.keys(genres)
  .reduce((acc, genre) => {
    acc.push({
      name:genre,
      count: genres[genre]
    })
    return acc
  }, [])

.sort((a,b) => a.count < b.count ? 1: -1)
.slice(0,5)

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
