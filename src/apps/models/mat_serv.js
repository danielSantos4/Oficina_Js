const DataTypes = require('sequelize').DataTypes
const { Model } = require('sequelize')

class Mat_serv extends Model {
    static init(sequelize) {
        super.init({
            id_serv: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true
                },
            id_mat: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true
            },
            quant: {
                type: DataTypes.INTEGER.UNSIGNED,
            }
        }, 
        {
            sequelize,
        });
        return this;
    }
}

module.exports = Mat_serv