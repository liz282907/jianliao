const path = require('path')

var config = {
    db: 'mongodb://127.0.0.1/jianliao',
    signed_secret: 'jianliao',    //deprecated
    cookie_name: 'jianliao_express',    //deprecated
    session_related:{
        name: 'jianliao_session',
        secret: 'jianliao_secret'
    },
    mail:{
        service:'163',
        auth:{
            user:'mail_863_project@163.com',
            pass: '1qaz2wsx',
        }
    },
    mail_login_pass: '123456a',
    project_name: 'jianliao-demo',
    site_dir:'localhost:3001',
    static_path: path.join(__dirname,'public/dist')

}

module.exports = config