import User from '../model/User.js'
import Product from '../model/Product.js'
import Payment from '../model/Payment.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {registerValidation, loginValidation, updateEmailValidation, UpdatePasswordValidation,zipcodeValidation, addressValidation, phoneNumberValidation} from '../validation.js'

import data from '../data.js'

export const register = (req,res) => {

    const {error, value} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    User.findOne({email:req.body.user.email}, (err,data) =>{
        if(data)
            res.status(400).send('Email already exists');
    });

    //const salt = bcrypt.genSalt(10);
    //const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let hash = bcrypt.hashSync(req.body.user.password, bcrypt.genSaltSync(10));

    //console.log(salt);
    //console.log(hashedPassword);


    const user = new User({
        name: req.body.user.name,
        email: req.body.user.email,
        password: hash,
        //address: req.body.user.address,
        //zipcode: req.body.user.zipcode,
        //phoneNumber: req.body.user.phoneNumber,
        userType: req.body.user.userType,
        isVerified: false
    });
    console.log(user)

    user.save( (err) =>{
        if(err)
            res.status(404).send('Could not create');

        res.status(200).send('Data has been stored!\n');
    })
};

//Login
export const login = (req, res) => {

    //Validating the data
    const {error, value} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the email exists in the database
    User.findOne({email:req.body.user.email}, (err,data) =>{
        if(!data){
            res.status(400).send('Email does not exists');
        }
        const result = bcrypt.compareSync(req.body.user.password, data.password);
        if(!result){
            return res.status(400).send('Invalid password');
        }
        const token = jwt.sign({ _id: data._id }, process.env.TOKEN_SECRET);
        res.header('authToken', token).send({name: data.name, userID: data._id});

    });

    //res.send('Logged In');
};

export const getUser = (req, res) => {

    User.findOne({_id:req.params.id}, (err,data) => {

        if(err)
            res.status(400).send('No such data found');

        res.status(200).send({userName:data.name, userVerified:data.isVerified, userEmail:data.email, userAddress:data.address, userZipcode:data.zipcode, userPhoneNumber:data.phoneNumber, userType:data.userType})
    });


}

//update Email
export const updateEmail = (req,res) => {

    console.log(req.body);

    const {error, value} = updateEmailValidation(req.body);
    if(error) {
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    User.findByIdAndUpdate({_id:req.body.id}, {email: req.body.email},function (err, result) {
        if(err){
            res.send(err);
        } else{
            res.send(result);
        }
    });
};

//update Password
export const updatePassword = (req,res) => {
    console.log(req.body);
    const { error } = UpdatePasswordValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let hash = bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync(10));

    console.log(hash)

    User.findByIdAndUpdate({_id:req.body.id}, {password: hash},function (err, result) {
        if(err){
            res.send (err);
        } else{
            res.send(result);
        }
    });
};

//update zipcode
export const updateZipCode = (req,res) => {
    console.log(req.body);
    const { error } = zipcodeValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    User.findByIdAndUpdate({_id:req.body.id}, {zipcode:req.body.zipcode},function (err, result) {
        if(err){
            res.send (err);
        } else{
            res.send(result);
        }
    });
};

//update address
export const updateAddress = (req,res) => {
    console.log(req.body);
    const { error } = addressValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    User.findByIdAndUpdate({_id:req.body.id}, {address:req.body.address},function (err, result) {
        if(err){
            res.send (err);
        } else{
            res.send(result);
        }
    });
};

//update phone number
export const updatePhoneNumber = (req,res) => {
    console.log(req.body);
    const { error } = phoneNumberValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    User.findByIdAndUpdate({_id:req.body.id}, {phoneNumber:req.body.phoneNumber},function (err, result) {
        if(err){
            res.send (err);
        } else{
            res.send(result);
        }
    });
};


/*export const getProducts = (req, res) => {
    res.send(data.products);
}*/

export const getProducts = (req, res) => {
    Product.find({}, (err, data) => {
        if(err){
            res.status(400).send('No product found.');
        }
        res.status(200).send(data);
    });
}

export const makeProduct = (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    });
    product.save( (err) =>{
        if(err)
            res.status(404).send('Could not create product');

        res.status(200).send('Product data has been stored!\n');
    })
}

export const getUnverified = (req,res) => {

    User.find( {isVerified:false}, (err,data) =>{
        if(err)
            res.status(400).send('Error getting data!')

        const toSend = data.map(element => ({name:element.name, email:element.email, userType:element.userType}));

        res.status(200).send(toSend);
    });

}

export const verify = (req, res) => {
    User.findOneAndUpdate({email:req.body.email}, {isVerified: true}, {new:true},function (err, result) {
        if(err){
            res.send (err);
        } else{
            res.send(result.isVerified);
        }
    });
}

export const getUsers = (req,res) => {

    User.find({isVerified:true}, (err,data) => {

        if(err)
            res.status(400).send('An error occurred');

        const toSend = data.map(element => ({name:element.name, email:element.email, userType:element.userType}));
        res.status(200).send(toSend);

    });
}

export const ban = (req,res) => {

    console.log('Gets here')
    console.log(req.body.email);

        
    User.findOneAndRemove( {email:req.body.email, userType: {$in: [1, 2]} }, (err2,data2) => {

        if(err2)
            res.status(404).send('Account not found');

    
        res.status(200).send('Account has been deleted!');
    
    });

}

//Adding a product into cart
export const addToCart = (req, res) => {
    User.findOneAndUpdate(
        {_id:req.params.id},
        {$push: {
            cart: {
                id: req.productId, //Change this to however you are passing in the product ID from the frontend
                date: Date.now()
            }
        }},
        {new: true},
        (err, userInfo) => {
            if(err){
             res.status(400).send('No such data found');
            }
            res.status(200).json(userInfo.cart);
    });
}

//Every below is for successful payment, but it is still in construction, ignore for now

export const successBuy = (req, res) => {
    let history = [];
    let transactionData = {};
    console.log('we got to successBuy');
    //User Collection
    /*req.body.orderDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentID: req.body.paymentData.paymentID
        });
    })*/
    var i;
    
    for(i = 0;i < req.body.variables.orderDetail.length; i++){
        if(req.body.variables.orderDetail[i] !== null){
            history.push({
                dateOfPurchase: Date.now(),
                name: req.body.variables.orderDetail[i].name,
                id: req.body.variables.orderDetail[i]._id,
                price: req.body.variables.orderDetail[i].price,
                quantity: req.body.variables.orderDetail[i].quantity,
                paymentID: req.body.variables.paymentData.paymentID
            })
        }
    }

    //Payment Collection
    transactionData.user = {
        id: req.body.variables.userInfo.id,
        name: req.body.variables.userInfo.name,
        email: req.body.variables.userInfo.email,
        address: req.body.variables.userInfo.address,
        zipcode: req.body.variables.userInfo.zipcode,
        phoneNumber: req.body.variables.userInfo.phoneNumber,
        type: req.body.variables.userInfo.type
    };
    transactionData.data = req.body.variables.paymentData;
    transactionData.product = history;

    console.log('we got to successBuy 4');
    User.findOneAndUpdate(
        {id: req.body.variables.userInfo.id},
        {$push: {history: history}, $set: {cart: []}},
        {new: true},
        (err, user) => {
            if(err){
                res.json({success: false, err});
            }
            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if(err){
                    res.json({success: false, err});
                }
                res.json({success: true});
            })
        }
    )
    //res.send('end of successBuy');
}

export const getPaymentByZip = (req, res) => {
    Payment.find({
        //This here is such bullshit but it works
        'user.0.zipcode': req.body.zipcode,
        isDelivered: false
    }, (err, data) => {
        if(err){
            res.status(400).send('error during getPaymentByZip');
        }
        const toSend = data.map(element => ({
            _id: element._id,
            user: element.user,
            product: element.product
        }));
        res.status(200).send(toSend);
    })
}


export const delivered = (req, res) => {
    Payment.findOneAndUpdate({
        _id:req.body._id
    }, {
        isDelivered: true
    }, {
        new: true
    }, (err, data) => {
        if(err){
            res.status(400).send('error during delivered');
        }
        res.status(200).send('successfully delivered');
    })
}

export const getPaymentById = (req, res) => {
    Payment.findOne({
        _id: req.body._id
    }, (err, data) => {
        if(err){
            res.status(400).send('error during getPaymentById');
        }
        const toSend = {
            //_id: data._id,
            user: data.user,
            product: data.product
        };
        res.status(200).send(toSend);
    })
}

export const getOrderStatus = (req, res) => {
    Payment.find({
        'user.0.email': req.body.email
    }, (err, data) => {
        if(err){
            res.status(400).send('error during getOrderStatus')
        }
        const toSend = data.map(element => ({
            paymentID: element.data[0].paymentID,
            isDelivered: element.isDelivered
        }));

        res.status(200).send(toSend);       
    })
}