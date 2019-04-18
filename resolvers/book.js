const book = require('../models-webservice/book');
const searchArg = require('../utils/search-argument');
const resolvers = require('./index');
const data_books = require('../data/book');
const data_book_to_author = require('../data/book_to_author');

/**
 * book.prototype.authorsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
book.prototype.authorsFilter = function({
    search,
    order,
    pagination
}, context) {

  /*
  YOUR CODE GOES HERE
  */

  throw new Error('authorsFilter is not implemented');

}

/**
 * book.prototype.countFilteredAuthors - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
book.prototype.countFilteredAuthors = function({search},context){
  /*
  YOUR CODE GOES HERE
  */
  throw new Error('countFilteredAuthors is not implemented');
}


/**
 * book.prototype.publisher - Return associated record
 *
 * @param  {string} _       First parameter is not used
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
book.prototype.publisher = function(_, context) {
    return resolvers.readOnePubli_sher({
        "id": this.publisher_id
    }, context);
}

module.exports = {

  /**
   * books - Returns certain number, specified in pagination argument, of records that
   * holds the condition of search argument, all of them sorted as specified by the order argument.
   *
   * @param  {object} search     Search argument for filtering records
   * @param  {array} order       Type of sorting (ASC, DESC) for each field
   * @param  {object} pagination Offset and limit to get the records from and to respectively
   * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
   * @return {array}             Array of records holding conditions specified by search, order and pagination argument
   */
    books: function({
        search,
        order,
        pagination
    }, context) {
      let query = `query
      books($search: searchBookInput $pagination: paginationInput, $order: [orderBookInput] )
     {books(search:$search pagination:$pagination, order:$order){id title genre publisher_id } }`

     return axios.post(url,{query:query, variables: {
       search: search,
       order: order,
       pagination: pagination
     }}).then( res => {
        let data = res.data.data.books;
        return data.map(item => {return new book(item)});
      }).catch( error =>{
        handleError(error);
      });

    },

    /**
     * readOneBook - Returns one record with the specified id in the id argument.
     *
     * @param  {number} {id}    Id of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with id requested
     */
    readOneBook: function({
        id
    }, context) {

      let query = `query readOneBook{ readOneBook(id: ${id}){id  title genre publisher_id} }`

      return axios.post(url,{query:query}).then( res => {
        let data = res.data.data.readOneBook;
        return new book(data);
      }).catch( error =>{
        handleError(error);
      });
    },

    /**
     * addBook - Creates a new record with data specified in the input argument
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
     addBook: function(input, context){
       let query = `mutation addBook($title:String $genre:String $publisher_id:Int){
         addBook(title:$title genre:$genre publisher_id:$publisher_id){id  title genre publisher_id   }
       }`;

       return axios.post(url, {query: query, variables: input}).then( res =>{
         let data = res.data.data.addPerson;
         return new person(data);
       }).catch(error =>{
         handleError(error);
       });
     },

     /**
      * bulkAddBookXlsx - Load xlsx file of records NO STREAM
      *
      * @param  {string} _       First parameter is not used
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      */
     bulkAddBookXlsx: function(_, context){
       /*
       YOUR CODE GOES HERE
       */
       throw new Error('bulkAddBookXlsx is not implemented');
     },

     /**
      * bulkAddBookCsv - Load csv file of records
      *
      * @param  {string} _       First parameter is not used
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      */
     bulkAddBookCsv: function(_, context) {
       /*
       YOUR CODE GOES HERE
       */
       throw new Error('bulkAddBookCsv is not implemented');
     },

     /**
      * deleteBook - Deletes a record with the specified id in the id argument.
      *
      * @param  {number} {id}    Id of the record to delete
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      * @return {string}         Message indicating if deletion was successfull.
      */
     deleteBook: function({id}, context){
       let query = `mutation deleteBook{ deleteBook(id:${id})}`;

       return axios.post(url, {query: query}).then(res =>{
         return res.data.data.deleteBook;
       }).catch(error => {
         handleError(error);
       });
     },

     /**
      * updateBook - Updates the record specified in the input argument
      *
      * @param  {object} input   record to update and new info to update
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      * @return {object}         Updated record
      */
     updateBook: function(input, context){
       let query = `mutation updateBook($id:ID! $title:String $genre:String $publisher_id:Int ){
         updateBook(id:$id title:$title genre:$genre publisher_id:$publisher_id  ){id  title genre publisher_id  }
       }`

       return axios.post(url, {query: query, variables: input}).then(res=>{
         let data = res.data.data.updateBook;
         return new book(data);
       }).catch(error =>{
         handleError(error);
       });
     },

     /**
      * countBooks - Counts the number of records that holds the conditions specified in the search argument
      *
      * @param  {object} {search} Search argument for filtering records
      * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
      * @return {number}          Number of records that holds the conditions specified in the search argument
      */
    countBooks: function({search}, context){
      let query = `query countBooks($search: searchBookInput ){
        countBooks(search: $search) }`

        return axios.post(url, {query:query, variables:{
          search: search
        }}).then( res =>{
          return res.data.data.countBooks;
        }).catch(error =>{
          handleError(error);
        });
    },

    /**
     * vueTableBook - Returns table of records as needed for displaying a vuejs table
     *
     * @param  {string} _       First parameter is not used
     * @param  {type} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Records with format as needed for displaying a vuejs table
     */
    vueTableBook: function(_,context){
      let query = `{vueTableBook{data {id  title genre publisher_id} total per_page current_page last_page prev_page_url next_page_url from to}}`;

      return axios.post(url, {query: query}).then(res =>{
        let data = res.data.data.vueTableBook;
        let new_data = data.data.map(item => {return new book(item)});
        data.data = new_data;
        return data;
      }).catch(error =>{
        handleError(error);
      });
    }
}
