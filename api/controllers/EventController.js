/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - create
    hp: async function (req, res) {

        if (req.method == "GET")
            return res.view('pages/homepage');

        if (typeof req.body.Person === "undefined")
            return res.badRequest("Form-data not received.");

        await Person.create(req.body.Person);

        return res.ok("Successfully created!");
    },

    se: async function (req, res) {

        return res.view('pages/search')
    },
    cr: async function (req, res) {

        return res.view('pages/create')
    },
    ad1: async function (req, res) {

        return res.view('pages/admin1')
    },
    ad2: async function (req, res) {

        return res.view('pages/admin2')
    },
    // action - index
    index: async function (req, res) {

        var models = await Event.find();
        return res.view('pages/index', { pages: models });

    },
};
// create: async function (req, res) {

//     if (req.method == "GET")
//         return res.view('pages/search');

//     if (typeof req.body.Event === "undefined")
//         return res.badRequest("Form-data not received.");

//     await Event.create(req.body.Event);

//     return res.ok("Successfully created!");
// },
// hp1: async function (req, res) {

//         return res.view('pages/search');

// },



