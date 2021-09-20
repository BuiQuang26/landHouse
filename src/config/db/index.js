const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://qaker:qaker123@shop-book.fnutz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('connect successfully!!!');
    } catch (error) {
        console.log('default !!!' + error);
    }
}

module.exports =  connect;