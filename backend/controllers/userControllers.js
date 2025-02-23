const promiseDb = require("../config/db")

const getUserProfile = async (req, res) =>{

    try {
        const {id} = req.params

    const [profile] = await promiseDb.query(
        `SELECT * FROM users WHERE id =?`, [id]
    )

    if(profile.length === 0){
        return res.status(404).json({message: "User not found!"})
    }
    } catch(error){
        console.log(`Error ${error}`);
        return res.status(500).json({message: "Internal server error"})
    }
    
}

module.exports = {getUserProfile}