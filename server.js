const express = require('express');
const connectDB = require('./Db/mongo');
const { positalCode } = require('./Model/code');
const cors = require('cors');
const ExcelJS = require('exceljs');

// Create an instance of Express
const app = express();
connectDB();
app.use(express.json());
app.use(cors("*"));
// Define a route
app.get('/', async (req, res) => {
    try {
        res.send({ message: "Authentication Successful", statusCode: 200 })
    } catch (error) {
        console.error("Error occured when logging in", error);
        throw error;
    }
});

app.get('/api/data', async (req, res) => {
    const zipCode = req.query.zipCode;
    try {
        const response = await positalCode.findOne({
            postal_code: zipCode
        });
        if (response) {
            res.send({ message: "Authentication Successful", statusCode: 200, data: response });
        } else {
            res.send({ message: "Authentication Failed", statusCode: 401 });
        }
    } catch (error) {
        console.error("Error occurred when retrieving data", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get('/api/data/myanmar', async (req, res) => {
    const region_code = req.query.region;
    try {
        const response = await positalCode.find({
            region_code: region_code
        });

        if (response) {
            res.send({ message: "Authentication Successful", statusCode: 200, data: response });
        } else {
            res.send({ message: "Authentication Failed", statusCode: 401 });
        }
    } catch (error) {
        console.error("Error occurred when retrieving data", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get('/api/data/myanmar/regions', async (req, res) => {
    try {
        const response = await positalCode.find();
        const glbd = [];
        if (response) {
            for (let i = 0; i < response.length; i++) {
                const xvalue = {
                    region_code: response[i].region_code,
                    region: response[i].en.region
                };
                if (!glbd.some(item => item.region_code === xvalue.region_code)) {
                    glbd.push(xvalue);
                }
            }
            res.send({ message: "Authentication Successful", statusCode: 200, data: glbd });
        } else {
            res.send({ message: "Authentication Failed", statusCode: 401 });
        }
    } catch (error) {
        console.error("Error occurred when retrieving data", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});



// const outputData = [];
// const alldata = 17331;

// app.get('/api/state', async (req, res) => {
//     try {
//         const response = await positalCode.find();
//         if (response && response.length > 0) {
//             const outputData = [];
//             for (let i = 0; i < response.length; i++) {
//                 outputData.push([
//                     response[i].mm.region,
//                     response[i].mm.town_township,
//                     response[i].mm.qv_tract,
//                     response[i].postal_code

//                 ]);
//             }
//             const workbook = new ExcelJS.Workbook();
//             const worksheet = workbook.addWorksheet('Sheet1');
//             outputData.forEach(row => {
//                 worksheet.addRow(row);
//             });
//             const filePath = 'output.xlsx';
//             workbook.xlsx.writeFile(filePath)
//                 .then(() => {
//                     console.log('Excel file saved:', filePath);
//                     res.send({ message: "Excel file saved", statusCode: 200 });
//                 })
//                 .catch(error => {
//                     console.error('Error saving Excel file:', error);
//                     res.status(500).send({ message: "Error saving Excel file" });
//                 });
//         } else {
//             res.status(404).send({ message: "Data not found", statusCode: 404 });
//         }
//     } catch (error) {
//         console.error("Error occurred when retrieving data", error);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });





// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
