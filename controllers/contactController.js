//El asyncHandler me ahorra escribir todos los try catch para los errores
const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

//@description get all contacts
//@route GET /api/contacts
//@acces private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id }); 
    res.status(201).json(contacts);
});

//@description get individual contact
//@route GET /api/contacts/:id
//@acces private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(201).json(contact);
});

//@description Create new contact
//@route POST /api/contacts
//@acces private
const createContact = asyncHandler(async (req, res) => {
    console.log("Request body: ", req.body);

    //obtengo la info json
    const {name, email, phone} = req.body;
    //Verifico que este todo
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    //create contact
    const contact = await Contact.create({
        name, 
        email,
        phone,
        user_id: req.user.id //is the user who created the contact
    })
    
    res.status(201).json(contact);
});

//@description Create new contact
//@route POST /api/contacts
//@acces private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    //Check that the user is trying to update HIS contact and not someone else's
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have permission to update others users contacts");
    };

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, //find by id number
        req.body,  //update to whatever the user sent
        {new: true}
    );

    res.status(201).json(updatedContact);
});

//@description delete contact
//@route POST /api/contacts
//@acces private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    //Check that the user is trying to delete HIS contact and not someone else's
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have permission to delete others users contacts");
    };

    await contact.deleteOne({_id: req.params.id});
    res.status(201).json(contact);
});

module.exports = { 
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact 
};