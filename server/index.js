const express = require('express');
const sequelize = require('./sequelize');
const {Op} = require('sequelize');
const cors = require('cors');

const Company = require('../server/models/Company');
const Founder = require('../server/models/Founder');
const { request } = require('express');

const app = express();
app.use(cors());
app.use(express.json());

const port = 8088;

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.listen(port, () => {
    console.log("The server is running on http://localhost:" + port);
});

app.use((err, req, res, next) => {
    console.error("[ERROR]:" + err);
    res.status(500).json({ message: "500 - Server Error" });
});

Company.hasMany(Founder, {foreignKey: 'companyId', source: "id"});
Founder.belongsTo(Company, {foreignKey: 'companyId', targetKey: 'id'});

app.get("/create", async (req, res, next) => {
    try {
      await sequelize.sync({ force: true });
      res.status(201).json({ message: "Database created with the models." });
    } catch (err) {
      next(err);
    }
  });

  app.get('/sync', async (req, res, next) => {
    try {
      await sequelize.sync({ force: true })
      const sampleData = [{
        nume: 'Apple',
        data: '1976-04-01'
      }, {
        nume: 'Samsung',
        data: '1938-03-01'
      }, {
        nume: 'Oppo',
        data: '2004-09-27'
      }]
      for (const item of sampleData) {
        const company = new Company(item)
        await company.save()
      }
      res.status(201).json({ message: 'Sample Database created'})
    } catch (err) {
      next(err)
    }
  });

  // Afisare companii
  app.get("/companies", async(req, res, next) => {
    try{
        const companies = await Company.findAll();
        res.status(200).json(companies);
    } catch (err) {
      next(err);
    }
});

// Adaugare companii
app.post("/companies", async(req, res, next) => {
    try{
        await Company.create(req.body);
        res.status(201).json({message: "Company created"});
    }catch (err) {
      next(err);
    }
});

//Actualizare companie
app.put("/companies/:id", async(req, res, next) =>{
    try{
      const company = await Company.findByPk(req.params.id);
      if(company){
         company.nume = req.body.nume;
         company.data = req.body.data;
         await company.save();
         res.status(202).json({ message: 'Company updated!'})
      }
      else{
          return res.status(404).json({error: `Company not found`});
      }
  }catch(err){
      next(err);
  }
});

// Stergere companie
app.delete("/companies/:id", async(req, res, next) =>{
    try{
      const company = await Company.findByPk(req.params.id);
      if(company){
         await company.destroy();
         res.status(202).json({ message: 'Company deleted!'})
      }
      else{
          return res.status(404).json({error: `Company not found`});
      }
  }catch(err){
      next(err);
  }
  });

//   Adaugare fondator
  app.post("/companies/:companyId/founders", async(req, res, next) => {
    try{
      const company = await Company.findByPk(req.params.companyId);
      if(company){
        const founder = new Founder(req.body);
        founder.companyId = company.id;
        await founder.save();
        res.status(201).json({message: 'Founder created!'});
      }else{
        res.status(404).json({message: '404 - Company Not Found'})
      }
    }catch(err){
      next(err);
    }
  });

//   Afisare fondator
  app.get("/companies/:companyId/founders", async(req, res, next) => {
    try{
      const company = await Company.findByPk(req.params.companyId, {
        include: [Founder]
      });
      if(company){
        res.status(201).json(company.founders);
      }else{
        res.status(404).json({message: '404 - Company Not Found'})
      }
    }catch(err){
      next(err);
    }
  });
  
//   Actualizare fondator
app.put("/companies/:companyId/founders/:founderId", async (req, res, next) => {
    try {
        const companies = await Company.findByPk(req.params.companyId);
        if (companies) {
        const founders = await Founder.findAll({ 
            where: {
                [Op.and]: [
                    {
                        id: req.params.founderId, 
                    },
                    {
                        companyId: companies.id
                    }
                ]}});
        const founder = founders.shift();
        if (founder) {
          founder.nume = req.body.nume;
          founder.rol = req.body.rol;
          await founder.save();
          res.status(202).json(founder);
        } else {
          res.status(404).json({ message: '404 - Founder Not Found!'});
        }
      } else {
        res.status(404).json({ message: '404 - Companies Not Found!'});
      }
    } catch (error) {
      next(error);
    }
  });

//   Stergere fondator
  app.delete('/companies/:companyId/founders/:founderId', async(req, res, next) => {
    try{
        const companies = await Company.findByPk(req.params.companyId);
        if (companies) {
        const founders = await Founder.findAll({ 
            where: {
                [Op.and]: [
                    {
                        id: req.params.founderId, 
                    },
                    {
                        companyId: companies.id
                    }
                ]}});
        const founder = founders.shift();
        if(founder){
          await founder.destroy();
          res.status(202).json({ message: 'Founder deleted!'})
        } else{
          res.status(404).json({message: '404 - Founder Not Found'})
        }
      } else{
          res.status(404).json({message: `Company not found`});
        }
    }catch(err){
      next(err);
    }
  });

//   Filtrare companii dupa nume si data
  app.get("/companiesFiltered", async (req, res, next) => {
    try {
      const { numeAles } = req.query;
      const { dataAleasa } = req.query;
      let companies = await Company.findAll({
        where: [
          numeAles
            ? {
                nume: {
                  [Op.eq]: numeAles,
                },
              }
            : undefined,
            dataAleasa
            ? {
                data: {
                  [Op.gt]: dataAleasa,
                },
              }
            : undefined,
        ],
      });
      return res.status(200).json(companies);
    }catch(err){
      next(err);
    }
  });
  
// Sortare companii crescator
  app.get("/companiesSorted", async (req, res, next) => {
    try {
     
      const { sortBy } = req.query;
      let companies = await Company.findAll({
            order: sortBy ? [[sortBy, "ASC"]] : undefined,
      });
      return res.status(200).json(companies);
    }catch(err){
      next(err);
    }
  });
  
//   Paginare companii
  app.get("/companies/paginare", async (req, res, next) => {
    try {
  
      const query = {};
      const page = req.query.page;
      const limit = req.query.limit;
      const startIndex = (page - 1)*limit;
      const endIndex = page*limit;
      const company = await Company.findAll(query);
      const finalCompanies = company.slice(startIndex, endIndex);
  
      return res.status(200).json(finalCompanies);
    }catch(err){
      next(err);
    }
  });
    
//   Export
  app.get('/export', async (req, res, next) => {
    try{
      const result = [];
      for(let c of await Company.findAll()){
        const company = {
          id: c.id,
          nume: c.titlu,
          data: c.data,
          founders: []
        };
        for(let f of await c.getFounders()){
          company.founders.push({
            id: f.id,
            nume: f.nume,
            rol: f.rol
          });
      }
      result.push(company);
    }
      if(result.length > 0){
        res.json(result);
      }else{
        res.sendStatus(204);
      }
    } 
    catch (err) {
      next(err);
    }
  });