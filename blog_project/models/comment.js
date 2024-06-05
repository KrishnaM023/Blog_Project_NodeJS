const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Blog = require('./blog');

const Comment = sequelize.define('Comment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Blog.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Blog);

module.exports = Comment;





