const axios = require('axios');

const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    // ========================
    // INDEX
    // ========================
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },


    // ========================
    // CREATE
    // ========================
    async store(request, response) {
        const { github_username, techs, latidude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latidude] // mongo usa nessa ordem
            };

            dev = await Dev.create({
                github_username, // github_username: github_username
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }

        return response.json(dev);
    },

    // ========================
    // UPDATE
    // ========================
    async update(req, res) {
        const { name } = req.body;

        const dev = await Dev.findByIdAndUpdate(req.params.id, {name}, {new: true});

        return res.json(dev);
    },

    // ========================
    // DESTROY
    // ========================
    async destroy(req, res) {

    }
}