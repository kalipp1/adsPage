const Advertisements = require('../advertisements.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Advertisements', () => {

    before(async () => {

        try {
          await mongoose.connect('mongodb://localhost:27017/adsPage', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    });

    describe('Reading data', () => {

        before(async () => {
          const testAdOne = new Advertisements({ title: "Sell Car Fast", content: "I want to sell car really fast", publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48" });
          await testAdOne.save();
      
          const testAdTwo = new Advertisements({ title: "Sell Bike Fast", content: "I want to sell bike really fast", publishDate: "04-25-2024", image: "image2", price: "100$", location: "Warsaw", seller: "678bc7471c02974d7df3ba49" });
          await testAdTwo.save();
        });
      
        it('should return all the data with "find" method', async () => {
            const advertisements = await Advertisements.find();
            const expectedLength = 2;
            expect(advertisements.length).to.be.equal(expectedLength);
          });

        it('should return a proper document by "title" with "findOne" method', async () => {
            const advertisement = await Advertisements.findOne({ title: 'Sell Car Fast' });
            const expectedTitle = 'Sell Car Fast';
            expect(advertisement.title).to.be.equal(expectedTitle);
          });

        after(async () => {
            await Advertisements.deleteMany();
          });
      
      });

      describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const advertisement = new Advertisements({ title: "Sell Car Fast", content: "I want to sell car really fast", publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48" });
            await advertisement.save();
            expect(advertisement.isNew).to.be.false;
          });

        after(async () => {
            await Advertisements.deleteMany();
          });
      
      });

      describe('Updating data', () => {

        beforeEach(async () => {
            const testAdOne = new Advertisements({ title: "Sell Car Fast", content: "I want to sell car really fast", publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48" });
          await testAdOne.save();
      
          const testAdTwo = new Advertisements({ title: "Sell Bike Fast", content: "I want to sell bike really fast", publishDate: "04-25-2024", image: "image2", price: "100$", location: "Warsaw", seller: "678bc7471c02974d7df3ba49" });
          await testAdTwo.save();
          });

        afterEach(async () => {
            await Advertisements.deleteMany();
          });

        it('should properly update one document with "updateOne" method', async () => {
            await Advertisements.updateOne({ title: 'Sell Car Fast' }, { $set: { title: 'Sell Car Fast ASAP' }});
            const updatedAdvertisement = await Advertisements.findOne({ title: 'Sell Car Fast ASAP' });
            expect(updatedAdvertisement).to.not.be.null;
          });
      
        it('should properly update one document with "save" method', async () => {
            const advertisement = await Advertisements.findOne({ title: 'Sell Bike Fast' });
            advertisement.title = 'Sell Bike Fast ASAP';
            await advertisement.save();
          
            const updatedAdvertisement = await Advertisements.findOne({ title: 'Sell Bike Fast ASAP' });
            expect(updatedAdvertisement).to.not.be.null;
          });
      
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Advertisements.updateMany({}, { $set: { title: 'SOLD!' }});
            const advertisements = await Advertisements.find();
            expect(advertisements.length).to.be.equal(2);
        });
      
      });

      describe('Removing data', () => {

        beforeEach(async () => {
            const testAdOne = new Advertisements({ title: "Sell Car Fast", content: "I want to sell car really fast", publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48" });
          await testAdOne.save();
      
          const testAdTwo = new Advertisements({ title: "Sell Bike Fast", content: "I want to sell bike really fast", publishDate: "04-25-2024", image: "image2", price: "100$", location: "Warsaw", seller: "678bc7471c02974d7df3ba49" });
          await testAdTwo.save();
          });
          
          afterEach(async () => {
            await Advertisements.deleteMany();
          });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Advertisements.deleteOne({ title: 'Sell Car Fast' });
            const deletedAdvertisement = await Advertisements.findOne({ title: 'Sell Car Fast' });
            expect(deletedAdvertisement).to.be.null;
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Advertisements.deleteMany();
            const deletedAdvertisements = await Advertisements.find();
            expect(deletedAdvertisements.length).to.be.equal(0);
        });
      
      });

    after(() => {
        mongoose.models = {};
      });
});