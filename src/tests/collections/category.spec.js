define([
  'chai',
  'collections/category',
  'models/category',
  'models/coord'
],
function(chai, CategoryCollection, CategoryModel, CoordModel) {
  var expect = chai.expect;

  describe('CategoryCollection', function() {
    var collection = new CategoryCollection();

    var cat1 = new CategoryModel({name: 'cat1'});
    var cat2 = new CategoryModel({name: 'cat2'});
    var cat3 = new CategoryModel({name: 'cat3'});

    collection.add(cat1);
    collection.add(cat2);
    collection.add(cat3);

    var place1 = new CoordModel({name: 'place1'});
    var place2 = new CoordModel({name: 'place2'});
    var place3 = new CoordModel({name: 'place3-x'});
    var place4 = new CoordModel({name: 'place4-x'});
    var place5 = new CoordModel({name: 'place5'});
    var place6 = new CoordModel({name: 'place6-x'});
    var place7 = new CoordModel({name: 'place7'});
    var place8 = new CoordModel({name: 'plase8'});

    cat1.items.add(place1);
    cat1.items.add(place2);
    cat1.items.add(place3);
    cat1.items.add(place4);

    cat2.items.add(place5);
    cat2.items.add(place6);

    cat3.items.add(place7);
    cat3.items.add(place8);

    it('should length eq 3', function() {
      expect(collection.length).to.be.equal(3);
    });

    describe('#getCoordLikes', function() {

      it('should to be length 8 for "p"', function() {
        expect(collection.getCoordLikes('p').length).to.equal(8);
      });

      it('should to be length 1 for "7"', function() {
        expect(collection.getCoordLikes('7').length).to.equal(1);
      });

      it('should to be length 0 for "z"', function() {
        expect(collection.getCoordLikes('z').length).to.equal(0);
      });

      it('should to be length 3 for "x"', function() {
        expect(collection.getCoordLikes('x').length).to.equal(3);
      });

      it('should to be length 7 for "place"', function() {
        expect(collection.getCoordLikes('place').length).to.equal(7);
      });

    });
  });
});
