const DataTypes = require('sequelize').DataTypes
const { Model } = require('sequelize')

class Veic extends Model {
    static init(sequelize) {
        super.init({
            placa_frota: {
                type: DataTypes.STRING(7),
                allowNull: false,
                primaryKey: true
              },
              prop: DataTypes.STRING(15),
              modelo: DataTypes.STRING(10),
              cor: DataTypes.STRING(20),
        },
        {
            sequelize,
        });
        return this;
    }
}

module.exports = Veic