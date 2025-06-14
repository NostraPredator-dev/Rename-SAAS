const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const razorpay = new Razorpay({key_id: process.env.VITE_RZRPY_TEST_KEY, key_secret: process.env.VITE_RZRPY_TEST_SECRET});

app.post('/payment', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const orderRequest = {
            amount: amount,
            currency: currency,
        }

        await razorpay.orders.create(orderRequest, function(err, order) {
            if (err) {
                console.log(err);
            } else {
                res.json(order);
            }
        })
    } catch (error) {
        console.error(error);
    }
})

app.post('/verify', (req, res) => {
    const {order_id, payment_id, signature } = req.body;
    if (!order_id || !payment_id || !signature) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        const secret = process.env.VITE_RZRPY_TEST_SECRET;
        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(order_id + "|" + payment_id)
            .digest('hex');

        if (generated_signature === signature) {
            res.status(200).json({success: true, message: "Payment verified successfully!"});
        } else {
            res.status(400).json({success: false, message: "Payment verification failed!"});
        }
    } catch (error) {
        console.error(error);
    }
})

app.post('/save-preset', async (req, res) => {
    const { userId, presetName, presetData } = req.body;
    if (!userId || !presetName || !presetData) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        const { error } = await supabase
            .from('presets')
            .insert([
                {
                    user_id: userId,
                    id: uuidv4(),
                    name: presetName,
                    data: presetData,
                    created_at: new Date().toISOString()
                }
            ]);
        if (error) {
            return res.status(500).json({ error: error.message || 'Failed to save preset' });
        }
        res.status(200).json({ message: 'Preset saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to save preset' });
    }
})

app.post('/delete-preset', async (req, res) => {
    const { id, user_id } = req.body;
    if (!id || !user_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        const { error } = await supabase
            .from('presets')
            .delete()
            .eq('id', id)
            .eq('user_id', user_id);
        if (error) {
            return res.status(500).json({ error: error.message || 'Failed to delete preset' });
        }
        res.status(200).json({ message: 'Preset deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to delete preset' });
    }
})

app.get('/get-presets', async (req, res) => {
    const userId = req.query.user_id;
    if (!userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        const { data, error } = await supabase
            .from('presets')
            .select('*')
            .eq('user_id', userId);
        if (error) {
            return res.status(500).json({ error: error.message || 'Failed to fetch presets' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch presets' });
    }
})

app.get('/credit-history', async (req, res) => {
    const userId = req.query.user_id;
    if (!userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        const { data, error } = await supabase
            .from('credit_history')
            .select('*')
            .eq('user_id', userId)
            .order('used_at', { ascending: false });
        if (error) {
            return res.status(500).json({ error: error.message || 'Failed to fetch credit history' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch credit history' });
    }
})

app.post('/credit-history', async (req, res) => {
    const { user_id, amount, reason, used_at } = req.body;
    if (!user_id || !amount || !reason || !used_at) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        const { error } = await supabase
            .from('credit_history')
            .insert([
                {
                    id: uuidv4(),
                    user_id: user_id,
                    amount: amount,
                    reason: reason,
                    used_at: used_at
                }
            ]);
        if (error) {
            return res.status(500).json({ error: error.message || 'Failed to save credit history' });
        }
        res.status(200).json({ message: 'Credit history saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to save credit history' });
    }
})

app.post('/credit-balance', async (req, res) => {
    const { user_id, credits } = req.body;
    if (!user_id || !credits) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        const { error } = await supabase
            .from('credit_balances')
            .update({ credit_balance: credits, updated_at: new Date().toISOString() })
            .eq('user_id', user_id);
        if (error) {
            return res.status(500).json({ error: error.message || 'Failed to update credit balance' });
        }
        res.status(200).json({ message: 'Credit balance updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to update credit balance' });
    }
})

app.post('/create-credit-balance', async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        const { error } = await supabase
            .from('credit_balances')
            .insert([
                {
                    user_id: user_id,
                    credit_balance: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ]);
        if (error) {
            return res.status(500).json({ error: error.message || 'Failed to create credit balance' });
        }
        res.status(200).json({ message: 'Credit balance created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to create credit balance' });
    }
})

app.get('/credit-balance', async (req, res) => {
    const userId = req.query.user_id;
    if (!userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        const { data, error } = await supabase
            .from('credit_balances')
            .select('credit_balance')
            .eq('user_id', userId);
        if (error) {
            return res.status(500).json({ error: error.message || 'Failed to fetch credit balance' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch credit balance' });
    }
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});