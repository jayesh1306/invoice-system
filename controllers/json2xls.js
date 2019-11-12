module.exports.convertJsonToXls = function(data, res) {
    var mongoXlsx = require('mongo-xlsx');
    /* Generate automatic model for processing (A static model should be used) */
    var model = mongoXlsx.buildDynamicModel(data);
    /* Generate Excel */
    mongoXlsx.mongoData2Xlsx(data, model, function(err, data) {
        console.log('File saved at:', data.fullPath);
        res.sendfile(data.fullPath);
    });

}