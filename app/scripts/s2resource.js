define(['s2api'], function (s2) {
    "use strict";
    var S2resource;
    S2resource = function (type, node) {
        var action;
        if (!node.uuid) {
            delete (this);
            return false;
        }
        this.rawJson = node;
        switch (type) {
            case 'tube':
                this.resourceType = 'tube';
                parseAliquots(this, node);
                break;
            case 'spin_columns':
                this.resourceType = 'spinColumn';
                parseAliquots(this.node);
                break;
            case 'sample':
                this.resourceType = 'sample';
                break;
        }
        for (action in node.actions) {
            this[action] = function (sendData) {
                s2ajax.send(action, node.actions[action], sendData, null);
            };
        }
        if (!s2.resources[node.uuid]) {
            s2.resources[node.uuid] = this;
        }
        $.extend(true, s2.resources[node.uuid], this);
        s2.emit({event:'resourceUpdated', data:this});
        return this;
    };
    function parseAliquots(resource, node) {
        resource.aliquots = {};
        for (var aliquot in node.aliquots) {
            for (var contents in node.aliquots[aliquot]) {
                if (node.aliquots[aliquot][contents].uuid) {
                    resource.aliquots[node.aliquots[aliquot][contents].uuid] = new S2resource(contents, node.aliquots[aliquot][contents])
                }
            }
        }
        return resource;
    }

    return S2resource;
});
/*


 for (var resourceType in s2resource) {

 s2resource[resourceType].prototype.init = function (type){
 this.uuid = node.uuid;

 //this.rawJson = data;


 };
 s2resource[resourceType].prototype.create = function (data){
 s2ajax.send('create',this.rawJson.actions.create,data,null);
 //return this.resourceType;
 };
 s2resource[resourceType].prototype.read = function (data){
 s2ajax.send('create',this.rawJson.actions.read,data,null);
 //return this.resourceType;
 };
 s2resource[resourceType].prototype.update = function (data){
 s2ajax.send('create',this.rawJson.actions.update,data,null);

 };
 s2resource[resourceType].prototype.delete = function (data){
 s2ajax.send('create',this.rawJson.actions.delete,data,null);
 //return this.resourceType;
 };

 }
 */



/*
 var resource  = {
 //parent: parent,
 json: json,
 actions: json.actions,
 resourceType: type
 };

 s2[type] = s2[type] || {}
 s2[type][json.uuid] = resource;
 console.log('Created s2.' + type + '[' + json.uuid + ']');
 //check for sub resources

 for (var key in json) {
 //console.log(json)
 if (typeof json[key] == 'array' || typeof json[key] == 'object') {
 //console.log('checking' + key);
 s2resource.parseJson(json[key]);
 }
 /*console.log('checking:'+ key)
 if (key !== 'parent') {
 json[key].parent = resource;
 node = {};
 node[key] = json[key];
 //if(json[key].uuid)

 new s2resource.parseJson(node);
 }

 }
 ;
 }
 */