const isAdmin = (req, res,next)=>{
    if(req.user && (req.user.role === 'admin' || req.user.role === 'job_poster')){
        return next();
    }
    res.status(403).json({error: 'Access denied, admins only.'});
};

module.exports=isAdmin;