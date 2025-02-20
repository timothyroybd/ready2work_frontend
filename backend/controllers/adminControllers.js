const {promiseDb} = require("../config/db")

const getAllUsers = async(req, res) => {
    try{
        
        const [users] = await promiseDb.query(
            `SELECT id, email, user_type, is_admin, created_at FROM users `
        )
        res.status(200).json(users)
    }
    catch(error){
        console.log("Get all users error", error);
        res.status(500).json({message: "Internal Server error"})
    }
}

const getUserProfile = async(req, res) => {
    try{
        const {id} = req.params
        const [user] = await promiseDb.query(`SELECT * FROM users WHERE ID = ?`, [id])

        if(user.length === 0){
            return res.status(404).json({message: "User not found"})
        }
        let profile = null
        if(user[0].user_type = "developer"){
            const [devProfile] = await promiseDb.query(
                `SELECT * FROM developer_profile WHERE user_id = ?`, [id]
            )
            profile = devProfile.length > 0 ? devProfile[0]: null
        }
        res.status(200).json({
            user: user[0],
            profile: profile || "No profile available"
        })
    }
    catch (error){

        console.log("Get user profile error", errpr);
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {getAllUsers, getUserProfile}