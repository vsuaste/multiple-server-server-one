module.exports = class book {

    /**
     * constructor - Creates an instance of the model stored in webservice
     *
     * @param  {obejct} input    Data for the new instances. Input for each field of the model.
     */
    constructor({
        id,
        title,
        genre,
        publisher_id
    }) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.publisher_id = publisher_id;
    }
}
