const assert = require('assert');
const {
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
} = require('../calculators/environment');

const electrical_consumption = electricalConsumption(81.14, 200);
const combustion_consumption = combustionConsumption(electrical_consumption);
const fuel_selector = fuelEnergySelector("Diesel");

describe("Environment Calculations", () => {

  it('env_ipc', () => { 
    assert.strictEqual(tiMonth(2.8), 0.0023039138595752906);
  });

  describe("FuelEnergySelector collection", () => {
    it("gasoline case", () => {
      assert.deepStrictEqual(fuelEnergySelector("gasoline"), {
        "fuel_price": 16700,
        "fuel_energy": 35.58,
        "emision_factor": 69.25
      });
    });

    it("diesel case", () => {
      assert.deepStrictEqual(fuelEnergySelector("diesel"), {
        "fuel_price": 11795,
        "fuel_energy": 40.7,
        "emision_factor": 74.01
      });
    });
  });

  it("fuelConsumption Test", () => {
    assert.strictEqual(
      fuelConsumption(
        combustion_consumption,
        fuel_selector["fuel_energy"]
      ),
      0.04102081879859657
    );
  });

  describe("costElectricalKM Test", () => {
    it("Calcular el costo usando consumo y precio de energía", () => {
      assert.strictEqual(costElectricalKM(electrical_consumption, 200), 90.155555555555556);
    });
  });

  describe("Environment adicional - cálculos", () => {
    it("fuelEfficiency calcula 1 / fuelConsumption", () => {
      const fuel_cons = fuelConsumption(combustion_consumption, fuel_selector.fuel_energy);
      assert.strictEqual(fuelEfficiency(fuel_cons), 1 / fuel_cons);
    });

    it("fuelCostKm calcula fuel_price * fuel_consumption", () => {
      const fuel_cons = fuelConsumption(combustion_consumption, fuel_selector.fuel_energy);
      assert.strictEqual(fuelCostKm(fuel_selector.fuel_price, fuel_cons), fuel_selector.fuel_price * fuel_cons);
    });

    it("energyKm y emisionKm calculan correctamente", () => {
      const energy_km = energyKm(combustion_consumption);
      assert.strictEqual(energy_km, combustion_consumption * (3.6 * (10 ** 6)));

      const emission_km = emisionKm(fuel_selector.emision_factor, energy_km);
      assert.strictEqual(emission_km, (fuel_selector.emision_factor * energy_km) / (1 * (10 ** 6)));
    });

    it("savedEnergy y avoidedEmissions con uso anual", () => {
      const annual_use = 12000;
      const saved = savedEnergy(combustion_consumption, electrical_consumption, annual_use);
      assert.strictEqual(saved, (combustion_consumption - electrical_consumption) * annual_use);

      const emission_km = emisionKm(fuel_selector.emision_factor, energyKm(combustion_consumption));
      const avoided = avoidedEmissions(emission_km, annual_use);
      assert.strictEqual(avoided, (emission_km * annual_use) / (1 * (10 ** 6)));
    });

    it("monthlySavings y annualSavings funcionan según las fórmulas", () => {
      const annual_use = 12000;
      const fuel_cons = fuelConsumption(combustion_consumption, fuel_selector.fuel_energy);
      const fuel_cost_km = fuelCostKm(fuel_selector.fuel_price, fuel_cons);
      const cost_elec_km = costElectricalKM(electrical_consumption, 200);

      const monthly = monthlySavings(fuel_cost_km, cost_elec_km, annual_use);
      assert.strictEqual(monthly, (fuel_cost_km - cost_elec_km) * (annual_use / 12));

      const ipc_data = tiMonth(2.8);
      const annual = annualSavings(monthly, ipc_data);
      assert.strictEqual(annual, monthly * ((((1 + ipc_data) ** 12) - 1) / (ipc_data)));
    });
  });

  describe("Resultados de ejemplo (pass / fail / skipped)", () => {
    it("prueba que pasa (pass)", () => {
      assert.strictEqual(2 + 2, 4);
    });

    it.skip("prueba saltada (skipped)", () => {
      assert.strictEqual(1, 2);
    });

    it("prueba intencionalmente fallida (fail)", () => {
      assert.strictEqual(costElectricalKM(electrical_consumption, 200), 0);
    });

    it.skip("prueba cancelada (simulada con skip)", () => {
      // En Mocha no hay cancel nativo, se simula con skip.
    });
  });

  describe("Funciones async: árboles e H2", () => {
    it("youngTree y oldTree devuelven NaN", async () => {
      const y = await youngTree(123);
      const o = await oldTree(123);
      assert.ok(Number.isNaN(y));
      assert.ok(Number.isNaN(o));
    });

    it("energyH2*, energyConsumed, hydrogenMass y litersRequired devuelven NaN", async () => {
      const eCyl = await energyH2Cylinders(100);
      const eLow = await energyH2LowPresure(eCyl);
      const eCons = await energyConsumed(eLow);
      const hMass = await hydrogenMass(eLow);
      const liters = await litersRequired(hMass);

      assert.ok(Number.isNaN(eCyl));
      assert.ok(Number.isNaN(eLow));
      assert.ok(Number.isNaN(eCons));
      assert.ok(Number.isNaN(hMass));
      assert.ok(Number.isNaN(liters));
    });
  });
});
