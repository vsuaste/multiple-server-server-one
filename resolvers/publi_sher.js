const publi_sher = require('../models-webservice/publi_sher');
const searchArg = require('../utils/search-argument');
const resolvers = require('./index');
const data_publisher = require('../data/publisher');

/**
 * publi_sher.prototype.publicationsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
publi_sher.prototype.publicationsFilter = function({
    search,
    order,
    pagination
}, context) {

  if(search === undefined)
  {
    return resolvers.books({"search":{"field" : "publisher_id", "value":{"value":this.id }, "operator": "eq"}, order, pagination},context);
  }else{
    return resolvers.books({"search":{"operator":"and", "search":[ {"field" : "publisher_id", "value":{"value":this.id }, "operator": "eq"} , search] }, order, pagination },context)
  }
}

/**
 * publi_sher.prototype.countFilteredPublications - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
publi_sher.prototype.countFilteredPublications = function({search},context){

  if(search === undefined)
  {
    return resolvers.countBooks({"search":{"field" : "publisher_id", "value":{"value":this.id }, "operator": "eq"} }, context);
  }else{
    return resolvers.countBooks({"search":{"operator":"and", "search":[ {"field" : "publisher_id", "value":{"value":this.id }, "operator": "eq"} , search] }},context)
  }
}


/**
 * publi_sher.prototype.director - Return associated record
 *
 * @param  {string} _       First parameter is not used
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
publi_sher.prototype.director = function(_, context) {

  return resolvers.people({"search":{"field" : "companyId", "value":{"value":this.id }, "operator": "eq" } },context)
  .then((res)=>{
    return res[0];
  }).catch( error => {
    throw new Error(error);
  });
}

module.exports = {

  /**
   * publi_shers - Returns certain number, specified in pagination argument, of records that
   * holds the condition of search argument, all of them sorted as specified by the order argument.
   *
   * @param  {object} search     Search argument for filtering records
   * @param  {array} order       Type of sorting (ASC, DESC) for each field
   * @param  {object} pagination Offset and limit to get the records from and to respectively
   * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
   * @return {array}             Array of records holding conditions specified by search, order and pagination argument
   */
    publi_shers: function({
        search,
        order,
        pagination
    }, context) {
        /*
        YOUR CODE GOES HERE
        */
        return data_publisher.map( p =>{
          return new publi_sher(p);
        });
        //throw new Error('publi_shers is not implemented');
    },

    /**
     * readOnePubli_sher - Returns one record with the specified id in the id argument.
     *
     * @param  {number} {id}    Id of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with id requested
     */
    readOnePubli_sher: function({
        id
    }, context) {
        /*
        YOUR CODE GOES HERE
        */
        let filtered =  data_publisher.filter( p => {
           if(p.id == id){
             return p;
           }
         });
        if (filtered.length > 0){
          return new publi_sher(filtered[0]);
        }
        return new Error('No such ID in our database');
        //throw new Error('readOnePubli_sher is not implemented');
    },

    /**
     * addPubli_sher - Creates a new record with data specified in the input argument
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
     addPubli_sher: function(input, context){
       /*
       YOUR CODE GOES HERE
       */
       console.log("DATA",input);
       throw new Error('addPubli_sher is not implemented');
     },

     /**
      * bulkAddPubli_sherXlsx - Load xlsx file of records NO STREAM
      *
      * @param  {string} _       First parameter is not used
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      */
     bulkAddPubli_sherXlsx: function(_, context){
       /*
       YOUR CODE GOES HERE
       */
       throw new Error('bulkAddPubli_sherXlsx is not implemented');
     },

     /**
      * bulkAddPubli_sherCsv - Load csv file of records
      *
      * @param  {string} _       First parameter is not used
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      */
     bulkAddPubli_sherCsv: function(_, context) {
       /*
       YOUR CODE GOES HERE
       */
       throw new Error('bulkAddPubli_sherCsv is not implemented');
     },

     /**
      * deletePubli_sher - Deletes a record with the specified id in the id argument.
      *
      * @param  {number} {id}    Id of the record to delete
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      * @return {string}         Message indicating if deletion was successfull.
      */
     deletePubli_sher: function({id}, context){
       /*
       YOUR CODE GOES HERE
       */
       throw new Error('deletePubli_sher is not implemented');
     },

     /**
      * updatePubli_sher - Updates the record specified in the input argument
      *
      * @param  {object} input   record to update and new info to update
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      * @return {object}         Updated record
      */
     updatePubli_sher: function(input, context){
       /*
       YOUR CODE GOES HERE
       */
       console.log("DATA",input);
       throw new Error('updatePubli_sher is not implemented');
     },

     /**
      * countPubli_shers - Counts the number of records that holds the conditions specified in the search argument
      *
      * @param  {object} {search} Search argument for filtering records
      * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
      * @return {number}          Number of records that holds the conditions specified in the search argument
      */
    countPubli_shers: function({search}, context){
      /*
      YOUR CODE GOES HERE
      */
        return data_publisher.length;
      //throw new Error('countPubli_shers is not implemented');
    },

    /**
     * vueTablePubli_sher - Returns table of records as needed for displaying a vuejs table
     *
     * @param  {string} _       First parameter is not used
     * @param  {type} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Records with format as needed for displaying a vuejs table
     */
    vueTablePubli_sher: function(_,context){
      /*
      YOUR CODE GOES HERE
      */
      throw new Error('vueTablePubli_sher is not implemented');
    }
}
