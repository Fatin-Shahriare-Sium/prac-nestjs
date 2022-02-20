import { Schema } from "mongoose";

let clientSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String
})
//let Client = model('client', clientSchema)

export default clientSchema;
