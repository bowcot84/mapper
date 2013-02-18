define([], function () {
    'use strict';
    var actOn = $(document), S2;
    S2 = function () {
        var s2;
        s2 = this;
        actOn.on('s2event', function (e, data) {
            _.chain(s2.listeners).where({0:data.event}).each(function (listener) {
                listener[1](data.data);
            });
        });
        this.listeners = [];
        this.resources = Object.create(null);
    };
    S2.prototype.addListener = function (type, callback) {
        this.listeners.push([type, callback]);
    };
    S2.prototype.removeListener = function (type, callback) {
        this.listeners = _.reject(this.listeners, function (listener) {
            return (listener[0] === type && listener[1] === callback);
        });
    };
    S2.prototype.emit = function (data) {
        actOn.trigger('s2event', data);
    };
    return new S2();
});