
const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const URL = process.env.BACKEND_URL || 'http://localhost:5000';
app.get('/', (req, res) => {
    res.render('signup', { error: null });
});
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const response = await fetch(`${URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).render('signup', {
                error: data.message || 'Signup failed'
            });
        }
        res.render('success', {
            name: name
        });

    } catch (err) {
        console.error(err);

        res.status(500).render('signup', {
            error: 'Unable to connect to backend'
        });
    }
});

app.listen(3000, () => {
    console.log('Frontend running on port 3000');
});
