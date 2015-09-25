
module.exports = {
    user: {
        name: { type: String, required: true },
        password: { type: String, required: true },
        info:{ type: String, required: true }
    },
    company:{
        name: { type: String, required: true },
        password: { type: String, required: true },
        companyname: { type: String, required: true },
        info:{ type: String, required: true }
    },
    commodity: {
        uId:String,
        uName:String,
        cName: String,
        cPrice: Number,
        cImgSrc: String
    },
    cart:{
        uId: { type: String },
        cId: { type: String },
        cName: { type: String },
        cPrice: { type: String },
        cImgSrc: { type:String } ,
        cQuantity: { type: Number },
        cStatus : { type: Boolean, default: false  }
    }
};
