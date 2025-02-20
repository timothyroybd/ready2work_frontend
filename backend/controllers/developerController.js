const { promiseDb } = require("../config/db");

const saveDeveloperProfile = async (req, res) => {
    try {
        const {
            user_id, phone, location, programming_languages, frameworks, 
            other_skills, soft_skills, years_of_experience, project_types, 
            interested_projects, preferred_work_mode, project_duration, 
            languages, interested_in_collaboration, additional_info
        } = req.body;

        // Ensure values are stored as strings
        const programming_languages_str = Array.isArray(programming_languages) ? programming_languages.join(",") : programming_languages || "";
        const frameworks_str = Array.isArray(frameworks) ? frameworks.join(",") : frameworks || "";
        const other_skills_str = Array.isArray(other_skills) ? other_skills.join(",") : other_skills || "";
        const soft_skills_str = Array.isArray(soft_skills) ? soft_skills.join(",") : soft_skills || "";
        const project_types_str = Array.isArray(project_types) ? project_types.join(",") : project_types || "";
        const interested_projects_str = Array.isArray(interested_projects) ? interested_projects.join(",") : interested_projects || "";
        const languages_str = Array.isArray(languages) ? languages.join(",") : languages || "";

        // **Check if profile exists**
        const [existingProfile] = await promiseDb.query(
            "SELECT * FROM developer_profiles WHERE user_id = ?", [parseInt(user_id)]
        );

        if (existingProfile.length > 0) {
            // **Update existing profile**
            await promiseDb.query(
                `UPDATE developer_profiles 
                SET phone = ?, location = ?, programming_languages = ?, frameworks = ?, 
                    other_skills = ?, soft_skills = ?, years_of_experience = ?, project_types = ?, 
                    interested_projects = ?, preferred_work_mode = ?, project_duration = ?, 
                    languages = ?, interested_in_collaboration = ?, additional_info = ?, updated_at = CURRENT_TIMESTAMP
                WHERE user_id = ?`,
                [
                    phone, location, programming_languages_str, frameworks_str, 
                    other_skills_str, soft_skills_str, years_of_experience, project_types_str, 
                    interested_projects_str, preferred_work_mode, project_duration, 
                    languages_str, interested_in_collaboration, additional_info, parseInt(user_id)
                ]
            );
            return res.status(200).json({ message: "Profile updated successfully" });
        } else {
            // **Insert new profile**
            await promiseDb.query(
                `INSERT INTO developer_profiles 
                (user_id, phone, location, programming_languages, frameworks, other_skills, 
                soft_skills, years_of_experience, project_types, interested_projects, 
                preferred_work_mode, project_duration, languages, interested_in_collaboration, 
                additional_info, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`, 
                [
                    parseInt(user_id), phone, location, programming_languages_str, frameworks_str, 
                    other_skills_str, soft_skills_str, years_of_experience, project_types_str, 
                    interested_projects_str, preferred_work_mode, project_duration, 
                    languages_str, interested_in_collaboration, additional_info
                ]
            );
            return res.status(201).json({ message: "Profile created successfully" });
        }
    } catch (error) {
        console.error("Save profile error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const getDeveloperProfile = async (req, res) => {
    try {

        const  user_id  = req.user.userId;
        const [profile] = await promiseDb.query(
            "SELECT * FROM developer_profiles WHERE user_id = ?", [user_id]
        );

        if (profile.length === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile[0]);
    } catch (error) {
        console.error("Fetch profile error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { saveDeveloperProfile, getDeveloperProfile };
