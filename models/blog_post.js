'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blog_post.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    catagories: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'blog_post',
  });
  return blog_post;
};