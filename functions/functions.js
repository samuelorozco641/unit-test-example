const sum = (value1, value2) => {
    if (typeof value1 !== 'number' && isNaN(Number(value1))) {
      throw new Error('El valor por URL no es un número');
    }

    if (typeof value2 !== 'number' && isNaN(Number(value2))) {
      throw new Error('El valor por Body no es un número');
    }
  
    const result = Number(value1) + Number(value2);
    return result;
  };


module.exports = {
    sum
}