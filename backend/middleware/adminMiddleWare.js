const adminMiddleWare = (req, res, next) => {
    try {
        console.log("Decoded User:", req.user);

        if(!req.user || req.user.is_admin !== true){
            return res.status(403).json({message: "Unauthorized: admin access only"})
        }
        next()
    }catch(error){
        return res.status(403).json({message: `Invalid or expired token ${error}`})
    }
}

module.exports = adminMiddleWare