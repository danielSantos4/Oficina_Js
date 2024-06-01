var DataTypes = require("sequelize").DataTypes;
var _func = require("./func");
var _mat_serv = require("./mat_serv");
var _material = require("./material");
var _prop = require("./prop");
var _serv = require("./serv");
var _veic = require("./veic");

function initModels(sequelize) {
  var func = _func(sequelize, DataTypes);
  var mat_serv = _mat_serv(sequelize, DataTypes);
  var material = _material(sequelize, DataTypes);
  var prop = _prop(sequelize, DataTypes);
  var serv = _serv(sequelize, DataTypes);
  var veic = _veic(sequelize, DataTypes);

  serv.belongsTo(func, { as: "func_func", foreignKey: "func"});
  func.hasMany(serv, { as: "servs", foreignKey: "func"});
  veic.belongsTo(prop, { as: "prop_prop", foreignKey: "prop"});
  prop.hasMany(veic, { as: "veics", foreignKey: "prop"});
  serv.belongsTo(veic, { as: "veic_veic", foreignKey: "veic"});
  veic.hasMany(serv, { as: "servs", foreignKey: "veic"});

  return {
    func,
    mat_serv,
    material,
    prop,
    serv,
    veic,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
