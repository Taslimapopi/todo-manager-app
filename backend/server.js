import { app } from "./src/app.js";
import { connectDb } from "./src/config/db.js";
import { env } from "./src/config/env.js";

const port = env.PORT;

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