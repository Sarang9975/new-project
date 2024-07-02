"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const User_1 = __importDefault(require("./models/User")); // Adjust the path as necessary
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb://localhost:27017/qdra", {
        // Ensure useCreateIndex is set to true for index management
        });
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
});
connectDB();
app.get('/test', (req, res) => {
    res.send('API is working');
});
app.post("/api/updateCoins", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coins, userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = yield User_1.default.findOne({ auth0Id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.points += coins;
        yield user.save();
        res.json({ updatedPoints: user.points });
    }
    catch (error) {
        console.error("Error updating coins:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
const PORT = process.env.PORT || 3000; // Ensure this matches the port your frontend expects
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
