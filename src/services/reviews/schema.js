import { Schema, model } from 'mongoose'

const ReviewSchema = new Schema(
  {
    comment : {type: String, required: true, trim: true},
    rate :{ type: Number, min: 1, max: 5, required: true}
  }, { timestamps: true}
)

export default model('Review', ReviewSchema)