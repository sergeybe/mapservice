define([
  'chai',
  'models/category',
  'collections/coord'
],
function(chai, CategoryModel, CoordCollection) {
  var expect = chai.expect;

  describe('CategoryModel', function() {
    var model = new CategoryModel();

    it('should has items key', function() {
      expect(model).to.include.keys('items');
    });

    it('should not has items attribute', function() {
      expect(model.get('items')).to.be.undefined;
    });

    describe('#items', function() {

      it('should to be an instance of CategoryModel', function() {
        expect(model.items).to.be.an.instanceof(CoordCollection);
      });

    });
  });
});
