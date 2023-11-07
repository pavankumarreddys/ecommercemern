import mongoose from 'mongoose'

const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to Mongodb databse ${conn.connection.host}`)
    }catch(error){
        console.log("first",error)
    }
}

export default connectDb