const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Language = require('../../models/Language')
//bring in the schema
//routes
//route GET /api/language
//desc get programming languages from the database
//access public
router.get('/',(req,res)=>{
    Language.find()
    .sort({date: -1})
    .then(languages=>res.json(languages))
});

//route POST api/languages
//desc post language to schema
// access public
router.post('/',(req,res)=>{
    const newLanguage = new Language({
        name: req.body.name
    });
    //save the new item in the database
    newLanguage.save()
    .then(language=>res.json(language))
});

//route delete api/languages
//desc delete language from schema
// access public
router.delete('/:id',auth,(req,res)=>{
    Language.findById(req.params.id)
    .then(language=>language.remove().then(language=>res.json({msg:"success"})))
    .catch(err=>res.status(404).json({msg: "fail"}))
})

module.exports = router