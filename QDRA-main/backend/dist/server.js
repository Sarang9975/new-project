"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth")); // Adjust the path as necessary
const authMiddleware_1 = require("./middleware/authMiddleware"); // Adjust the path as necessary
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
// Define a route to get user info
app.use('/api/auth', auth_1.default); // Example for authentication routes
app.get('/api/user', authMiddleware_1.authenticateToken, (req, res) => {
    // Handle user endpoint with authentication middleware
    res.send('User information');
});
// Routes
app.use('/api/auth', auth_1.default);
// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
