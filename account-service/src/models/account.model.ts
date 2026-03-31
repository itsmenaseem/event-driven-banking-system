import mongoose, { Document, Schema } from "mongoose";

interface AccountDocs extends Document {
    amount:number
}

const AccountSchema = new Schema<AccountDocs>({
    amount:{
        type:Number,
        default:0
    }
},{
    timestamps:true,
    toJSON:{
        transform(doc,ret:any){
            ret.id = ret._id;
            delete ret.__v,
            delete ret._id;
        }
    }
},);


export const Account = mongoose.model<AccountDocs>("account",AccountSchema);