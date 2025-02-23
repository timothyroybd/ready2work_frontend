const {promiseDb} = require("../config/db")

const saveBusinessProfile = async(req,res) => {
    try{
        const { company_name, description, address} = req.body

        // const loggedInUserId = req.user.userId
        const userType = req.user.userType

        const user_id = req.user.userId
        console.log(`Usertype: ${userType} & id: ${user_id}`)

       if(!user_id){
         return res.status(403).json({message:"Unauthorized: Only business accounts can create/update business profiles" })
       }

        if(userType !== "company"){
            return res.status(403).json({message:"Unauthorized: Only business accounts can create/update business profiles" })
        }
        const [existingProfile] = await promiseDb.query(
            "SELECT * FROM business_profiles WHERE user_id = ?", [user_id]
        )
        if(existingProfile.length > 0){
            console.log(`I am in already exisint profile`);
            await promiseDb.query(
                `UPDATE business_profiles SET company_name = ?, description = ?, address = ? 
                WHERE user_id = ?`,
                [company_name, description, address, user_id]
            )
            return res.status(200).json({message: "Business profile succesfully updated"})
        } else {
            console.log(`I am in creating a new profile`);
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
        const user_id = req.user.userId
        const userType = req.user.userType

        if(!user_id){
            return res.status(403).json({message: "Unauthorized access!"})
        }
        if(userType !== "company"){
            return res.status(403).json({message: "Unauthorized: Only business account can access this profile"})
        }
        const [profile] = await promiseDb.query(
            `SELECT * FROM business_profiles WHERE user_id = ?`, [user_id]
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

const createTask = async(req, res) => {
   try{
     const user_id = req.user.userId
    const user_type = req.user.userType
    const { task_name, description, required_skills, experience_level, status, priority, due_date} = req.body

    if(!user_id || user_type !== "company" ){
        return res.status(403).json({message: "Unauthorized! No access to restricted asset"})
    }
    if(!task_name || !description || !required_skills || !experience_level || !status || !priority || !due_date) {
        return res.status(400).json({message: "missing required fields"})
    }

    const formattedSkills = Array.isArray(required_skills) ? required_skills.join(","): required_skills || ""

    const taskStatus = status || "Open"
    const taskPriority = priority || "Medium"
    await promiseDb.query(
        `INSERT INTO tasks (user_id, task_name, description, required_skills, experience_level, status, priority, due_date) VALUES(?,?,?,?,?,?,?,?)`, [user_id, task_name, description, formattedSkills, experience_level, status, priority, due_date ]
    )
    res.status(201).json({message: "Task created successfully"})
   } catch(error){
    console.log("Create task error", error);
    res.status(500).json({message: "Internal Server error"})
   }


}
module.exports = {saveBusinessProfile, getBusinessProfile, createTask}