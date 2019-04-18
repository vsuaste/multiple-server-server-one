module.exports = class person{

    /**
     * constructor - Creates an instance of the model stored in webservice
     *
     * @param  {obejct} input    Data for the new instances. Input for each field of the model.
     */
    constructor({
        id,
        firstName,
        lastName,
        email,
        companyId
    }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.companyId = companyId;
    }
}
