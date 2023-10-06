const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const tableInjected = 'test'
const func = require('../../functions/functions')

router.get('/suma/:num1', async (req, res) => {
    const num1 = req.params.num1
    const num2 = req.body.num2

    try {
        const result = func.sum(num1, num2)
        response.success(req, res, result, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})



router.get('/list', async (req, res) => {
    try {
        const id = req.params.id
        const list = await ctrl.list(tableInjected, id);
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})


router.post('/add', async (req, res) => {
    try {
        await ctrl.addElement(tableInjected, data = {
            "data": req.body.data,
        });
        response.success(req, res, `Item Created`, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});


router.put('/update', async (req, res) => {
    try {
        let { id, data } = req.body;
        await ctrl.updateElement(tableInjected, data = {
            "id": id,
            "data": data,
        });
        response.success(req, res, `Item updated`, 200);     
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});

module.exports = router ;