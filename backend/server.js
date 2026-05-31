import { app } from "./src/app.js"
import { connectDb } from "./src/config/db.js"

const port = process.env.port

console.log(port)

connectDb()

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
