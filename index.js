
exports.handler = (event, context, callback) => {
    console.log(event);
    
    let date = new Date();
    let dateString = date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();

    if (process.env != null) {
        subscription_id = process.env.AZURE_SUBSCRIPTION_ID;
        resource_group_prefix = process.env.AZURE_RESOURCE_GROUP_PREFIX;
        resource_location = process.env.AZURE_RESOURCE_LOCATION;
        api_version = process.env.AZURE_API_VERSION;
        auth_bearer = process.env.AZURE_AUTH_BEARER;
    }

    // Post to Azure API
    // Create Resource Group
    const request = require('request');
    var options = `{
        url: "https://management.azure.com/subscriptions/${subscription_id}/resourcegroups/${resource_group_prefix}-${dateString}?api-version=${api_version}",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer ${auth_bearer}"
        },
        json: {
            "location": "${resource_location}"
        }
    }`
    
    console.log(options);
    
    request.post(options, function(error, response, body) {
        console.log(error);
    });

};
