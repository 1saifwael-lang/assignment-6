const { Model, DataTypes } = require("sequelize");

class Post extends Model {}

module.exports = (sequelize) => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
      paranoid: true, // soft delete
    }
  );

  return Post;
};
//------------------------------------------------------------------------------------
const { Model, DataTypes } = require("sequelize");

class Comment extends Model {}

module.exports = (sequelize) => {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: DataTypes.TEXT,
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  return Comment;
};
//***************************************************************************** */
//**api */
//create user
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const user = User.build({ name, email, password });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//create -- update   useer 
exports.upsertUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.upsert(
    { id, ...req.body },
    { validate: false }
  );
  res.json(user);
};
// find using mails 
exports.findByEmail = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.query.email },
  });
  res.json(user);
};
//find using id
exports.findById = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["role"] },
  });
  res.json(user);
};
