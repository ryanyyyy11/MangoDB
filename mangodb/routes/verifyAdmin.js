export default function(req, res, next){
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({mes: 'Admin Token is not valid.'});
}