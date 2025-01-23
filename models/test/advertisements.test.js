const Advertisements = require('../advertisements.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Advertisements', () => {

    it('should throw an error if there are not all args that are required filled', async () => {
        const ad = new Advertisements({});
    
      ad.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    
    });

    it('should throw an error if any of string type arg is not a string', () => {

        const cases = [{}, []];
        for(let title of cases) {
          const ad = new Advertisements({ title });
      
          ad.validateSync(err => {
            expect(err.errors.name).to.exist;
          });
      
        }
      
      });

    it('should throw an error if "title" arg is less than 10 letters', async () => {
        const title = "sadsds"
        const ad = new Advertisements({ title: title, content: "I want to sell car really fast", publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48"  });

        ad.validateSync(err => {
            expect(err.errors.name).to.exist;
        });
    });

    it('should throw an error if "title" arg is more than 50 letters', async () => {
        const title = "sdhabsfahsfbahsfbahsbfahsfbahsfbahsfbahsbfahsbfhasbfahsbfahsbfhasbfhabsfahsbfhasbfhasbfahsfbahsbfhasbfhasbfhasbfhasbfhasbfhasbfhasbfhasbfahsbf"
        const ad = new Advertisements({ title: title, content: "I want to sell car really fast", publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48" });

        ad.validateSync(err => {
            expect(err.errors.name).to.exist;
        });
    });

    it('should throw an error if "content" arg is less than 20 letters', async () => {
        const content = "sadsds"
        const ad = new Advertisements({ title: "Sell Car Fast", content: content, publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48"  });

        ad.validateSync(err => {
            expect(err.errors.name).to.exist;
        });
    });

    it('should throw an error if "title" arg is more than 1000 letters', async () => {
        const content = "sdhabsfahsfbahsfbahsbfahsfbahsfbahsfbahsbfahsbfhasbfahsbfahsbfhasbfhabsfahsbfhasbfhasbfahsfbahsbfhasbfhasbfhasbfhasbfhasbfhasbfhasbfhasbfahsbfahsbfahsbfahsfbahsbfahsbfhasadjsafsajnfansjfnbasjfbasjfbashfbasfbashfbasfhasbfhasbfhasbfajsfnaskfnajsfajsnfajsfnajsfnjasnfjasnfjasfbhasjfgaegfasbfasfbsjajsfjasjjsjsjsjsfjjjsjsjsjsjsjsjsjjsffjsjafjfsjjfajsfjasjfjasfjajsfjasjfjasfjasjfajsfjasjfajsfjasjfjasfjajsfjasjfjsajfjsajfsjfjsjajffjsajsfshfajfssbfhasbfhasbfhasbfhasbfhasbfhasbfahsbfahsbfahsbfahsfbahsbfahsbfhasadjsafsajnfansjfnbasjfbasjfbashfbasfbashfbasfhasbfhasbfhasbfajsfnaskfnajsfajsnfajsfnajsfnjasnfjasnfjasfbhasjfgaegfasbfasfbsjajsfjasjjsjsjsjsfjjjsjsjsjsjsjsjsjjsffjsjafjfsjjfajsfjasjfjasfjajsfjasjfjasfjasjfajsfjasjfajsfjasjfjasfjajsfjasjfjsajfjsajfsjfjsjajffjsajsfshfajfssbfhasbfhasbfhasbfhasbfhasbfhasbfahsbfahsbfahsbfahsfbahsbfahsbfhasadjsafsajnfansjfnbasjfbasjfbashfbasfbashfbasfhasbfhasbfhasbfajsfnaskfnajsfajsnfajsfnajsfnjasnfjasnfjasfbhasjfgaegfasbfasfbsjajsfjasjjsjsjsjsfjjjsjsjsjsjsjsjsjjsffjsjafjfsjjfajsfjasjfjasfjajsfjasjfjasfjasjfajsfjasjfajsfjasjfjasfjajsfjasjfjsajfjsajfsjfjsjajffjsajsfshfajfs"
        const ad = new Advertisements({ title: "Sell Car Fast", content: content, publishDate: "01-12-2025", image: "image", price: "2500$", location: "Opole", seller: "678bc7471c02974d7df3ba48" });

        ad.validateSync(err => {
            expect(err.errors.name).to.exist;
        });
    });

    it('should not throw an error if all args are correct', async () => {
        const ad = new Advertisements({ title: "Sell Bike Fast", content: "I want to sell bike really fast", publishDate: "04-25-2024", image: "image2", price: "100$", location: "Warsaw", seller: "678bc7471c02974d7df3ba49" });
    
      ad.validateSync(err => {
        expect(err).to.not.exist;
      });
    
    });

    after(() => {
        mongoose.models = {};
      });
  
  });