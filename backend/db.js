const mongoose = require('mongoose');
// const mongoURI = "mongodb+srv://hariprada1003:hari123@cluster0.yqgdg9e.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoURI ="mongodb://hariprada1003:hari123@ac-nuv1xcc-shard-00-00.yqgdg9e.mongodb.net:27017,ac-nuv1xcc-shard-00-01.yqgdg9e.mongodb.net:27017,ac-nuv1xcc-shard-00-02.yqgdg9e.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-qtzwot-shard-0&authSource=admin&retryWrites=true&w=majority" 
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected to MongoDB');
    const db = mongoose.connection.db;
    const fetched_data = db.collection("fooditems");
    const data = await fetched_data.find({}).toArray();
    global.fooditems=data;
    const fetched_data_2=db.collection("foodcategory");
     const data2=await fetched_data_2.find({}).toArray();
     global.foodcategory=data2;
   
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB; 