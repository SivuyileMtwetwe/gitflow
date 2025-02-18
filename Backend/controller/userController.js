import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js'; // Assuming you have a User model for DB interactions

// Hash password
const hashingFunction = async (pwd) => {
    try {
        if (!pwd) throw new Error('Password cannot be blank.');
        let hashedPassword = await bcrypt.hash(pwd, 10);
        return hashedPassword;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

// Compare password with stored hashed password
const comparePass = async (pwd, hashP) => {
    try {
        let result = await bcrypt.compare(pwd, hashP);
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

// Sign JWT Token
const signToken = async (email) => {
    try {
        if (!email) throw new Error('Email is required to sign a token.');
        let token = await jwt.sign({ email: email }, 'yourSecretKey', { expiresIn: '1d' });
        return token;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

// Verify JWT Token
const verifyToken = async (userToken, userSecretKey) => {
    try {
        if (!userToken || !userSecretKey) throw new Error('Token and secret key are required.');
        let result = await jwt.verify(userToken, userSecretKey);
        return result;
    } catch (error) {
        console.error('Token verification failed:', error.message);
        throw error;
    }
};

// Register a new user (Hash password and store in DB)
const registerUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const hashedPassword = await hashingFunction(password);
        
        // Assuming you have a User model and a method to add a new user to your DB
        const user = await User.create({ email, password: hashedPassword });
        
        const token = await signToken(email);
        
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login (Verify user credentials and generate token)
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find user by email
        const user = await User.findByEmail(email); // Assuming you have a method to find user by email
        if (!user) return res.status(400).json({ message: 'User not found' });
        
        // Compare password with stored hash
        const isValidPassword = await comparePass(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: 'Invalid credentials' });
        
        const token = await signToken(email);
        
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

export { registerUser, loginUser, signToken, verifyToken };
