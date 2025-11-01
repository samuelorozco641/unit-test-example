const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, fuelEnergySelector, electricalConsumption, costElectricalKM, combustionConsumption, fuelConsumption, fuelEfficiency, fuelCostKm, energyKm, emisionKm, savedEnergy, avoidedEmissions, monthlySavings, annualSavings, youngTree, oldTree, energyH2Cylinders, energyH2LowPresure, energyConsumed, hydrogenMass, litersRequired} = require('../../calculators/environment')
const dummyDataset = require('../../database/dummyDataset')

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

router.get('/environment/fuelEnergySelector/:fuel', (req, res) => {
  try {
    const out = fuelEnergySelector(req.params.fuel);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// electricalConsumption expects two numeric args (ejemplo: voltage, current)
router.get('/environment/electricalConsumption', (req, res) => {
  try {
    const voltage = Number(req.query.voltage, 81.14);
    const current = Number(req.query.current, 14.7);
    const out = electricalConsumption(voltage, current);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// costElectricalKM expects (electrical_consumption, pricePerKwh)
router.get('/environment/costElectricalKM', (req, res) => {
  try {
    const electrical_consumption = Number(req.query.electrical_consumption);
    const price = Number(req.query.price, 12);
    const out = costElectricalKM(electrical_consumption, price);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// combustionConsumption(electrical_consumption)
router.get('/environment/combustionConsumption', (req, res) => {
  try {
    const electrical_consumption = Number(req.query.electrical_consumption);
    const out = combustionConsumption(electrical_consumption);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// fuelConsumption(combustion, factor)
router.get('/environment/fuelConsumption', (req, res) => {
  try {
    const combustion = Number(req.query.combustion);
    const factor = Number(req.query.factor, 12);
    const out = fuelConsumption(combustion, factor);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// fuelEfficiency(fuel_consumption)
router.get('/environment/fuelEfficiency', (req, res) => {
  try {
    const fuel_consumption = Number(req.query.fuel_consumption);
    const out = fuelEfficiency(fuel_consumption);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// fuelCostKm(km, fuel_consumption)
router.get('/environment/fuelCostKm', (req, res) => {
  try {
    const km = Number(req.query.km, 12);
    const fuel_consumption = Number(req.query.fuel_consumption);
    const out = fuelCostKm(km, fuel_consumption);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// energyKm(combustion)
router.get('/environment/energyKm', (req, res) => {
  try {
    const combustion = Number(req.query.combustion);
    const out = energyKm(combustion);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// emisionKm(km, energy_km) OR emisionKm(12, energy_km) - ajusta según tu firma
router.get('/environment/emisionKm', (req, res) => {
  try {
    const km = Number(req.query.km, 12);
    const energy_km = Number(req.query.energy_km);
    const out = emisionKm(km, energy_km);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// savedEnergy(combustion, electrical_consumption, factor)
router.get('/environment/savedEnergy', (req, res) => {
  try {
    const combustion = Number(req.query.combustion);
    const electrical_consumption = Number(req.query.electrical_consumption);
    const factor = Number(req.query.factor, 12);
    const out = savedEnergy(combustion, electrical_consumption, factor);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// avoidedEmissions(emision_km, factor)
router.get('/environment/avoidedEmissions', (req, res) => {
  try {
    const emision_km = Number(req.query.emision_km);
    const factor = Number(req.query.factor, 12);
    const out = avoidedEmissions(emision_km, factor);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// monthlySavings(fuel_cost_km, costElectrical_Km, factor)
router.get('/environment/monthlySavings', (req, res) => {
  try {
    const fuel_cost_km = Number(req.query.fuel_cost_km);
    const costElectrical_Km = Number(req.query.costElectrical_Km);
    const factor = Number(req.query.factor, 12);
    const out = monthlySavings(fuel_cost_km, costElectrical_Km, factor);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// annualSavings(monthly_savings, ipc)
router.get('/environment/annualSavings', (req, res) => {
  try {
    const monthly_savings = Number(req.query.monthly_savings);
    const ipc = Number(req.query.ipc);
    const out = annualSavings(monthly_savings, ipc);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// youngTree / oldTree
router.get('/environment/youngTree', (req, res) => {
  try {
    const avoided_emissions = Number(req.query.avoided_emissions);
    const out = youngTree(avoided_emissions);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

router.get('/environment/oldTree', (req, res) => {
  try {
    const avoided_emissions = Number(req.query.avoided_emissions);
    const out = oldTree(avoided_emissions);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

// H2 related
router.get('/environment/energyH2Cylinders', (req, res) => {
  try {
    const cylinders = Number(req.query.cylinders, 10);
    const out = energyH2Cylinders(cylinders);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

router.get('/environment/energyH2LowPresure', (req, res) => {
  try {
    const value = Number(req.query.value, 10);
    const out = energyH2LowPresure(value);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

router.get('/environment/energyConsumed', (req, res) => {
  try {
    const energy = Number(req.query.energy);
    const out = energyConsumed(energy);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

router.get('/environment/hydrogenMass', (req, res) => {
  try {
    const energy = Number(req.query.energy);
    const out = hydrogenMass(energy);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

router.get('/environment/litersRequired', (req, res) => {
  try {
    const hydrogen_mass = Number(req.query.hydrogen_mass);
    const out = litersRequired(hydrogen_mass);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

const calculators = {
  tiMonth,
  fuelEnergySelector,
  electricalConsumption,
  costElectricalKM,
  combustionConsumption,
  fuelConsumption,
  fuelEfficiency,
  fuelCostKm,
  energyKm,
  emisionKm,
  savedEnergy,
  avoidedEmissions,
  monthlySavings,
  annualSavings,
  youngTree,
  oldTree,
  energyH2Cylinders,
  energyH2LowPresure,
  energyConsumed,
  hydrogenMass,
  litersRequired
};

router.get('/environment/calc/:fn', (req, res) => {
  try {
    const fn = req.params.fn;
    const fnRef = calculators[fn];
    if (!fnRef) {
      return response.error(req, res, `Function ${fn} not allowed`, 400);
    }
    const args = Object.values(req.query).map(v => {
      const n = parseFloat(v);
      return Number.isNaN(n) ? v : n;
    });
    const out = fnRef(...args);
    response.success(req, res, out, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

module.exports = router