import express from 'express'
import controller from '../controllers/people'
const router = express.Router()

router.post('/insert/people', controller.addPeople)
router.delete('/delete/people', controller.deletePeople)
router.put('/update/people', controller.updatePeople)
router.get('/get/people', controller.getPeopleAll)

export = router