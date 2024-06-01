const DataTypes = require('sequelize').DataTypes
const { Model } = require('sequelize')

class Serv extends Model {
    static init(sequelize) {
        super.init({
            id_serv: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true
              },
              func: DataTypes.STRING(15),
              veic: DataTypes.STRING(7),
              data_in: DataTypes.DATEONLY,
              data_out: DataTypes.DATEONLY,
              desc_serv: DataTypes.STRING(100),
              preco: DataTypes.FLOAT,
        },
        {
            sequelize,
        });
        return this;
    }
}

module.exports = Serv