const mongoose = require('mongoose')

const conn = async()=> {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL, {
            socketTimeoutMS: 30000, 
            connectTimeoutMS: 30000 
        })
        console.log('DB Connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = conn