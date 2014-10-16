define([
  'chai',
  'models/coord',
  'collections/coord'
],
function(chai, CoordModel) {
  var expect = chai.expect;

  describe('CoordModel', function() {
    describe('#getLatLon', function() {
      var model = new CoordModel({lat: 42, lon: 11});
      it('should to be equal [42, 11]', function() {
        expect(model.getLatLon()).to.eql([42, 11]);
      });

      it('should to be not equal [11, 42]', function() {
        expect(model.getLatLon()).to.not.eql([11, 42]);
      });
    });

    describe('#getLonLat', function() {
      var model = new CoordModel({lat: 42, lon: 11});
      it('should to be equal [42, 11]', function() {
        expect(model.getLonLat()).to.eql([11, 42]);
      });

      it('should to be not equal [11, 42]', function() {
        expect(model.getLonLat()).to.not.eql([42, 11]);
      });
    });
  });
});
