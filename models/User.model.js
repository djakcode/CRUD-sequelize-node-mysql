const { DataTypes } = require("sequelize");
const db = require("../config/db");

// ! Define User model
const User = db.define(
  "User",
  {
    prenom: {
      type: DataTypes.STRING,
      allowNull: false, // required field
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "picture",
      allowNull: false, // required field
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // required field
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // required field
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // required field
      defaultValue: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // required field
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false, // required field
      defaultValue: "user",
      validate: {
        isIn: [["user", "moderator", "admin", "superadmin"]],
      },
    },
  },
  {
    timestamps: true, // createdAt and updatedAt fields
    underscored: true, // use snake_case for column names
  }
);

module.exports = User;
