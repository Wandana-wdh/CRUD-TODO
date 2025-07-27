const express = require("express");

const app = express();


app.use(express.json());
//app.use(cors{origin:process.constrainedMemory.FRONTEND_URL})
const routes = require("./routes");

app.use("/api",routes);


const connectDB = require("./connectDb");



const port = 5000;
//to start server

const startServer = async ()=>{
    await connectDB();
    app.listen(port, ()=> {
        console.log(`Server is listening on http://localhost: ${port}`);
    });
}
startServer();