require.config({
    baseUrl:'/components/mapper/app/scripts/'
});
require(['s2ajax', 's2api', 'underscore', 'app' ], function (s2ajax, s2, _, app) {
    'use strict';
    //this runs last
    s2.addListener('gotJson', s2ajax.parseJson);//set up a listener with callback to parse JSON
    s2ajax.send('root', 'tube.json', null, null);//make an initial call for tube data

    s2.removeListener('event', null); //just helps validation of s2api file
    app.run();
});