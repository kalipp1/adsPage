const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Advertisements = require('../../../models/advertisements.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/ads', () => {

    after(async () => {
        await Advertisements.deleteMany();
      });

    it('/ should insert new document to db and return success', async () => {
        const res = await request(server).post('/api/ads').send({ title: "Sell Car Fast", content: "I want to sell car really fast", publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48" });
        const newAdvertisement = await Advertisements.findOne({ title: 'Sell Car Fast' });
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(newAdvertisement).to.not.be.null;
    });

});