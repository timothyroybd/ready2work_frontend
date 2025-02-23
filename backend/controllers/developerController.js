const { promiseDb } = require("../config/db");

const saveDeveloperProfile = async (req, res) => {
    try {
        const {
             phone, location, programming_languages, frameworks, 
            other_skills, soft_skills, years_of_experience, project_types, 
            interested_projects, preferred_work_mode, project_duration, 
            languages, interested_in_collaboration, additional_info, projects
        } = req.body;
        const user_id = req.user.userId

        if(!user_id){
            return res.status(403).json({message: "Unauthorized: you can only modify your own profile"})
        }

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
            if(projects && Array.isArray(projects)){
                const [existingProjects] = await promiseDb.query(
                    `SELECT id FROM developer_projects WHERE developer_id = ?`, [parseInt(user_id)]
                )
                const existingProjectIds = existingProjects.map(p => p.id)
                const receivedProjectIds = projects.map(p => p.id).filter(id => id !== null)

                //delete projects not included in the payload
                const projectsToDelete = existingProjectIds.filter(id => !receivedProjectIds.includes(id))

                if(projectsToDelete.length > 0){
                    await promiseDb.query(
                        `DELETE FROM developer_projects WHERE id IN (?)`, [projectsToDelete]
                    )
                }
                for(const project of projects){
                    if(project.id){
                        await promiseDb.query(
                            `UPDATE developer_projects
                            SET project_title = ?, project_description = ?, project_link = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
                            [project.project_title, project.project_description, project.project_link, project.id]
                        )
                    }else {
                        await promiseDb.query(
                            `INSERT INTO developer_projects (developer_id, project_title, project_description, project_link) VALUES(?,?,?,?)`, 
                        [parseInt(user_id),project.project_title, project.project_description, project.project_link]
                        ) 
                    }
                }
            }
            
            return res.status(201).json({ message: "Profile created successfully" });
        }
    } catch (error) {
        console.error("Save profile error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const getDeveloperProfile = async (req, res) => {
    try {

        const  {id}  = req.params;
        if (req.user.userId !== parseInt(id)) {
            return res.status(403).json({ message: "Unauthorized: You can only access your own profile" });
        }
        console.log(id)
        const [profile] = await promiseDb.query(
            "SELECT developer_profiles.*, users.email, users.user_type FROM developer_profiles INNER JOIN users ON developer_profiles.user_id = users.id WHERE developer_profiles.user_id = ?", [id]
        );

        if (profile.length === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }
        const [projects] = await promiseDb.query(
            `SELECT id, project_title, project_description, project_link
            FROM developer_projects
            WHERE developer_id = ?`,
            [id]
        )

        res.status(200).json(
            {profile: profile[0],
            projects: projects
            }
        );
    } catch (error) {
        console.error("Fetch profile error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const editDeveloperPorifle = async(req, res) => {
    try {
        const user_id = req.user.userId
    if(!user_id){
        return res.send(403).json({message: "Unauthorized: You can only modify your own profile"})
    }
    const {phone, location, programming_languages, frameworks, 
            other_skills, soft_skills, years_of_experience, project_types, 
            interested_projects, preferred_work_mode, project_duration, 
            languages, interested_in_collaboration, additional_info, projects } = req.body
    let query = `UPDATE developer_profiles SET `
    const queryParams = []

    if(phone !== undefined){
        query += "phone = ? "
        queryParams.push([phone])
    }
    if(location !== undefined){
        query += "location = ?, "
        queryParams.push(location)
    }
    if(programming_languages !== undefined){
        query += "programming_languages = ?, "
        queryParams.push(programming_languages)
    }
    if(frameworks !== undefined){
        query += "frameworks = ?, "
        queryParams.push(frameworks)
    }
    if(other_skills !== undefined){
        query += "other_skills = ?, "
        queryParams.push(other_skills)
    }
    if(soft_skills !== undefined){
        query += "soft_skills = ?, "
        queryParams.push(soft_skills)
    }
    if(years_of_experience !== undefined){
        query += "years_of_experience = ?, "
        queryParams.push(years_of_experience)
    }
    if(project_types !== undefined){
        query += "project_types = ?, "
        queryParams.push(project_types)
    }
    if(interested_projects !== undefined){
        query += "interested_projects = ?, "
        queryParams.push(interested_projects)
    }
    if(preferred_work_mode !== undefined){
        query += "preferred_work_mode = ?, "
        queryParams.push(preferred_work_mode)
    }
    if(project_duration !== undefined){
        query += "project_duration = ?, "
        queryParams.push(project_duration)
    }
    if(languages !== undefined){
        query += "languages = ?, "
        queryParams.push(languages)
    }
    if(interested_in_collaboration !== undefined){
        query += "interested_in_collaboration = ?, "
        queryParams.push(interested_in_collaboration)
    }
    if(additional_info !== undefined){
        query += "additional_info = ?, "
        queryParams.push(additional_info)
    }
    // if(projects !== undefined){
    //     query += "projects = ?, "
    //     queryParams.push(projects)
    // }

    if(queryParams.length > 0){
        query = query.slice(0, -2)
        query += " WHERE user_id = ?"
        queryParams.push(user_id)
        await promiseDb.query(
        query, queryParams
    )
    }

if(projects && Array.isArray(projects)){
    const [existingProjects] = await promiseDb.query(
        `SELECT id FROM developer_projects WHERE developer_id = ?`, [user_id]
    )
    const existingProjectIds = existingProjects.map(p => p.id)
    const receivedProjectIds = projects.map(p => p.id).filter(id => id !== null)

    const projectsToDelete = existingProjectIds.filter(id => !receivedProjectIds.includes(id))

    if(projectsToDelete.length > 0){
        await promiseDb.query(`
            DELETE FROM developer_projects WHERE id IN (?)`, [projectsToDelete])
    }
}

if (projects && Array.isArray(projects)) {
    for(const project of projects){
        if(project.id){
            await promiseDb.query(
                `UPDATE developer_projects SET project_title = ?, project_description = ?, project_link = ?, updated_at = CURRENT_TIMESTAMP where id = ?`, 
                [project.project_title, project.project_description, project.project_link, project.id]
            )
        } else {
            await promiseDb.query(
                `INSERT INTO developer_projects (developer_id, project_title, project_description, project_link) VALUES(?,?,?,?)`,
                [user_id, project.project_title, project.project_description, project.project_link]
            )
        }
    }
}

res.status(200).json({message: "Profile updated succesfully"})

    } catch(error){
        console.log("Update developer profile error", error);
        res.status(500).json({message: "Interna Server Error"})
    }
    


}
module.exports = { saveDeveloperProfile, getDeveloperProfile, editDeveloperPorifle };
