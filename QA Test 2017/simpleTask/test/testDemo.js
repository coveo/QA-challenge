
module.exports = {
    'Demo test': function (client) {
        client.url('http://nightwatchjs.org/')
            .waitForElementVisible('body', 10000, 'Nightwatchjs website was loaded successfully.');
        client.assert.urlContains('nightwatchjs');
    }
};

