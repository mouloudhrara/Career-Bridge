const isAdmin = (req, res)=>{
    if(req.user && req.user.role=== 'admin'){
        return next();
    }
    res.status(403).json({error: 'Access denied, admins only.'});
};

module.exports=isAdmin;