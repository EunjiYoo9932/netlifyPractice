const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer")

//storage multer config
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
        //받은 응답을 uploads 파일에 저장함
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
        //파일 이름이 20230826_이슬 으로 저장됨
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4'){
            return cb(res.status(400).end('only mp4 is allowed'), false);
            //mp4로만 저장되게 함
        }
        cb(null, true)
    }
})

const upload = multer({storage: storage}).single("file");


//=================================
//             User
//=================================

router.post("/uploadfiles", (req, res) =>{
    //비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err){
            return res.json({success:false, err})
        }
        return res.json({success:true, url: res.req.file.path, fileName: res.req.file.filename})
        //파일이 저장된 url과 이름을 알려주는 것 
    })
});
//index.js에 먼저가서 /api/video를 거친 후 video.js로 온다 따라서 /api/video빼도 된다.


router.post('/uploadVideo', (req, res) =>{
    //비디오 정보 저장
    const video = new Video(req.body)
    //req.body는 클라이언트가 보낸 모든 정보가 담긴 것
    //req.body.writer 하면 writer정보만 받음

    video.save((err, doc) => {
    //몽고 db에 저장하는 코드
        if(err) return res.json({success: false, err})
        res.status(200).json({success : true})
    })
});


router.get('/getVideos', (req, res) =>{
    //비디오를 db에서 가져와서 클라이언트에 보낸다.
    Video.find()
    .populate('writer')
    //populate해줘야 모든 정보를 가져올 수 있다.
    .exec((err, videos)=> {
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, videos})
    })
});
module.exports = router;

