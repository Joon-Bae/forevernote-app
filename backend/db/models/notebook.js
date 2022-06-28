'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteBook = sequelize.define('NoteBook', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  NoteBook.associate = function(models) {
    NoteBook.belongsTo(models.User, {
      foreignKey: "userId"
    })
    NoteBook.hasMany(models.Note, {
      foreignKey: "notebookId"
    })
  };
  return NoteBook;
};
