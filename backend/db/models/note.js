'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    userId: DataTypes.INTEGER,
    notebookId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.User, {
      foreignKey:"userId"
    });
    Note.belongsTo(models.NoteBook, {
      foreignKey:"notebookId"
    })
  };
  return Note;
};
