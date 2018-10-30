/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('pages/create.ejs');

        if (typeof req.body.Event === "undefined")
            return res.badRequest("Form-data not received.");

        await Event.create(req.body.Event);

        return res.ok("Successfully created!");
        // return res.view('pages/create.ejs');

    },
    details: async function (req, res) {

         var message = Event.getInvalidIdMsg(req.params);

         if (message) return res.badRequest(message);
 
         var model = await Event.findOne(req.params.id);
 
         if (!model) return res.notFound();
 
         return res.view('pages/details.ejs', { pages: model });
 
    },

    
    admin: async function (req, res) {

        var model = await Event.find();

        return res.view('pages/admin.ejs', { pages: model });

    },
    // action - update
    update: async function (req, res) {

        var message = Event.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        if (req.method == "GET") {

            var model = await Event.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('pages/update.ejs', { pages: model });

        } else {

            if (typeof req.body.Event === "undefined")
                return res.badRequest("Form-data not received.");

            var models = await Event.update(req.params.id).set({
                name: req.body.Event.name,
                shortdes: req.body.Event.shortdes,
                fulldes: req.body.Event.fulldes,
                imageurl: req.body.Event.imageurl,
                orgainzer: req.body.Event.orgainzer,
                eventdate: req.body.Event.eventdate,
                time: req.body.Event.time,
                venue: req.body.Event.venue,
                quato: req.body.Event.quato,
                highlighted: req.body.Event.highlighted,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");
        }
    },
    // action - index
    index: async function (req, res) {

        var models = await Event.find();

        return res.view('pages/index', { pages: models });

    },
    // search function
    search: async function (req, res) {

        const qName = req.query.name || "";
        const qAge = parseInt(req.query.age);

        if (isNaN(qAge)) {

            var models = await Event.find({
                where: { name: { contains: qName } },
                sort: 'name'
            });

        } else {

            var models = await Event.find({
                where: { name: { contains: qName }, age: qAge },
                sort: 'name'
            });

        }
        const qPage = Math.max(req.query.page - 1, 0) || 0;

        const numOfItemsPerPage = 2;

        var models = await Event.find({
            limit: numOfItemsPerPage,
            skip: numOfItemsPerPage * qPage
        });

        var numOfPage = Math.ceil(await Event.count() / numOfItemsPerPage);

        return res.view('pages/search', { pages: models, count: numOfPage });
   
    },
    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var message = Event.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var models = await Event.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Event Deleted.");

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



