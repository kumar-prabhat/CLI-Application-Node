const { expect } = require('@jest/globals')
const { calculatePrice } = require('./index')

test('Should give correct calculated price', () => {
    expect(calculatePrice({numberOfBicycle: 1000, failureRate: 5})).toEqual({
        costOfOneBicycle: 1900,
        failureCostOfOneBicycle: 95,
        totalCostOfGivenBicycle: 1900000,
        failureCost: 95000,
        finalPrice: 1805000
    })
})
