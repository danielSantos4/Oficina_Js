const Prop = require('../models/prop');

class PropController {
    async create ( req, res ) {
        console.log("Creating prop ... ")
        const verifyProp = await Prop.findOne({
            where: { 
                cpf_cnpj: req.body.cpf_cnpj,
                nome: req.body.nome,
            }
        });
        if (verifyProp) {             
            return res.status(400).json({message: "Prop already exist ..."});
        }

        const prop = await Prop.create(req.body);
        if (!prop) { 
            return res.status(400).json({message: "Error in creation ... "});
        }

        return res.send({ message: "Sucefully created"});
    }

    async update ( req, res ) {
        console.log("Updating prop ...");
        const prop = await Prop.findOne({
            where: { 
                cpf_cnpj: req.body.old_cpf_cnpj,
                nome: req.body.old_nome,
            }
        });
        if (prop) {
            const body = req.body;
            if ("cpf_cnpj" in body) { prop.cpf_cnpj = body.cpf_cnpj; }
            if ("nome" in body) { prop.nome = body.nome; }
            if ("telefone" in body) { prop.telefone = body.telefone; }

            const response = await prop.save()
            if (!response) { return res.status(400).json({message: "Error in update ... "}); }
            return res.send({ message: "Updated with successfull" });
        }
        
        return res.send({ message: "Register not found ... "})
    }

    async getOne (req, res) {
        console.log("Getting one proprietary ... ");
        let queryString = "SELECT * FROM Prop WHERE";
        if ("cpf_cnpj" in req.body) { queryString += ` cpf_cnpj='${req.body.cpf_cnpj}' AND`; }
        if ("nome" in req.body) { queryString += ` nome='${req.body.nome}' AND` }
        queryString += ` 1;`;
        console.log(`Printing query message ... \n ${queryString}`)

        const prop = await Prop.sequelize.query(queryString);
        return res.send({ message: prop });
    }

    async getAll( req, res ) {
        console.log("Getting all owners ...");
        const owners = await Prop.sequelize.query("select * from Prop;");
        console.log(owners);
        return res.send({ message: "Test ..."})
    }

    async delete(req, res) {
        console.log("Deleting prop ...")
        return res.send({ message: "not yet implemented" })
    }

    async veic_getOne( req, res ) {
        console.log("Getting one proprietary ... ");
        let queryString = `SELECT * FROM Prop WHERE cpf_cnpj='${req.body.prop}';`;
        
        console.log(`Printing query message ... \n ${queryString}`)

        const prop = await Prop.sequelize.query(queryString);
        console.log(prop);
        if (!prop) { return res.status(400).json({ message: "Employee not founded ..." }); }
        return prop;
    }

}

module.exports = new PropController()