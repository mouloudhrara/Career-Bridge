const isAdmin = (req, res,next)=>{
    if(req.user && req.user.role=== 'admin'){
        return next();
    }
    res.status(403).json({error: 'Access denied, admins only.'});
};

module.exports=isAdmin;