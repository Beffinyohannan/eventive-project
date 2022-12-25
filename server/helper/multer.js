const multer = require("multer");
const {google} = require('googleapis')
const GoogleDriveStorage = require('multer-google-drive')

const auth = new google.auth.GoogleAuth({
  keyFile:"./googleKey.json",
  scopes:['https://www.googleapis.com/auth/drive']
})

const drive = google.drive({version: 'v3',auth})

const upload = multer({
  storage: GoogleDriveStorage({
    drive: drive,
    parents: process.env.GOOGLE_API_FOLDER_ID,

 
    fileName: function (req, file, cb) {
     
      // let filename = `test-${file.originalname}`;
      // cb(null, filename);
      cb(null,Date.now()+"--"+file.originalname);
     // console.log(file);
    
   }
   
  })
  
})

module.exports = upload

// const fileStorageEngine =multer.diskStorage({
//     destination :(req,file,cb)=>{
//       cb(null,"../client/public/images")
//     },
//     filename : (req,file,cb)=>{
//       cb(null,Date.now()+"--"+file.originalname);
//     },
//   })
  
//   module.exports = multer({ storage: fileStorageEngine})