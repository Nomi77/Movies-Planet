const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'A book title is required'],
        unique:true
    },
    isbn:{
        type:Number,
        required:[true,'A book isbn is required'],
        unique:true
    },
    author:{
        type:String,
        required:[true,'A book author is required']
    },
    published:{
        type:Date,
        required:[true,'Published date is required']
    },
    publisher:{
        type:String,
        required:[true,'A book publisher is required']
    },
    pages:{
        type:Number,
        required:[true,'Total number of pages are required']
    },
    description:{
        type:String,
        required:[true,'A book description is required']
    },
    website:String,
    price:{
        type: Number,
        required:[true, 'A book must have a price']
    },
    categories:{
        type: Array,
        required: [true, 'A book must belong to a category']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    averageRating:{
        type: Number,
        default: 4.5,
        max: [5, 'Rating must be below 5.0'],
        min: [1, 'Rating must be above 1.0'],
        set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity:{
        type:Number,
        default: 0
    },
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
);

bookSchema.index({price:1});

// Virtual Populate
bookSchema.virtual('reviews',{
    ref:'Review',
    foreignField:'book',
    localField:'_id'
});

module.exports = mongoose.model('Book',bookSchema);