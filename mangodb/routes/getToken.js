import jwt from 'jsonwebtoken';

export default function(user){
    return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
}