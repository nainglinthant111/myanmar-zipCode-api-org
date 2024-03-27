const mongoose = require('mongoose');

const positalCodeSchema = mongoose.Schema({
    en: {
        region: String,
        town_township: String,
        qv_tract: String
    },
    mm: {
        region: String,
        town_township: String,
        qv_tract: String

    },
    tsp_code: String,
    region_code: String,
    postal_code: String,
    qv_code: String
});

const positalCode = mongoose.model("positalCode", positalCodeSchema);
module.exports = { positalCode }