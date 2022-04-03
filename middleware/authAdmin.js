const Users = require('../models/userModel')

const  authAdmin = async (req ,res, next) => {
    try {
        //get user info
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role === 0){
            return res.status(400).json({msg: "yeu cau quyen admin de truy cap"})
        }
        
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin