const express=require('express');
const app=express()
const port=3000;
const dotenv=require('dotenv');
app.use(express.json());
dotenv.config();
const movieRoutes=require('./src/routes/movieRoutes');
const bookingRoutes=require('./src/routes/bookingRoutes');
const paymentRoutes=require('./src/routes/paymentroutes');

const cors=require('cors');
app.use(cors({
    withCredentials:true,
    origin:'http://localhost:3001'
}));
const connectDB=require('./src/config/dbconfig');

app.use('/movies', movieRoutes);
app.use('/bookings', bookingRoutes);
app.use('/payments', paymentRoutes);

connectDB().then(()=>{
    console.log("mongoose connected");
    app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
}).catch((error)=>{
    console.log("mongoose not connected",error)
});


