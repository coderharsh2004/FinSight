// // src/models/Alert.ts
// import mongoose from "mongoose";
//
// const alertSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     symbol: { type: String, required: true },
//     targetPrice: { type: Number, required: true },
//     createdAt: { type: Date, default: Date.now }
// });
//
// const Alert = mongoose.model("Alert", alertSchema);
//
// export default Alert;
import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    email: { type: String, required: true },
    symbol: { type: String, required: true },
    targetPrice: { type: Number, required: true },
    condition: { type: String, enum: ["gte", "lte"], default: "gte" }, // New field
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Alert", alertSchema);
