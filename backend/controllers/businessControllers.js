const {promiseDb} = require("../config/db")

const saveBusinessProfile = async(req,res) => {
    try{
        const {user_id, company_name, description, address} = req.body

        const loggedInUserId = req.user.userId
        const userType = req.user.userType

        if(loggedInUserId !== user_id){
            return res.status(403).json({message: "Unauthorized: cannot modify another user's profile"})
        }

        if(userType !== "company"){
            return res.status(403).json({message:"Unauthorized: Only business accounts can create/update business profiles" })
        }
        const [existingProfile] = await promiseDb.query(
            "SELECT * FROM business_profiles WHERE user_id = ?", [user_id]
        )
        if(existingProfile.length > 0){
            await promiseDb.query(
                `UPDATE business_profiles SET company_name = ?, description = ?, address = ? 
                WHERE user_id = ?`,
                [company_name, description, address, user_id]
            )
            return res.status(200).json({message: "Business profile succesfully updated"})
        } else {
            await promiseDb.query(
                `INSERT INTO business_profiles (user_id, company_name, description, address)
                VALUES(?,?,?,?)`,
                [user_id, company_name, description, address]
            )
            return res.status(201).json({message:"Business profile created successfully"})
        }
    }catch(error){
        console.log("Save business profile", error);
        res.status(500).json({message: "Internal server error"})
    }
}

const getBusinessProfile = async(req, res) => {
    try {
        const loggedInUserId = req.user.user_id
        const userType = req.user.userType
        if(userType !== "company"){
            return res.status(403).json({message: "Unauthorized: Only business account can access this profile"})
        }
        const [profile] = await promiseDb.query(
            `SELECT * FROM business_profiles WHERE user_id = ?`, [loggedInUserId]
        )
        if(profile.length === 0){
            return res.status(404).json({message: "Business profile not found"})
        }
        res.status(200).json(profile[0])
    } catch(error){
        console.log("Fetch business profile error", error);
        res.status(500).json({message: "Internal Server Error"})
    }

}

module.exports = {saveBusinessProfile, getBusinessProfile}