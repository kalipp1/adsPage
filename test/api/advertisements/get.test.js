const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Advertisements = require('../../../models/advertisements.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/ads', () => {

    before(async () => {
        const testAdOne = new Advertisements({ _id: "678bc7391c02974d7df3ba45", title: "Sell Car Fast", content: "I want to sell car really fast", publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48" });
          await testAdOne.save();
      
          const testAdTwo = new Advertisements({ _id: "678bc7391c02974d7df3ba46", title: "Sell Bike Fast", content: "I want to sell bike really fast", publishDate: "04-25-2024", image: "image2", price: "100$", location: "Warsaw", seller: "678bc7471c02974d7df3ba49" });
          await testAdTwo.save();
      });
      
      after(async () => {
        await Advertisements.deleteMany();
      });

    it('/ should return all advertisements', async () => {

        const res = await request(server).get('/api/ads');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);

    });
  
    it('/:id should return one advertisement by :id ', async () => {

        const res = await request(server).get('/api/ads/678bc7391c02974d7df3ba45');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
  
    });

    it('/search/:searchPhrase should return advertisement with title matching to phrase', async () => {

        const res = await request(server).get('/api/ads/search/car');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].title).to.be.equal('Sell Car Fast');
    });

});