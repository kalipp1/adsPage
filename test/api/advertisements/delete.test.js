const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Advertisements = require('../../../models/advertisements.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/ads', () => {

    before(async () => {
        const testAdOne = new Advertisements({ _id: "678bc7391c02974d7df3ba45", title: "Sell Car Fast", content: "I want to sell car really fast", publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48" });
        await testAdOne.save();
      });
      
      after(async () => {
        await Advertisements.deleteMany();
      });

  it('/:id should remove chosen document and return success', async () => {
    const res = await request(server).delete('/api/ads/678bc7391c02974d7df3ba45')
        expect(res.status).to.be.equal(200);
        const deletedAd = await Advertisements.findById('678bc7391c02974d7df3ba45');
        expect(deletedAd).to.be.null;
    });
});