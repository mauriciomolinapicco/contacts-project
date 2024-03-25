const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const {
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact  } 
    = require("../controllers/contactController");

//this way i use the validation token on all routes
router.use(validateToken);
//if i only need it for some routes i can do it like:
//router.get("/current", validateToken,currentUser);

router.route("/").get(getContacts).post(createContact); 
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

//export router 
module.exports = router;