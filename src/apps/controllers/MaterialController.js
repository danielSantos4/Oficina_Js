const Material = require('../models/material');

class MaterialController {
    async create( req, res ) {
        console.log("Creating material ... ");
        const materialVerify = await Material.findOne({
            where:{ nome: req.body.nome }
        });
        if(materialVerify) { res.status(400).json({message: "Material name already registered ..."});}
        req.body.id = "null";
        const mat = await Material.create(req.body);

        if(!mat) { res.status(400).json({message: "Error in creation of new material ... "});}
        res.send({message: "Successfully created ... "});
    }
    
    async update(req, res) {
        console.log("Updating material ... ");
        const material = await Material.findOne({
            where: { nome: req.body.old_nome, }
        })
        if("nome" in req.body) { material.nome = req.body.nome; }
        if("quantid" in req.body) { material.quantid = req.body.quantid; }
        if("preco_compra" in req.body) { material.preco_compra = req.body.preco_compra; }
        if("ultima_compra" in req.body) { 
            const now = new Date();
            const date_material = new Date(req.body.ultima_compra);
            if(now > date_material) {
                const today = `'${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
                material.ultima_compra = today;
            }
        }
        material.save();
        return res.send({message: "Material update with success ... "});
    }

    async getOne( req, res ){
        console.log("Getting a material ... ");
        const material = await Material.findOne({
            where: {nome: req.body.nome, }
        });
        if(!material) { return res.send({message: "Material not finded by nome ... "});}
        return res.send(material);
    }

    async mat_ser_getOne( req, res ) {
        console.log("Getting a Material ID for Mat_Serv ...");
        const material = await Material.getOne({
            where: { nome: req.body.nomeMat, }
        })
        if(!material){ res.status(400).json({message: "Mateiral not finded with this name"});}
        return material.id;
    }
}

module.exports = new MaterialController()