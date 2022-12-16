const jwt = require("jsonwebtoken");
const { response } = require("../app");
const company = require("../model/company/companySchema");
const User = require("../model/user/loginSchema");
const post = require("../model/company/postSchema")

const admin = {
    adminEmail: 'admin@gmail.com',
    adminPassword: 12345
}

const AdminLogin = async (req, res) => {

    const { email, password } = req.body;

    if (email == admin.adminEmail && password == admin.adminPassword) {
        console.log("entered");
        const token = jwt.sign({ email: admin.adminEmail }, process.env.JWT_SECRET, { expiresIn: '3d' })
        console.log(token);
        if (res.status(201)) {
            console.log('hai');
            return res.json({ state: "ok", data: token })
        } else {
            console.log('hello');
            return res.json({ error: "error" });
        }
    }
    return res.json({ status: "error", error: "Invalid Password" })
}


const users = (req, res) => {
    console.log('aaaaaannnnnnnnnnnnnnnnnnnnnnnnnnn');
    User.find().then((data) => {
        // console.log(data);
        res.json(data)
    }).catch((error) => {
        console.log(error.message);
        res.json(error.message)
    })
}

const blockUser = (req, res) => {
    try {
        User.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Blocked" } }).then((response) => {
            if (response) {
                res.status(200).json({ update: true })
            }
        }).catch((error) => {
            res.json(error.message)
        })
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const unblockUser = (req, res) => {
    try {
        User.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Active" } }).then((response) => {
            if (response) {
                res.status(200).json({ update: true })
            }
        }).catch((error) => {
            res.json(error.message)
        })
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const Companies = (req, res) => {
    company.find().then((data) => {
        console.log(data);
        res.json(data)
    }).catch((error) => {
        console.log(error.message);
        res.json(error.message)
    })
}

const blockCompany = (req, res) => {
    try {
        company.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Blocked" } }).then((response) => {
            if (response) {
                res.status(200).json({ update: true })
            }
        }).catch((error) => {
            res.json(error.message)
        })
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const unblockCompany = (req, res) => {
    try {
        company.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Active" } }).then((response) => {
            if (response) {
                res.status(200).json({ update: true })
            }
        }).catch((error) => {
            res.json(error.message)
        })
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const posts = async (req, res) => {
    try {
        const data = await post.find().sort({ date: -1 })
        // console.log(data);
        res.json(data)

    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const blockPost = async (req, res) => {
    try {
        const response = await post.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: false } })
        if (response) {
            res.status(200).json({ update: true })
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const unblockPost = async (req, res) => {
    try {
        const response = await post.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: true } })
        if (response) {
            res.status(200).json({ update: true })
        }
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const postGraphInfo = async (req, res) => {
    try {
        const result = await post.aggregate([
            {
                $project:{date:{$dateToString:{format: "%Y-%m-%d",date: "$date"}},_id:1}
            },
            {
                $group: {
                    _id: '$date',
                    count: { $sum: 1 }
                }
            },
            {
                $sort:{_id:1}
            }
        ])
        // console.log(result);
        res.status(200).json(result)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {
    AdminLogin,
    users,
    blockUser,
    unblockUser,
    Companies,
    blockCompany,
    unblockCompany,
    posts,
    blockPost,
    unblockPost,
    postGraphInfo
}