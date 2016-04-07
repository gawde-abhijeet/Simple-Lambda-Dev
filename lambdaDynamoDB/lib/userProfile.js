
var httpntlm = require('httpntlm'),
    userName = 'ctc.appid',
    password = 'gW31eJ27oO64uH0Np',
    auth = 'Basic ' + new Buffer(userName + ':' + password).toString('base64'),
    requestUri = 'https://collabhub.accenture.com/People/ProfilePicture/marco.s.ilagan';

module.exports = {
    getProfilePicture: function () {
        
        httpntlm.get({
            url: requestUri,
            username: userName,
            password: password,
            workstation: '',
            domain: ''
        }, function (err, res) {
            if (err) return err;
            
            return res.body;
        });
    }
};