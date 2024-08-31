const Users = require('../../models/user.model');

const UsersTPO = async (req, res) => {
    const tpoUsers = await Users.find({role: "tpo_admin"});
    res.json({tpoUsers})
}

module.exports = UsersTPO;