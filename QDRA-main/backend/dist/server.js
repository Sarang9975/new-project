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
const express_jwt_1 = require("express-jwt"); // Adjusted import
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const cors_1 = __importDefault(require("cors"));
const User_1 = __importDefault(require("./models/User"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect('mongodb://localhost:27017/qdra', {}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
// Middleware to validate JWT
const checkJwt = (0, express_jwt_1.expressjwt)({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-gxhcmoclz7dkosmc.us.auth0.com/.well-known/jwks.json',
    }),
    audience: 'https://dev-gxhcmoclz7dkosmc.us.auth0.com/api/v2/',
    issuer: 'https://dev-gxhcmoclz7dkosmc.us.auth0.com/',
    algorithms: ['RS256'],
});
app.post('/api/updateCoins', checkJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { coins } = req.body;
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub; // Extract user ID from JWT token
        const user = yield User_1.default.findOne({ auth0Id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.points += coins;
        yield user.save();
        res.json({ updatedPoints: user.points });
    }
    catch (error) {
        console.error('Error updating coins:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
