const fs = require('fs')

//List high level components of Bicycle
const listCatalog =  () => {
    fs.readFile('catalog.json', (err, data) => {
        if(err) throw err;
        const catalog = JSON.parse(data.toString());
        catalog.forEach(comp => {
            console.log('Component name - '+ comp.componentName);
            console.log('Assembly price - '+ comp.assemblyPrice);
            console.log('Available Sub-Components - ');
            comp.subComponents.forEach(subComp => {
                console.log('   Type - '+subComp.type);
                console.log('   Available Variants - ');
                subComp.variants.forEach(variant => {
                    console.log('       Variant name - '+variant.name);
                    console.log('       Price - '+variant.price);
                    console.log('       ------------------------------');
                })
                console.log('   --------------------------------------');
            })
            console.log('---------------------------------------------');
        });
    });
}

//List all the configurations selected for the Bicycle
const listConfiguration = () => {
    fs.readFile('configuration.json', (err, data) => {
        if(err) throw err;
        let totalPrice = 0;
        const configuration = JSON.parse(data.toString());
        configuration.forEach(comp => {
            console.log('Component name - '+ comp.componentName);
            console.log('Assembly price - '+ comp.assemblyPrice);
            console.log('Selected Sub-Components - ');
            totalPrice += comp.assemblyPrice;

            comp.subComponents.forEach(subComp => {
                totalPrice += subComp.price;
                console.log('   Type - '+subComp.type)
                console.log('   Name - '+subComp.name);
                console.log('   Price - '+subComp.price);
                console.log('   -------------------------------------');
            })
            console.log('--------------------------------------------');
        });
        console.log('TOTAL COST OF BICYCLE - '+totalPrice)
    });
}

//Calculate price of Bicycles
const calculatePrice = ({numberOfBicycle, failureRate}) => {
    fs.readFile('configuration.json', (err, data) => {
        if(err) throw err;
        let costOfOneBicycle = 0;
        const configuration = JSON.parse(data.toString());
        configuration.forEach(comp => {
            costOfOneBicycle += comp.assemblyPrice;
            comp.subComponents.forEach(subComp => {
                costOfOneBicycle += subComp.price;
            })
        });
        let failureCostOfOneBicycle = (failureRate/100) * costOfOneBicycle; 
        let totalCostOfGivenBicycle = numberOfBicycle * costOfOneBicycle;
        let failureCost = (failureRate/100) * totalCostOfGivenBicycle; 
        let finalPrice = totalCostOfGivenBicycle - failureCost

        console.log('Cost of 1 Bicycle -      Rs.'+costOfOneBicycle);
        console.log('Failure rate for 1 Bicycle -      Rs.'+failureCostOfOneBicycle);
        console.log('Cost of '+ numberOfBicycle+' Bicycle -     Rs.'+totalCostOfGivenBicycle);
        console.log('Failure rate for '+ numberOfBicycle+' Bicycle -     Rs.'+failureCost);
        console.log('Final price of '+numberOfBicycle+' Bicycle -      Rs.'+finalPrice);

        //Just for testing with jest
        // return {
        //     costOfOneBicycle,
        //     failureCostOfOneBicycle,
        //     totalCostOfGivenBicycle,
        //     failureCost,
        //     finalPrice
        // }
      
    });
   
}

module.exports = {
    listCatalog,
    listConfiguration,
    calculatePrice
}