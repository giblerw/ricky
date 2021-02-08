//dependencies
const router = require("express").Router();
const editController = require("../../controllers/editController")


//Matches with "/api/edit/:id"
router.route("/")
    .put(editController.update)

module.exports = router
