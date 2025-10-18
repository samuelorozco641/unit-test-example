const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, fuelEnergySelector, electricalConsumption, costElectricalKM, combustionConsumption, fuelConsumption, fuelEfficiency, fuelCostKm, energyKm, emisionKm, savedEnergy, avoidedEmissions, monthlySavings, annualSavings, youngTree, oldTree, energyH2Cylinders, energyH2LowPresure, energyConsumed, hydrogenMass, litersRequired} = require('../../calculators/environment')

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
        //youngtree = 10
        //oldtree = 30
        //cellfuel = 0.54
        let list = {}
        const ipc = tiMonth(parseFloat(req.params.ipc))
        const fes = fuelEnergySelector(req.params.fuel)
        const electrical_consumption = electricalConsumption(81.14, 14.7)
        const costElectrical_Km = costElectricalKM(electrical_consumption, 12)
        const combustion = combustionConsumption(electrical_consumption)
        const fuel_consumption = fuelConsumption(combustion, 12)
        const fuel_efficiency = fuelEfficiency(fuel_consumption)
        const fuel_cost_km = fuelCostKm(12, fuel_consumption)
        const energy_km = energyKm(combustion)
        const emision_km = emisionKm(12, energy_km)
        const saved_energy = savedEnergy(combustion, electrical_consumption, 12)
        const avoided_emissions = avoidedEmissions(emision_km, 12)
        const monthly_savings = monthlySavings(fuel_cost_km, costElectrical_Km, 12)
        const annual_savings = annualSavings(monthly_savings, ipc)
        const young_tree = youngTree(avoided_emissions)
        const old_tree = oldTree(avoided_emissions)
        const energy_H2_Cylinders = energyH2Cylinders(10)
        const energy_H2_Low_Presure = energyH2LowPresure(10)
        const energy_consumed = energyConsumed(energy_H2_Low_Presure)
        const hydrogen_mass = hydrogenMass(energy_H2_Low_Presure)
        const liters_required = litersRequired(hydrogen_mass)

        list["it_month"] = ipc
        list["fuel_energy_selector"] = fes
        list["electrical_consumption"] = electrical_consumption
        list["cost_electrical_km"] = costElectrical_Km
        list["combustion"] = combustion
        list["fuel_consumption"] = fuel_consumption
        list["fuel_efficency"] = fuel_efficiency
        list["fuel_cost_km"] = fuel_cost_km
        list["energy_km"] = energy_km 
        list["emision_km"] = emision_km 
        list["saved_energy"] = saved_energy
        list["avoided_emissions"] = avoided_emissions
        list["monthly_saving"] = monthly_savings
        list["annual_savings"] = annual_savings
        list["young_tree"] = young_tree
        list["old_tree"] = old_tree
        list["energy_H2_Cylinders"] = energy_H2_Cylinders
        list["energy_H2_low_pressure"] = energy_H2_Low_Presure
        list["energy_consumed"] = energy_consumed
        list["hydrogen_mass"] = hydrogen_mass
        list["liters_required"] = liters_required

        response.success(req, res, list, 200)
    } catch (error) {
        response.error(req, res, error.message, 500)
    }
})


module.exports = router ;