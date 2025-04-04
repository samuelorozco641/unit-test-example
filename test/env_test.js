const test = require('node:test');
const assert = require('node:assert');
const {tiMonth} = require("../calculators/environment")

test('env_ipc', () => { 
    assert.strictEqual(tiMonth(1.4), 5)
})