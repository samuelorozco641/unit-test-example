const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, fuelEnergySelector, electricalConsumption, costElectricalKM, combustionConsumption, fuelConsumption, fuelEfficiency, fuelCostKm} = require('../../calculators/environment')

const tableInjected = 'my_table'

router.post('/hello/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = req.body.user

        response.success(req, res, `Hola mundo ${id} ${user}`, 200)
    }
    catch  (error) {
        response.error(req, res, error.message, 500);
    }
})

router.get('/environment/:ipc/:fuel', async (req, res) => {
    try {
        let list = {}
        const ipc = tiMonth(parseFloat(req.params.ipc))
        const fes = fuelEnergySelector(req.params.fuel)
        const electrical_consumption = electricalConsumption(81.14, 14.7)
        const costElectrical_Km = costElectricalKM(electrical_consumption, 12)
        const combustion = combustionConsumption(electrical_consumption)
        const fuel_consumption = fuelConsumption(combustion, 12)
        const fuel_efficiency = fuelEfficiency(fuel_consumption)
        const fuel_cost_km = fuelCostKm(12, fuel_consumption)

        list["it_month"] = ipc
        list["fuel_energy_selector"] = fes
        list["electrical_consumption"] = electrical_consumption
        list["cost_electrical_km"] = costElectrical_Km
        list["combustion"] = combustion
        list["fuel_consumption"] = fuel_consumption
        list["fuel_efficency"] = fuel_efficiency
        list["fuel_cost_km"] = fuel_cost_km

        response.success(req, res, list, 200)
    } catch (error) {
        response.error(req, res, error.message, 500)
    }
})


module.exports = router ;