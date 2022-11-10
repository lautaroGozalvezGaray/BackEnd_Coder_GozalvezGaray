//import {faker} from '@faker-js/faker';
const {faker} = require("@faker-js/faker")

class ProductMocker {
    
    async generateRandomProducts() {
        const randomProducts = [];
        
        for (let i = 0; i < 6; i++) {
            const randomProduct = {
                title: faker.vehicle.bicycle(),
                price: faker.datatype.number({min: 1000, max: 10000}),
                image: faker.image.imageUrl(400,600,'bike', true),
                
            }
            randomProducts.push(randomProduct);        
        }
    
        return randomProducts;
    }
}

module.exports = ProductMocker;