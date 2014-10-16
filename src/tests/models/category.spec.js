define([
  'chai',
  'models/category',
  'collections/coord'
],
function(chai, CategoryModel, CoordCollection) {
  var expect = chai.expect;

  describe('CategoryModel', function() {

    it('should has items key', function() {
      var model = new CategoryModel();

      expect(model).to.include.keys('items');
    });

    it('should not has items attribute', function() {
      var model = new CategoryModel();

      expect(model.get('items')).to.be.undefined;
    });

    describe('#items', function() {
      it('should to be an instance of CategoryModel', function() {
        var model = new CategoryModel();

        expect(model.items).to.be.an.instanceof(CoordCollection);
      });
    });

  });
});
