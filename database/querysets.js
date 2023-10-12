const selectAllItems = (table) => {
    const query = 
    `SELECT * FROM ${table}`
    return query
}

const selectById = (table, id) => {
    const query = 
    `SELECT * FROM ${table}
    WHERE id = ${id}`
    return query
}

const insertData = (table, jsonData) => {
    const { data } = jsonData;
    const query = `
    INSERT INTO ${table} 
    (data) VALUES ('${data}')`;
    return query;
  }

const updateData = (table, jsonData) => {
    const { id, data } = jsonData;
    const query = 
    `UPDATE ${table} 
    SET data = '${data}'
    WHERE id = ${id}`;
    return query;
}

module.exports = {
    selectAllItems,
    selectById,
    insertData, 
    updateData
}