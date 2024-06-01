const Mat_serv = require('../models/mat_serv');
const Material = require('../controllers/MaterialController');

class Mat_servController {
    async create( req, res ){
        console.log("Creating a material_service relation ... ");
        const materialId = await Material.mat_ser_getOne( req, res );
        const mat_servVerify = await Mat_serv.findOne({
            where: {
                id_serv: req.body.id_serv,
                id_mat: materialId,
            }
        })
        if(mat_servVerify) { return res.status(400).json({message: "Relation Serv and Material already exist ... "});}
        req.body.id_mat = materialId;
        delete req.body.nomeMat;
        const mat_serv = await Mat_serv.create(req.body);
        if(!mat_serv) { res.status(400).json({message: "Error in Material_Service creation ... "});}
        return res.send({message: "Material_Service relation created with success ... "});
    }

    async update( req,res ){
        console.log("Updating a material_service relation ... ");
        const materialId = await Material.mat_ser_getOne( req, res );
        const mat_servVerify = await Mat_serv.findOne({
            where: {
                id_serv: req.body.id_serv,
                id_mat: materialId,
            }
        });
        if(!mat_servVerify) { return res.status(400).json({message: "Material Service relation not finded with this entry ... "});}
        mat_servVerify.quantid = mat_servVerify.quantid + 1;
        mat_servVerify.save();
        return res.send({message: "Update with success ... "});
    }
}

module.exports = new Mat_servController()