var express = require('express')

var app = express()

var multipart = require(
    'connect-multiparty'
);

var MongoClient = require('mongodb').MongoClient;
var multipartMiddleware = multipart();
var url = "mongodb://119.23.63.196:27017/";

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/login', multipartMiddleware, function (req, res, next) {
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')

    res.header("Content-Type", "application/json;charset=utf-8");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("loginlist");
        var myobj = req.body;
        var whereStr = JSON.stringify({ "username": req.body.username })
        // var whereStr = JSON.stringify(req.body);  // 查询条件
        console.log(whereStr)
        dbo.collection("loginlist").find(whereStr).toArray(function (err, result) {
            if (err) throw err;
            console.log(666)
            console.log(result[0]);
            for (var i = 0; i < result.length; i++) {
                if (result[i].password == req.body.password && result[0].username == req.body.username) {
                    console.log("A");
                    let obj = { code: "OK", username: req.body.username }
                    res.json(obj);
                    break;
                } else if (result[i].password != req.body.password && result[0].username == req.body.username) {
                    console.log("B")
                    res.json("密码错误");
                } else if (result[0].username != req.body.username) {
                    console.log("B")
                    let obj = { code: "2", infrom: "未注册,请先注册" }
                    res.json(obj);
                }
            }
            console.log("abc");

            db.close();
            return;
        });

    });


})

app.post('/shangjialogin', multipartMiddleware, function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1')
    console.log(req.body)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shangjialist");
        var myobj = req.body;
        var whereStr = JSON.stringify({ "username": req.body.username })
        // var whereStr = JSON.stringify(req.body);  // 查询条件
        console.log(whereStr)
        dbo.collection("shangjialist").find(whereStr).toArray(function (err, result) {
            if (err) throw err;
            console.log(666)
            console.log(result[0]);
            for (var i = 0; i < result.length; i++) {
                if (result[i].password == req.body.password && result[0].username == req.body.username) {
                    console.log("A");
                    let obj = { code: "OK", username: req.body.username }
                    res.json(obj);
                    break;
                } else if (result[i].password != req.body.password && result[0].username == req.body.username) {
                    console.log("B")
                    res.json("密码错误");
                } else if (result[0].username != req.body.username) {
                    console.log("B")
                    let obj = { code: "2", infrom: "未注册,请先注册" }
                    res.json(obj);
                }
            }
            console.log("abc");

            db.close();
            return;
        });

    });


})

app.post('/register', multipartMiddleware, function (req, res, next) {
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')

    res.header("Content-Type", "application/json;charset=utf-8");

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("loginlist");
        var myobj = req.body;
        let obj = { code: "OK", username: req.body.username }
        dbo.collection("loginlist").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("文档插入成功");
        });
        res.json(obj);
        db.close();
        return;
    });

})




app.post('/fabulist', multipartMiddleware, function (req, res, next) {
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')

    res.header("Content-Type", "application/json;charset=utf-8");

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fabulist");
        var myobj = req.body;
        let obj = { code: "OK", username: req.body.name }
        dbo.collection("fabulist").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("文档插入成功");
        });
        res.json(obj);
        db.close();
        return;
    });

})




app.post('/fabulistshangjia', multipartMiddleware, function (req, res, next) {
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')

    res.header("Content-Type", "application/json;charset=utf-8");

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fabulistshangjia");
        var myobj = req.body;
        myobj["allow"] = "false";
        let obj = { code: "OK", username: req.body.name }
        dbo.collection("fabulistshangjia").insertOne(myobj, function (err, res) {
            try {
                err

            } catch (error) {
                console.log(error);
            }
            console.log("文档插入成功");
        });
        res.json(obj);
        db.close();
        return;
    });

})




app.post('/fabulistshangjiadelete', multipartMiddleware, function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')

    res.header("Content-Type", "application/json;charset=utf-8");

    MongoClient.connect(url, function (err, db) {
        // if (err) throw err;
        var dbo = db.db("fabulistshangjia");
        var whereStr = {};  // 查询条件
        let obj23 = { code: "OK" };
        console.log(6666666)
        console.log(whereStr);
        console.log(req.body)
        whereStr["name"] = req.body.name;
        dbo.collection("fabulistshangjia").deleteOne(whereStr, function (err, obj) {
            try {
                err

            } catch (error) {
                console.log(error);
            }
            console.log("文档删除成功");
            res.json(obj23);
            db.close();
        });
    });

})



app.post('/detail', multipartMiddleware, function (req, res, next) {
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')

    res.header("Content-Type", "application/json;charset=utf-8");
    var whereStr = JSON.stringify({ "name": req.body.name })
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fabulist");
        dbo.collection("fabulist").find(whereStr).toArray(function (err, result) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].name == req.body.name) {
                    res.json(result[i]);
                    break;
                }
            }
            console.log(result);
            // res.json(result);
            db.close();
            return;
        });

    })

})

app.post('/about', multipartMiddleware, function (req, res, next) {
    console.log(666666666666)
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')

    res.header("Content-Type", "application/json;charset=utf-8");
    var whereStr = JSON.stringify({ "name": req.body.name })
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fabulist");
        dbo.collection("fabulist").find(whereStr).toArray(function (err, result) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].name == req.body.name && result[i].about > 0) {
                    let obj = result[i];
                    obj.code = 1;
                    res.json(obj);
                    let whereStr = { "name": result[i].name };  // 查询条件
                    let updateStr = { $set: { "about": --result[i].about } };
                    dbo.collection("fabulist").updateOne(whereStr, updateStr, function (err, res) {
                        if (err) throw err;
                        console.log("文档更新成功");
                        db.close();
                    });
                    break;
                }
            }
            db.close();
            return;
        });

    })

})




app.get('/fabulist', multipartMiddleware, function (req, res, next) {
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')

    res.header("Content-Type", "application/json;charset=utf-8");

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fabulist");
        dbo.collection("fabulist").find().toArray(function (err, result) {
            if (err) throw err;
            console.log(666)
            console.log(result);
            console.log("abc");
            res.json(result);
            db.close();
            return;
        });
    })
})

app.get('/fabulistshangjia', multipartMiddleware, function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')

    res.header("Content-Type", "application/json;charset=utf-8");

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fabulistshangjia");
        dbo.collection("fabulistshangjia").find().toArray(function (err, result) {
            if (err) throw err;
            console.log(666)
            console.log(result);
            console.log("abc");
            res.json(result);
            db.close();
            return;
        });
    })
})


app.post('/safe', multipartMiddleware, function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')

    res.header("Content-Type", "application/json;charset=utf-8");

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("safe");
        var myobj = req.body;
        let obj = { code: "OK", username: req.body.name }
        dbo.collection("safe").insertOne(myobj, function (err, res) {
            if (err) throw err;
        });
        res.json(obj);
        db.close();
        return;
    });

})
app.use(express.static("./page"));
app.listen(8085, () => {
    console.log('配置完成!')
})