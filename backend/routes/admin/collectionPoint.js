const express = require('express');
const router = express.Router();
const CollectionPoint = require('../../models/collectionPoint')

const collectionPointController = require('../../controllers/admin/collectionPoints')


//crud collectionPoints
//ver collectionPoints

router.get('/',(req ,res) => {
    collectionPointController.collectionPointList(req,res)
})

//mostrar page de create collectionPoint
router.get('/create', (req, res) => {
    collectionPointController.createCollectionPointGet(req,res)
})

//retirar a informaçao do form de collectionPoints
router.post('/create', (req, res) =>{
    collectionPointController.createCollectionPointPost(req,res)

})

//delete um collection point, fica na pagina q mostra os collectionPoints
router.delete('/delete/:id', (req, res) =>{
    collectionPointController.deleteCollectionPoint(req,res)
})

//edit de um collectionPoint, o método put é feito apartir da pagina /edit
router.put('/edit/:id', (req, res)=> {
    collectionPointController.editCollectionPointPost(req,res)
})

//get da edit page
router.get('/edit/:id', (req, res) =>{
    collectionPointController.editCollectionPointGet(req,res)

})


module.exports = router;
