const person = require('../models-webservice/person');
const searchArg = require('../utils/search-argument');
const resolvers = require('./index');
const data_people = require('../data/person');

/**
 * person.prototype.worksFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
person.prototype.worksFilter = function({
    search,
    order,
    pagination
}, context) {

  /*
  YOUR CODE GOES HERE
  */
  throw new Error('worksFilter is not implemented');

}

/**
 * person.prototype.countFilteredWorks - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
person.prototype.countFilteredWorks = function({search},context){
  /*
  YOUR CODE GOES HERE
  */
  throw new Error('countFilteredWorks is not implemented');
}


/**
 * person.prototype.company - Return associated record
 *
 * @param  {string} _       First parameter is not used
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
person.prototype.company = function(_, context) {
    return resolvers.readOnePubli_sher({
        "id": this.companyId
    }, context);
}

module.exports = {

  /**
   * people - Returns certain number, specified in pagination argument, of records that
   * holds the condition of search argument, all of them sorted as specified by the order argument.
   *
   * @param  {object} search     Search argument for filtering records
   * @param  {array} order       Type of sorting (ASC, DESC) for each field
   * @param  {object} pagination Offset and limit to get the records from and to respectively
   * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
   * @return {array}             Array of records holding conditions specified by search, order and pagination argument
   */
    people: function({
        search,
        order,
        pagination
    }, context) {
        /*
        YOUR CODE GOES HERE
        */

        let query = `query
        people($search: searchPersonInput $pagination: paginationInput, $order: [orderPersonInput] )
       {people(search:$search pagination:$pagination, order:$order){id firstName lastName email companyId } }`

       return axios.post(url,{query:query, variables: {
         search: search,
         order: order,
         pagination: pagination
       }}).then( res => {
          let data = res.data.data.people;
          return data.map(item => {return new person(item)});
        }).catch( error =>{
          handleError(error);
        });


    },

    /**
     * readOnePerson - Returns one record with the specified id in the id argument.
     *
     * @param  {number} {id}    Id of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with id requested
     */
    readOnePerson: function({
        id
    }, context) {
        /*
        YOUR CODE GOES HERE
        */

        let query = `query readOnePerson{ readOnePerson(id: ${id}){id  firstName lastName email companyId} }`

        return axios.post(url,{query:query}).then( res => {
          let data = res.data.data.readOnePerson;
          return new person(data);
        }).catch( error =>{
          handleError(error);
        });

    },

    /**
     * addPerson - Creates a new record with data specified in the input argument
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
     addPerson: function(input, context){
       /*
       YOUR CODE GOES HERE
       */

       let query = `mutation addPerson($firstName:String $lastName:String $email:String $companyId: Int){
         addPubli_sher(firstName:$firstName lastName:$lastName email:$email companyId:$companyId ){id  firstName lastName email companyId  }
       }`;

       return axios.post(url, {query: query, variables: input}).then( res =>{
         let data = res.data.data.addPerson;
         return new person(data);
       }).catch(error =>{
         handleError(error);
       });
     },

     /**
      * bulkAddPersonXlsx - Load xlsx file of records NO STREAM
      *
      * @param  {string} _       First parameter is not used
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      */
     bulkAddPersonXlsx: function(_, context){
       /*
       YOUR CODE GOES HERE
       */
       throw new Error('bulkAddPersonXlsx is not implemented');
     },

     /**
      * bulkAddPersonCsv - Load csv file of records
      *
      * @param  {string} _       First parameter is not used
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      */
     bulkAddPersonCsv: function(_, context) {
       /*
       YOUR CODE GOES HERE
       */
       throw new Error('bulkAddPersonCsv is not implemented');
     },

     /**
      * deletePerson - Deletes a record with the specified id in the id argument.
      *
      * @param  {number} {id}    Id of the record to delete
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      * @return {string}         Message indicating if deletion was successfull.
      */
     deletePerson: function({id}, context){
       /*
       YOUR CODE GOES HERE
       */
       let query = `mutation deletePerson{ deletePerson(id:${id})}`;

       return axios.post(url, {query: query}).then(res =>{
         return res.data.data.deletePerson;
       }).catch(error => {
         handleError(error);
       });

     },

     /**
      * updatePerson - Updates the record specified in the input argument
      *
      * @param  {object} input   record to update and new info to update
      * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
      * @return {object}         Updated record
      */
     updatePerson: function(input, context){
       /*
       YOUR CODE GOES HERE
       */
       let query = `mutation updatePerson($id:ID! $firstName:String $lastName:String $email:String $companyId: Int ){
         updatePerson(id:$id firstName:$firstName lastName:$lastName email:$email companyId:$companyId  ){id  firstName lastName email companyId  }
       }`

       return axios.post(url, {query: query, variables: input}).then(res=>{
         let data = res.data.data.updatePerson;
         return new person(data);
       }).catch(error =>{
         handleError(error);
       });

     },

     /**
      * countPersons - Counts the number of records that holds the conditions specified in the search argument
      *
      * @param  {object} {search} Search argument for filtering records
      * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
      * @return {number}          Number of records that holds the conditions specified in the search argument
      */
    countPeople: function({search}, context){
      /*
      YOUR CODE GOES HERE
      */
      let query = `query countPeople($search: searchPeobleInput ){
        countPeople(search: $search) }`

        return axios.post(url, {query:query, variables:{
          search: search
        }}).then( res =>{
          return res.data.data.countPeople;
        }).catch(error =>{
          handleError(error);
        });

    },

    /**
     * vueTablePerson - Returns table of records as needed for displaying a vuejs table
     *
     * @param  {string} _       First parameter is not used
     * @param  {type} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Records with format as needed for displaying a vuejs table
     */
    vueTablePerson: function(_,context){
      /*
      YOUR CODE GOES HERE
      */
      let query = `{vueTablePeople{data {id firstName lastName email companyId} total per_page current_page last_page prev_page_url next_page_url from to}}`;

      return axios.post(url, {query: query}).then(res =>{
        let data = res.data.data.vueTablePerson;
        let new_data = data.data.map(item => {return new person(item)});
        data.data = new_data;
        return data;
      }).catch(error =>{
        handleError(error);
      });

    }
}
