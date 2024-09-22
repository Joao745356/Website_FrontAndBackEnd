const CollectionPoint = require('../../models/collectionPoint')

var collectionPointController = {}


//render create page
collectionPointController.createCollectionPointGet= (req,res) =>{

    res.render('admin/collectionPointsManagement/collectionPointCreate.ejs', {
        title: 'Create Collection Point',
        user: req.userName 
    })
 
}


//post create page
collectionPointController.createCollectionPointPost= async (req,res) =>{ 
    const collectionPoint = new CollectionPoint({
        name: req.body.name,
        coordsLatitude: req.body.lat,
        coordsLongitude: req.body.long
    })

    try {
        await collectionPoint.save()
        res.redirect(`/admin/manage-collectionPoints/`)

    } catch(err) {
        res.render('admin/collectionPointsManagement/collectionPointCreate.ejs'), {
            collectionPoint: collectionPoint,
            errorMessage: 'Error creating collection point',
            user: req.userName
        }
        console.log(err)
    }
}


//delete
collectionPointController.deleteCollectionPoint= async (req,res) =>{
    let collectionPoint
    try {
        collectionPoint = await CollectionPoint.findByIdAndDelete(req.params.id)
        res.redirect('/admin/manage-collectionPoints/')
    } catch (err) {
        if (staff == null) {
            res.redirect('/admin/manage-collectionPoints/')
        } else {
            res.redirect(`/admin/manage-collectionPoints/`)
            console.log(err)
        }
    }
    
}


//render edit page
collectionPointController.editCollectionPointGet= async (req,res) =>{
    try {
        const collectionPoint = await CollectionPoint.findById(req.params.id)
        res.render('admin/collectionPointsManagement/collectionPointEdit', {
            collectionPoint: collectionPoint,
            title: 'Update Collection Point',
            user: req.userName 
        })
      } catch (err) {
        console.log(err)
        res.redirect('/admin/manage-collectionPoints/')
      }
}

//post edit page
collectionPointController.editCollectionPointPost=  async (req,res) =>{
    let collectionPoint
    try {
        collectionPoint = await CollectionPoint.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
      })
  
      await collectionPoint.save()
      res.redirect(`/admin/manage-collectionPoints/`)
    } catch {
      if (admin == null) {
        res.redirect('/admin/manage-collectionPoints/')
      } else {
        res.render('admin/collectionPointsManagement/collectionPointEdit.ejs', {
          collectionPoint: collectionPoint,
          errorMessage: 'Error updating collection point'
        })
      }
    }
}


//list collections points
collectionPointController.collectionPointList = async (req,res) =>{
    let searchOption = {}

    if (req.query.name != null && req.query.name !== '') {
        searchOption.name = new RegExp(req.query.name, 'i')
    }
    try {
        const collectionPoints = await CollectionPoint.find(searchOption);
        res.render('admin/collectionPointsManagement/index', {
            collectionPoints: collectionPoints,
            title: 'Collection Points',
            searchOption: req.query,
            user: req.userName 
        })
    } catch(err) {
        res.redirect('/')
        console.log(err)
    }
}

module.exports = collectionPointController