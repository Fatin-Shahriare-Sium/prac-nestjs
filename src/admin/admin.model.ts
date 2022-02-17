import {Schema} from 'mongoose'

export let adminSchema=new Schema({
    name:String,
    email:String,
    password:String
})