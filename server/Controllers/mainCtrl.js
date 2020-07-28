module.exports = {

    editProfile: async (req, res) => {
        const db = req.app.get('db'),
        {id} = req.params,
        {first_name, last_name, username, profile_pic} = req.body,
        
        updated = await db.edit_profile({id,first_name, last_name, username, profile_pic});
        if (!updated[0]){
            return res.status(200).send(updated)
        }
    },

    createPost: async (req, res) => {
        const db = req.app.get('db'),
        {author_id} = req.params,
        {title, image, content} = req.body

    posted = await db.create_post({title, image, content, author_id});
    if(!posted[0]){
        return res.status(200).send(posted)
        }
    },

    getPosts: async (req, res) => {
        const db = req.app.get('db'),
        {title, image, content} = req.body

    allPosts = await db.get_all_posts({title, image, content});
    if(!allPosts[0]){
        return res.status(200).send(allPosts)
        }
    },


}