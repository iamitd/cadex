const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

function calculateTriangles(height, radius, segments) {

    const triangles = [];
    for (let i = 0; i < segments; i++) {
        const angle1 = (i / segments) * Math.PI * 2;
        const angle2 = ((i + 1) / segments) * Math.PI * 2;
        const x1 = radius * Math.cos(angle1);
        const y1 = radius * Math.sin(angle1);
        const x2 = radius * Math.cos(angle2);
        const y2 = radius * Math.sin(angle2);

        triangles.push({x1, y1, x2, y2, height});
    }

    return triangles;
}

app.post('/calculate-cone', (req, res) => {
    const height = parseFloat(req.body.height);
    const radius = parseFloat(req.body.radius);
    const segments = parseFloat(req.body.segments);
    if (isNaN(height) || isNaN(radius) || isNaN(segments)) {
        res.status(400).json({error: 'Пожалуйста, введите числовые значения для длины и ширины.'});
    } else {
        response = calculateTriangles(height, radius, segments)
        res.json(response);
    }
});


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});