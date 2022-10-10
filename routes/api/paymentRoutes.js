const express = require("express");
const router = express.Router();

const { getAllPaymentsOfUser, getPayment, createPayment, deletePayment, updatePayment } = require('../../controllers/payment')

router.route("/").get(getAllPaymentsOfUser).post(createPayment)
router.route("/:id").get(getPayment).patch(updatePayment).delete(deletePayment)

module.exports = router;