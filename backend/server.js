import { app } from "./src/app.js";
import { connectDb } from "./src/config/db.js";

const port = process.env.port;

const startServer = async () => {
 await connectDb();

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};



try{
 await startServer()
}catch(error){
    console.error('failed to start startServer',error)
}