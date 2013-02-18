define(['config', 's2resource', 's2api'], function (config, S2resource, s2) {
    'use strict';
    var s2ajax;
    s2ajax = {
        send:function (action, actionPath, data, callback) {
            $.ajax({
                type:config.actionMethods[action],
                url:config.apiUrl + (actionPath || ''),
                contentType:"json",
                dataType:"json",
                data:data,
                success:function (json) {
                    s2.emit({
                        event:'gotJson',
                        callback:callback,
                        data:json
                    });
                }
            });
        },
        search:{
            /*
             barcodes: function (barcode){

             s2ajax.ajaxSend('search', S2.resources.search.all, {barcode: barcode}, S2.resources.add);
             }
             */
        },
        parseJson:function (json) {
            var key, resource;
            for (key in json) {
                resource = new S2resource(key, json[key]);
            }
        }
    };
    return s2ajax;
});