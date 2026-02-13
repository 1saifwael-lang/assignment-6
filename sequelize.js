module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true, // built-in validation
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkPasswordLength(value) {
            if (value.length <= 6) {
              throw new Error("Password must be longer than 6 characters");
            }
          },
        },
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          if (user.name.length <= 2) {
            throw new Error("Name must be longer than 2 characters");
          }
        },
      },
    }
  );

  return User;
};
