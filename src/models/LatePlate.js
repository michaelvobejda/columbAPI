import mongoose from 'mongoose'

const LatePlateSchema = new mongoose.Schema({
    name: String
})

export default {
    model: mongoose.model('LatePlate', LatePlateSchema),
    schema: LatePlateSchema
}
