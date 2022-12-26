const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const multer = require('multer')
const fs = require('fs')
const company = require("../model/company/companySchema")
const post = require("../model/company/postSchema")
const Enquire = require("../model/user/eventEnquire")
const Quotation = require("../model/company/quotationSchema")
const Events = require("../model/company/eventSchema")
const upload = require("../helper/multer")




const companySignup = async (req, res) => {
    try {
        console.log(req.body);
        let { companyName, companyType, email, registerNo, companyAddress, phone, password } = req.body
        password = await bcrypt.hash(password, 10)

        const companies = await new company({
            companyName,
            companyType,
            email,
            registerNo,
            phone,
            companyAddress,
            password
        })
        await companies.save()
        res.status(200).json({ insert: true, res: companies })

    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const companyLogin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const companies = await company.findOne({ email });
        // console.log(password);
        console.log(companies);
        if (!companies) {

            return res.json({ error: "User not found" })
        }

        const auth = await bcrypt.compare(password, companies.password);
        console.log(auth, "klklk");
        if (auth) {
            console.log("entered");
            const token = jwt.sign({ email: companies.email }, process.env.JWT_SECRET)
            console.log(token);
            if (res.status(201)) {
                console.log('hai');
                return res.json({ state: "ok", data: token, companies: companies })
            } else {
                console.log('hello');
                return res.json({ error: "error" });
            }
        }
        return res.json({ status: "error", error: "Invalid Password" })

    } catch (error) {
        console.log(error.message);
    }
}


const uploadPost = (req, res) => {
    console.log(req.body);
    // console.log(JSON.parse(req.body));
    console.log(req.file);

    const postSave = new post({
        companyName: req.body.companyName,
        // companyId:mongoose.Types.ObjectId(req.body.companyId),
        companyId: req.body.companyId,
        description: req.body.description,
        eventType:req.body.evntType,
        image: req.file.filename,
        // contentType:"image/png"

    })

    postSave.save().then((response) => {
        console.log('saved');
        res.status(200).json({ posted: true })

    }).catch((err) => {
        console.log(err.message);
        res.json(err.message)
    })
    // res.send('saved')
}

/* ----------------------- post upload to google drive ---------------------- */

const postUpload =(req,res)=>{
    try {
        console.log(req.file,'pooppopopopopo')
        console.log(req.file.fileName);
        console.log(req.file.fileId);
    
        res.json(req.file.fileId)
      } catch (error) {
        res.json(error)
      }
}

/* ----------------------------- new post upload ---------------------------- */

const newPostUpload =async(req,res)=>{
    console.log(req.body);

    try {
        const newPost = new post(req.body)
       const savePost = await newPost.save()
       if(savePost){
        res.status(200).json({ posted: true })
       }
    } catch (error) {
        res.json(error)
    }
}

const inboxView = async (req, res) => {
    try {
        // console.log(req.params.id);
        const msg = await Enquire.find({ companyId: req.params.id }).populate('userId')
        res.status(200).json(msg)
    } catch (err) {
        console.log(err.message);
        res.json(err.message)
    }
}

const acceptForm = async (req, res) => {
    try {
        const result = await Enquire.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: 'accepted' } })
        if (result) {
            res.status(200).json({ update: true })
        }

    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const rejectFrom = async (req, res) => {
    try {
        const result = await Enquire.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: 'rejected' } })
        if (result) {
            res.status(200).json({ update: true })
        }

    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const getCompanyProfile = async (req, res) => {
    try {
        const result = await company.findById({ _id: req.params.id })
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }

}

const getProfilePost = async (req, res) => {
    try {
        const result = await post.find({ companyId: req.params.id,'reports.reportedBy': { $ne: req.params.userId } }).populate('companyId').sort({ date: -1 })
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const quotation = async (req, res) => {


    try {
        console.log(req.body);
        // console.log(req.query);
        const userId = req.query.userId
        const companyId = req.query.companyId
        const enquiryId = req.query.enquiryId
        let { foodAmount, venueAmount, programmeAmount, lightAmount, guestAmount, cameraAmount, anchorAmount, note, username } = req.body
        const eventQuotation = await new Quotation({
            foodAmount, venueAmount, programmeAmount, lightAmount, guestAmount, cameraAmount, anchorAmount, note, userId, companyId, username,enquiryId
        })


        await eventQuotation.save()
        const result = await Enquire.updateOne({_id:enquiryId},{$set:{status:"replayed"}})
        console.log('success');
        res.status(200).json({ form: 'sended' })

    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }

}

const getCompany = async (req, res) => {
    try {
        const id = req.params.id
        // console.log(req.params.id,'.............');
        const companies = await company.findOne({ _id: id }).populate('notification.senderId');
        // console.log(companies);
        res.status(200).json(companies)
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id
        const result = await post.deleteOne({ _id: id })
        if (result) {
            res.status(200).json({ deleted: true })
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const editProfile = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        // const editCompany = await company.findById(req.params.id)

        const edit = await company.updateOne({ _id: req.params.id },
            {
                $set: {
                    profilePicture: req.body.profilePicture,
                    companyName: req.body.companyName,
                    email: req.body.email,
                    phone: req.body.phone,
                    companyType: req.body.companyType,
                    companyAddress: req.body.companyAddress

                }
            })
        if (edit) {
            res.status(200).json({ Update: true, msg: "Updated Successfully " });
        } else {
            res.status(500).json({ Update: false, msg: "Update not done" });
        }
        // if (editCompany) {
        //     if (req.file) {
        //         var file = true
        //     } else {
        //         var file = false
        //     }
            // const edit = await company.updateOne({ _id: req.params.id },
            //     {
            //         $set: {
            //             profilePicture: file ? req.file.filename : editCompany.profilePicture,
            //             companyName: req.body.companyName,
            //             email: req.body.email,
            //             phone: req.body.phone,
            //             companyType: req.body.companyType,
            //             companyAddress: req.body.companyAddress

            //         }
            //     })
            // if (edit) {
            //     res.status(200).json({ Update: true, msg: "Updated Successfully " });
            // } else {
            //     res.status(500).json({ Update: false, msg: "Update not done" });
            // }
        // }
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }

}

const postView = async (req, res) => {
    try {
        const result = await post.find({ status: true }).populate('companyId').sort({ date: -1 })
        if (result) {
            res.status(200).json(result)
        }
    } catch (error) {
        res.json(error.message)
    }
}

const addEvent = async (req, res) => {
    console.log(req.body);
    // console.log('qwertyu');

    try {
        const events = new Events(req.body)

        events.save()
        res.status(200).json({ event: true })

    } catch (error) {
        res.json(error.message)
    }
}

const eventView = async (req, res) => {
    // console.log('000000000000000');
    try {
        const result = await Events.find()
        //    console.log(result,'ggggggggggggg');
        if (result) {
            res.status(200).json(result)
        }
    } catch (error) {
        // console.log(error);
        res.json(error.message)
    }
}

const singleEventPosts = async (req, res) => {
    console.log(req.params.id, 'qwertyui');
    try {
        const result = await post.find({ eventType: req.params.id }).populate('companyId')
        // console.log(result);
        if (result) {
            res.status(200).json(result)
        }
    } catch (error) {
        res.json(error.message)
    }
}

const eventDetails = async (req, res) => {
    try {
        const result = await Events.findOne({ _id: req.params.id })
        if (result) {
            res.status(200).json(result)
        }
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {
    companySignup,
    companyLogin,
    uploadPost,
    postUpload,
    newPostUpload,
    inboxView,
    acceptForm,
    rejectFrom,
    getCompanyProfile,
    getProfilePost,
    quotation,
    getCompany,
    deletePost,
    editProfile,
    postView,
    addEvent,
    eventView,
    singleEventPosts,
    eventDetails
}