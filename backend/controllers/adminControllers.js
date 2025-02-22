const { promiseDb } = require("../config/db");
const { get } = require("../routes/developerRoutes");

const getAllUsers = async (req, res) => {
    try {
        const { userType, search, location, yearsOfExperience, programmingLanguage, frameworks, otherSkills } = req.query;

        let query = `
        SELECT users.id, users.email, users.user_type, users.is_admin, users.created_at, 
               developer_profiles.phone AS dev_phone, developer_profiles.location AS dev_location, 
               developer_profiles.programming_languages AS dev_programming_languages, 
               developer_profiles.frameworks AS dev_frameworks, 
               developer_profiles.other_skills AS dev_other_skills, 
               developer_profiles.languages AS dev_languages, 
               developer_profiles.years_of_experience AS dev_years_of_experience, 
               developer_profiles.interested_projects AS dev_interested_projects, 
               developer_profiles.preferred_work_mode AS dev_preferred_work_mode, 
               developer_profiles.interested_in_collaboration AS dev_interested_in_collaboration,
               developer_profiles.additional_info AS dev_additional_info, 
               developer_profiles.project_types AS dev_project_types, 
               business_profiles.company_name, 
               business_profiles.description, 
               business_profiles.address
        FROM users
        LEFT JOIN developer_profiles ON users.id = developer_profiles.user_id
        LEFT JOIN business_profiles ON users.id = business_profiles.user_id
        WHERE 1=1
        `;

        const queryParams = [];

        if (userType) {
            query += ` AND users.user_type = ?`;
            queryParams.push(userType);
        }
        if (search) {
            query += ` AND (users.email LIKE ? OR business_profiles.company_name LIKE ?)`;
            queryParams.push(`%${search}%`, `%${search}%`);
        }
        if (location) {
            query += ` AND (developer_profiles.location LIKE ? OR business_profiles.address LIKE ?)`;
            queryParams.push(`%${location}%`, `%${location}%`);
        }
        if (yearsOfExperience) {
            query += ` AND developer_profiles.years_of_experience = ?`;
            queryParams.push(yearsOfExperience);
        }
        if (programmingLanguage) {
            query += ` AND developer_profiles.programming_languages LIKE ?`;
            queryParams.push(`%${programmingLanguage}%`);
        }
        if (frameworks) {
            query += ` AND developer_profiles.frameworks LIKE ?`;
            queryParams.push(`%${frameworks}%`);
        }
        if (otherSkills) {
            query += ` AND developer_profiles.other_skills LIKE ?`;
            queryParams.push(`%${otherSkills}%`);
        }

        const [users] = await promiseDb.query(query, queryParams);

        const formattedUsers = users.map(user => {
            if (user.user_type === 'developer') {
                return {
                    id: user.id,
                    email: user.email,
                    user_type: user.user_type,
                    is_admin: user.is_admin,
                    created_at: user.created_at,
                    profile: user.dev_phone
                        ? {
                              phone: user.dev_phone,
                              location: user.dev_location,
                              programming_languages: user.dev_programming_languages
                                  ? user.dev_programming_languages.split(",")
                                  : [],
                              frameworks: user.dev_frameworks
                                  ? user.dev_frameworks.split(",")
                                  : [],
                              other_skills: user.dev_other_skills
                                  ? user.dev_other_skills.split(",")
                                  : [],
                              languages: user.dev_languages
                                  ? user.dev_languages.split(",")
                                  : [],
                              years_of_experience: user.dev_years_of_experience,
                              interested_projects: user.dev_interested_projects
                                  ? user.dev_interested_projects.split(",")
                                  : [],
                              preferred_work_mode: user.dev_preferred_work_mode,
                              interested_in_collaboration: user.dev_interested_in_collaboration === 1,
                              additional_info: user.dev_additional_info,
                              project_types: user.dev_project_types
                                  ? user.dev_project_types.split(",")
                                  : [],
                          }
                        : "No profile available",
                };
            } else if (user.user_type === 'company') {
                return {
                    id: user.id,
                    email: user.email,
                    user_type: user.user_type,
                    is_admin: user.is_admin,
                    created_at: user.created_at,
                    profile: user.company_name
                        ? {
                              company_name: user.company_name,
                              profile_description: user.profile_description,
                              address: user.address,
                          }
                        : "No profile available",
                };
            } else {
                return user;
            }
        });

        res.status(200).json(formattedUsers);
    } catch (error) {
        console.log("Get all users error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, user_type, is_admin } = req.body;

        const [user] = await promiseDb.query("SELECT * FROM users WHERE id = ?", [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Build dynamic query
        let query = "UPDATE users SET ";
        const queryParams = [];
        if (email !== undefined) {
            query += "email = ?, ";
            queryParams.push(email);
        }
        if (user_type !== undefined) {
            query += "user_type = ?, ";
            queryParams.push(user_type);
        }
        if (is_admin !== undefined) {
            query += "is_admin = ?, ";
            queryParams.push(is_admin);
        }

        // Remove trailing comma and space
        query = query.slice(0, -2);

        query += " WHERE id = ?";
        queryParams.push(id);

        await promiseDb.query(query, queryParams);

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Update user error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const updateDeveloperProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            phone, location, programming_languages, frameworks,
            other_skills, soft_skills, years_of_experience, project_types,
            interested_projects, preferred_work_mode, project_duration,
            languages, interested_in_collaboration, additional_info
        } = req.body;

        const [profile] = await promiseDb.query("SELECT * FROM developer_profiles WHERE user_id = ?", [id]);
        if (profile.length === 0) {
            return res.status(404).json({ message: "Developer profile not found" });
        }

        // Build dynamic query
        let query = "UPDATE developer_profiles SET ";
        const queryParams = [];

        const addField = (fieldName, value, isArray = false) => {
            if (value !== undefined) {
                query += `${fieldName} = ?, `;
                queryParams.push(isArray ? (Array.isArray(value) ? value.join(",") : value) : value);
            }
        };

        addField("phone", phone);
        addField("location", location);
        addField("programming_languages", programming_languages, true);
        addField("frameworks", frameworks, true);
        addField("other_skills", other_skills, true);
        addField("soft_skills", soft_skills, true);
        addField("years_of_experience", years_of_experience);
        addField("project_types", project_types, true);
        addField("interested_projects", interested_projects, true);
        addField("preferred_work_mode", preferred_work_mode);
        addField("project_duration", project_duration);
        addField("languages", languages, true);
        addField("interested_in_collaboration", interested_in_collaboration);
        addField("additional_info", additional_info);

        // Remove trailing comma and space
        query = query.slice(0, -2);

        query += " WHERE user_id = ?";
        queryParams.push(id);

        await promiseDb.query(query, queryParams);

        res.status(200).json({ message: "Developer profile updated successfully" });
    } catch (error) {
        console.error("Update developer profile error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const deleteUser = async(req, res) => {

    try {
const {id} = req.params
    const [user] = await promiseDb.query(
        `SELECT * FROM users WHERE id = ?`, [id]
    )

    if(user.length === 0){
        return res.status(404).json({message: "User not found"})
    }
    await promiseDb.query(
        `DELETE FROM users WHERE id =?`, [id]
    )
    await promiseDb.query(
        `DELETE FROM developer_profiles WHERE id =?`, [id]
    )
    await promiseDb.query(
        `DELETE FROM business_profiles WHERE id =?`, [id]
    )
    res.status(200).json({message: "User deleted succesfully"})
    }
    catch(error){
        console.log(`Delete user error ${error}`);
        res.status(500).json({message: "Internal server error"})
    }
    
} 


module.exports = {getAllUsers, updateUser, updateDeveloperProfile, deleteUser};
