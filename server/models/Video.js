const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({

    writer: {
        type : Schema.Types.ObjectId,
        //type를 이런식으로 하면 User.js로 가서 이메일, 패스워드 등 모든 정보 가져옴!
        ref : 'User',
        //유저모델에서 가져오려고 쓴 코드
    },
    title : {
        type : String,
        maxlength : 50,
    },
    description : {
        type : String,
    },
    privacy : {
        type : Number,
    },
    filePath : {
        type : String,
    },
    category : {
        type : String,
    },
    views : {
        type : Number,
        default: 0,
    },
}, {timestamps: true})
//만든 날과 수정날을 알 수 있다??

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }