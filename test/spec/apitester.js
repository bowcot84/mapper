require(['s2api'], function (s2) {
    'use strict';

    describe("s2ajax", function () {
        var l = 0;
        it('creates two resources and s2.resources keys match the originals', function () {
            waitsFor(function () {
                l = _.size(s2.resources);
                return (l === 2);
            }, "s2.resources has not been populated", 1000);
            console.log(s2);
            runs(function () {
                expect(l).toEqual(2);
            });
            runs(function () {
                var keys;
                keys = _.keys(s2.resources);
                _.each(keys, function (key) {
                    expect(s2.resources[key].rawJson.uuid).toEqual(key);
                });
            });
        });
    });
    xdescribe("s2events", function () {
        var eventSpy;
        beforeEach(function () {
            eventSpy = spyOn(s2event, 'emit');
        });
        it("is a function", function () {
            expect(typeof sendSpy).toEqual('function');
        });
    });
    return {};
});


