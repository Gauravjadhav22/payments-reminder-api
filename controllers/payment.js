const Payment = require("../models/payment")
const { StatusCodes } = require('http-status-codes');


const createPayment = async (req, res) => {

    req.body.user = req.user.userId;
    console.log("paymemenernene");
    const response = await Payment.create(req.body);

    res.status(StatusCodes.CREATED).json({ response })

}


const getAllPaymentsOfUser = async (req, res) => {



    const _id = req.user.userId
    const response = `await Payment.findById({user:_id})` // gives error bcoz findById requires _id 
    console.log("arrieved");
    
    res.status(StatusCodes.OK).json({ response })
}



const getPayment = async (req, res) => {

    const { id } = req.params


    const response = await Payment.findOne({ _id: id })
    //using populate we can get the creater or the user or owner of this payment or object 
    //this can be only achieve when we referenced 
    //one model to other to access those information without making another query 

    // .populate('user').
    // exec(function (err, payment) {
    //   if (err) return handleError(err);
    //   console.log('The author is %s', payment.user.username);
    //   // prints "The author is Ian Fleming"
    // });

    res.status(StatusCodes.OK).json({ response })



}







const updatePayment = async (req, res) => {
    const { id } = req.params;

    const findPayment = await Payment.findById({ _id: id })

    if (!findPayment) {
        res.status(404).json({ 'msg': 'payment not found' })
    }

    const response = await Payment.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(StatusCodes.OK).json({ response });

}



const deletePayment = async (req, res) => {

    const { id } = req.params;

    const response = await Payment.findByIdAndDelete({
        _id: id
    })

    res.status(StatusCodes.OK).json({ response })



}


module.exports = {
    getAllPaymentsOfUser, getPayment, createPayment, deletePayment, updatePayment
}







