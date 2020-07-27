module.exports = {

    editProfile: async (req, res) => {
        const db = req.app.get('db'),
        {id} = req.params,
        {first_name, last_name, username, profile_pic} = req.body,
        
        updated = await db.edit_profile({id,first_name, last_name, username, profile_pic});
        if (!updated[0]){
            return res.status(200).send(updated)
        }
    }


}