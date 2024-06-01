
module.exports = {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    db_port: process.env.DB_PORT,
    define: {
        logging: false,
        freezeTableName:true,
        timestamps: false,
        underscored: true,
        underscoredAll: true,
    },
};
