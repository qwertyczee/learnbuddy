const { createClient } = require('@supabase/supabase-js');
const admin = require('../config/firebase');
const axios = require('axios');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const register = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            return res.status(401).json({ error: error.message });
        }

        try {
            await admin.firestore().collection('users').doc(data.user.id).set({
                firstName,
                lastName,
                email,
                timeStamp: admin.firestore.FieldValue.serverTimestamp(),
            });
        } catch (error) {
            res.status(400).json({ error: firstName });
        }

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email,password });

        if (error) {
            return res.status(401).json({ error: error.message });
        }

        res.status(200).json({ access_token: data.session.access_token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register, login };