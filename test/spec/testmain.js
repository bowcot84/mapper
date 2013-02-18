//need to pull in main application, and tests
require.config({


    baseUrl:'/components/mapper/app/scripts/'



});
require(['/components/mapper/test/spec/apitester.js', 'main', 'underscore'], function (tester, main, _) {

});