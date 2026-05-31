import { app } from "./src/app.js"

const port = process.env.port

console.log(port)

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})