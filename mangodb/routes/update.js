import express from 'express'
import * as authControl from '../controller/authController.js'
import verify from './verifyToken.js';


const updateRouter = express.Router();

//Update Email
updateRouter.put('/updateEmail', authControl.updateEmail);

//Update Password
updateRouter.put('/updatePassword', authControl.updatePassword);
//updateRouter.post('/updatePassword', verify, authControl.updatePassword);

updateRouter.put('/updateZipCode', authControl.updateZipCode);
updateRouter.put('/updateAddress', authControl.updateAddress);
updateRouter.put('/updatePhoneNumber', authControl.updatePhoneNumber);



//Delete Account
/*router.post('/deleteAccount', verify, async (req, res) => {

    User.findByIdAndDelete({_id:req.user._id},function (err, result) {
        if(err){
            res.send (err);
        } 
    });
});*/

export default updateRouter;