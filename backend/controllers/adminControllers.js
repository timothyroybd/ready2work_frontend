const { promiseDb } = require("../config/db");

const getAllUsers = async (req, res) => {
    try {
        const { userType,search, location, yearsOfExperience, programmingLanguage, frameworks, otherSkills } = req.query;

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
        `;

        const queryParams = [];

        // Filter by userType if provided
       // Handle userType filter
        if (userType && search) {
            query += ` WHERE users.user_type = ? AND (users.email LIKE ? OR business_profiles.company_name LIKE ?)`;
            queryParams.push(userType, `%${search}%`, `%${search}%`);
        } else if (userType) {
            query += ` WHERE users.user_type = ?`;
            queryParams.push(userType);
        } else if (search) {
            query += ` WHERE (users.email LIKE ? OR business_profiles.company_name LIKE ?)`;
            queryParams.push(`%${search}%`, `%${search}%`);
        }

        

        const [users] = await promiseDb.query(query, queryParams);

        // Format the response
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
module.exports = getAllUsers