var express = require("express");
const app = express();
const mysql = require("mysql");
// var dateFormat = require("dateformat");
const bodyParser = require("body-parser");
// const request = require("request");
const request = require("request");
const port = 8013;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.listen(port, () => console.log(`Server HR on port ${port}`));
var con = mysql.createConnection({
  host: "172.18.0.155",
  user: "apiuser",
  password: "gvH,wvgvl",
  database: "jibhr"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected To 155");
});
// var con_test = mysql.createConnection({
//   host: "172.18.0.155",
//   user: "apiuser",
//   password: "gvH,wvgvl",
//   database: "jibhr"
// });
// con_test.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected To 155");
// });

// ข้อมูลสาขาและแผนก
app.get("/hr/branchdata", function(req, res) {
  let str =
    "SELECT TRIM(departid) AS value,TRIM(departdescript) AS label FROM jibhr.og_department ORDER BY departid ASC";
  con.query(str, function(err, result) {
    if (!err) {
      res.json({ status: true, data: result });
    } else {
      res.json({ status: false, data: [], message: "No data" });
    }
  });
});

// ข้อมูลตำแหน่งงาน
app.get("/hr/position", function(req, res) {
  let str =
    "SELECT TRIM(rankid) AS value,TRIM(rankdescript) AS label FROM jibhr.og_rank ORDER BY rankid ASC";
  con.query(str, function(err, result) {
    if (!err) {
      res.json({ status: true, data: result });
    } else {
      res.json({ status: false, data: [], message: "No data" });
    }
  });
});

// เพิ่มข้อมูลสมัครงานใหม่
app.post("/hr/update/addregister", function(req, res) {
  console.log("/hr/update/addregister");
  // console.log(req.body)
  let dataJson = req.body;
  // INSER DATA
  try {
  Getnewdoc(function(error, content) {
    console.log("GET ID > no="+content)
    if(!error){
      let in_profile = "INSERT INTO jibhr.recruit_profile SET `no`='"+content+"',reg_date=CURDATE(),intro_name='"+dataJson.stp2.intro_name+"',first_name='"+dataJson.stp2.first_name
    +"',last_name='"+dataJson.stp2.last_name+"',nick_name='"+dataJson.stp2.nick_name+"',first_name_eng='"+dataJson.stp2.first_name_eng+"',last_name_eng='"+dataJson.stp2.last_name_eng
    +"',nick_name_eng='"+dataJson.stp2.nick_name_eng+"',person_id='"+dataJson.stp2.person_id+"',sex_status='"+dataJson.stp2.sex_status+"',birthday='"+dataJson.stp2.birthday
    +"',nationlity='"+dataJson.stp2.nationlity+"',race='"+dataJson.stp2.race+"',religion='"+dataJson.stp2.religion+"',age='"+dataJson.stp2.age+"',group_blood='"+dataJson.stp2.group_blood
    +"',height='"+dataJson.stp2.height+"',weight='"+dataJson.stp2.weight+"',home_land='"+dataJson.stp2.home_land+"',cur_no='"+dataJson.stp2.cur_no+"',cur_group='"+dataJson.stp2.cur_group
    +"',cur_village='"+dataJson.stp2.cur_village+"',cur_road='"+dataJson.stp2.cur_road+"',cur_zone='"+dataJson.stp2.cur_zone+"',cur_area='"+dataJson.stp2.cur_area+"',cur_city='"+dataJson.stp2.cur_city
    +"',cur_post='"+dataJson.stp2.cur_post+"',cur_tel='"+dataJson.stp2.cur_tel+"',cur_phone='"+dataJson.stp2.cur_phone+"',cur_fax='"+dataJson.stp2.cur_fax+"',cur_email='"+dataJson.stp2.cur_email
    +"',add_no='"+dataJson.stp2.add_no+"',add_group='"+dataJson.stp2.add_group+"',add_village='"+dataJson.stp2.add_village+"',add_road='"+dataJson.stp2.add_road+"',add_zone='"+dataJson.stp2.add_zone
    +"',add_area='"+dataJson.stp2.add_area+"',add_city='"+dataJson.stp2.add_city+"',add_post='"+dataJson.stp2.add_post+"',add_tel='"+dataJson.stp2.add_tel+"',add_phone='"+dataJson.stp2.add_phone
    +"',add_fax='"+dataJson.stp2.add_fax+"',with_status='"+dataJson.stp3.with_status+"',home_status='"+dataJson.stp3.home_status+"',family_status='"+dataJson.stp3.family_status
    +"',mate_name='"+dataJson.stp3.mate_name+"',mate_job='"+dataJson.stp3.mate_job+"',mate_jlocation='"+dataJson.stp3.mate_jlocation+"',child='"+dataJson.stp3.child+"',child_study='"+dataJson.stp3.child_study
    +"',child_num='"+dataJson.stp3.child_num+"',father_name='"+dataJson.stp3.father_name+"',father_job='"+dataJson.stp3.father_job+"',father_life_status='"+dataJson.stp3.father_life_status
    +"',mother_name='"+dataJson.stp3.mother_name+"',mother_job='"+dataJson.stp3.mother_job+"',mother_life_status='"+dataJson.stp3.mother_life_status+"',soldier_status='"+dataJson.stp3.soldier_status
    +"',exi_name='"+dataJson.stp4.exi_name+"',exi_relation='"+dataJson.stp4.exi_relation+"',exi_address='"+dataJson.stp4.exi_address+"',exi_tel='"+dataJson.stp4.exi_tel+"',exi_phone='"+dataJson.stp4.exi_phone
    +"',jib_know='"+dataJson.stp4.jib_know+"',jib_know_other='"+dataJson.stp4.jib_know_other+"',job_first='"+dataJson.stp1.job_first+"',job_second='"+dataJson.stp1.job_second+"',parttime='"+dataJson.stp1.parttime
    +"',salary='"+dataJson.stp1.salary+"',work_status='"+dataJson.stp1.work_status+"',start_date='"+dataJson.stp1.start_date+"',branch='"+dataJson.stp1.branch+"',father_tel='"+dataJson.stp3.father_tel
    +"',mother_tel='"+dataJson.stp3.mother_tel+"',facebook='"+dataJson.stp4.facebook+"',line='"+dataJson.stp4.line+"'";

    let in_education = "INSERT INTO jibhr.recruit_education SET `no`='"+content+"',low_sc_name='"+dataJson.stp5.low_sc_name+"',low_sc_major='"+dataJson.stp5.low_sc_major+"',low_sc_form='"+dataJson.stp5.low_sc_form
    +"',low_sc_to='"+dataJson.stp5.low_sc_to+"',low_sc_grade='"+dataJson.stp5.low_sc_grade+"',high_sc_name='"+dataJson.stp5.high_sc_name+"',high_sc_major='"+dataJson.stp5.high_sc_major
    +"',high_sc_from='"+dataJson.stp5.high_sc_from+"',high_sc_to='"+dataJson.stp5.high_sc_to+"',high_sc_grade='"+dataJson.stp5.high_sc_grade+"',low_st_name='"+dataJson.stp5.low_st_name
    +"',low_st_major='"+dataJson.stp5.low_st_major+"',low_st_from='"+dataJson.stp5.low_st_from+"',low_st_to='"+dataJson.stp5.low_st_to+"',low_st_grade='"+dataJson.stp5.low_st_grade
    +"',high_st_name='"+dataJson.stp5.high_st_name+"',high_st_major='"+dataJson.stp5.high_st_major+"',high_st_from='"+dataJson.stp5.high_st_from+"',high_st_to='"+dataJson.stp5.high_st_to
    +"',high_st_grade='"+dataJson.stp5.high_st_grade+"',bachelor_name='"+dataJson.stp5.bachelor_name+"',bachelor_major='"+dataJson.stp5.bachelor_major+"',bachelor_from='"+dataJson.stp5.bachelor_from
    +"',bachelor_to='"+dataJson.stp5.bachelor_to+"',bachelor_grade='"+dataJson.stp5.bachelor_grade+"',master_name='"+dataJson.stp5.master_name+"',master_major='"+dataJson.stp5.master_major
    +"',master_from='"+dataJson.stp5.master_from+"',master_to='"+dataJson.stp5.master_to+"',master_grade='"+dataJson.stp5.master_grade+"',other_name='"+dataJson.stp5.other_name
    +"',other_major='"+dataJson.stp5.other_major+"',other_from='"+dataJson.stp5.other_from+"',other_to='"+dataJson.stp5.other_to+"',other_grade='"+dataJson.stp5.other_grade+"',activity='"+dataJson.stp5.activity+"'";

    let in_skill="INSERT INTO jibhr.recruit_skill SET `no`='"+content+"',speak_thai_status='"+dataJson.stp8.speak_thai_status+"',speak_eng_status='"+dataJson.stp8.speak_eng_status
    +"',speak_other_status='"+dataJson.stp8.speak_other_status+"',speak_other_detail='"+dataJson.stp8.speak_other_detail+"',read_thai_status='"+dataJson.stp8.read_thai_status
    +"',read_eng_status='"+dataJson.stp8.read_eng_status+"',read_other_status='"+dataJson.stp8.read_other_status+"',write_thai_status='"+dataJson.stp8.write_thai_status
    +"',write_eng_status='"+dataJson.stp8.write_eng_status+"',write_other_status='"+dataJson.stp8.write_other_status+"',com_excel_status='"+dataJson.stp8.com_excel_status
    +"',com_word_status='"+dataJson.stp8.com_word_status+"',com_windows_status='"+dataJson.stp8.com_windows_status+"',com_other_status='"+dataJson.stp8.com_other_status
    +"',com_other_detail='"+dataJson.stp8.com_other_detail+"',pim_thai_status='"+dataJson.stp8.pim_thai_status+"',pim_eng_status='"+dataJson.stp8.pim_eng_status
    +"',skill_other='"+dataJson.stp8.skill_other+"',car='"+dataJson.stp8.car+"',car_card='"+dataJson.stp8.car_card+"',bike='"+dataJson.stp8.bike+"',bike_card='"+dataJson.stp8.bike_card
    +"',ins_ststus='"+dataJson.stp8.ins_ststus+"',jib_name='"+dataJson.stp8.jib_name+"',jib_relation='"+dataJson.stp8.jib_relation+"',reg_detail='"+dataJson.stp8.reg_detail+"'";  
    con.query(in_profile, function(err, result) {
      if (!err) {
            console.log("INSERT in_profile > no="+content)
      } else {
            con.query("DELETE FROM jibhr.recruit_profile WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_education WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_skill WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_training WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_work WHERE `no`='"+content+"'", function(err, result) {
            })
            res.json({ status: false, error: err, message: 'บันทึกไม่สำเร็จ' });
      }
    });  
    con.query(in_education, function(err, result) {
      if (!err) {
            console.log("INSERT in_education > no="+content)
      } else {
            con.query("DELETE FROM jibhr.recruit_profile WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_education WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_skill WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_training WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_work WHERE `no`='"+content+"'", function(err, result) {
            })
            res.json({ status: false, error: err, message: 'บันทึกไม่สำเร็จ' });
      }
    }); 
    con.query(in_skill, function(err, result) {
      if (!err) {
            console.log("INSERT in_skill > no="+content)
      } else {
            con.query("DELETE FROM jibhr.recruit_profile WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_education WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_skill WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_training WHERE `no`='"+content+"'", function(err, result) {
            })
            con.query("DELETE FROM jibhr.recruit_work WHERE `no`='"+content+"'", function(err, result) {
            })
            res.json({ status: false, error: err, message: 'บันทึกไม่สำเร็จ' });
      }
    }); 
    for(var i=0;i<dataJson.stp6.length;i++){
        let in_training="INSERT INTO jibhr.recruit_training SET `no`='"+content+"',training_year='"+dataJson.stp6[i].training_year+"',training_name='"+dataJson.stp6[i].training_name
        +"',training_course='"+dataJson.stp6[i].training_course+"',training_time='"+dataJson.stp6[i].training_time+"'";
        con.query(in_training, function(err, result) {
          if (!err) {
                    console.log("INSERT in_training > no="+content)
              } else {
                    con.query("DELETE FROM jibhr.recruit_profile WHERE `no`='"+content+"'", function(err, result) {
                    })
                    con.query("DELETE FROM jibhr.recruit_education WHERE `no`='"+content+"'", function(err, result) {
                    })
                    con.query("DELETE FROM jibhr.recruit_skill WHERE `no`='"+content+"'", function(err, result) {
                    })
                    con.query("DELETE FROM jibhr.recruit_training WHERE `no`='"+content+"'", function(err, result) {
                    })
                    con.query("DELETE FROM jibhr.recruit_work WHERE `no`='"+content+"'", function(err, result) {
                    })
                    res.json({ status: false, error: err, message: 'บันทึกไม่สำเร็จ' });
              }
        })
    }
    for(var i=0;i<dataJson.stp7.length;i++){
      var workfrom = dataJson.stp7[i].work_from_m+'-'+dataJson.stp7[i].work_from_y;
      var workto = dataJson.stp7[i].work_to_m+'-'+dataJson.stp7[i].work_to_y;
      let in_work="INSERT INTO jibhr.recruit_work SET `no`='"+content+"',work_location='"+dataJson.stp7[i].work_location+"',work_from='"+workfrom
      +"',work_to='"+workto+"',work_salary='"+dataJson.stp7[i].work_salary+"',work_job='"+dataJson.stp7[i].work_job+"',work_out='"+dataJson.stp7[i].work_out+"'";
      con.query(in_work, function(err, result) {
        if (!err) {
                  console.log("INSERT in_work > no="+content)
            } else {
                  con.query("DELETE FROM jibhr.recruit_profile WHERE `no`='"+content+"'", function(err, result) {
                  })
                  con.query("DELETE FROM jibhr.recruit_education WHERE `no`='"+content+"'", function(err, result) {
                  })
                  con.query("DELETE FROM jibhr.recruit_skill WHERE `no`='"+content+"'", function(err, result) {
                  })
                  con.query("DELETE FROM jibhr.recruit_training WHERE `no`='"+content+"'", function(err, result) {
                  })
                  con.query("DELETE FROM jibhr.recruit_work WHERE `no`='"+content+"'", function(err, result) {
                  })
                  res.json({ status: false, error: err, message: 'บันทึกไม่สำเร็จ' });
            }
      })
      if(i==dataJson.stp7.length-1){
        res.json({ status: true,  message: "บันทึกสำเร็จ",no:content });
      }
  }
    
    }else{
    res.json({no:content,str:in_profile,err:error});  
    }
   
  });

  // -----สร้างเลขเอกสารใหม่
  function Getnewdoc(callback) {
    con.query(
      "SELECT MAX(no) AS lastDoc FROM jibhr.recruit_profile",
      function(err, rows, fields) {
        if (!err) {
          var headersOpt = {
            "content-type": "application/x-www-form-urlencoded",
            "content-type": "multipart/form-data"
          };
          request(
            {
              method: "POST",
              url: "http://172.18.0.30/api_app/index.php/Generate/CodeGenerate",
              headers: headersOpt,
              formData: {
                digitnum: "4",
                title: "RC",
                lastrows: rows[0].lastDoc
              },
              json: false
            },

            function(error, response, body) {
              if (!error) {
                callback(null, response.body);
              } else {
                res.json(error);
              }
            }
          );
        } else {
          res.json(err);
        }
      }
    );
  }
  //สร้างเลขเอกสารใหม่-------
}
catch(err) {
  res.json({ status: false,  message: "บันทึกไม่สำเร็จ" });
}
});

// แก้ไขข้อมูลสมัครงาน
app.post("/hr/update/updateregister", function(req, res) {
  console.log("/hr/update/updateregister");
  let dataJson = req.body;
  switch(dataJson.editstep) {
    case "1":
          let up1="UPDATE jibhr.recruit_profile SET branch='"+dataJson.stp1.branch+"',job_first='"+dataJson.stp1.job_first+"',job_second='"+dataJson.stp1.job_second
          +"',salary='"+dataJson.stp1.salary+"',start_date='"+dataJson.stp1.start_date+"',work_status='"+dataJson.stp1.work_status+"',parttime='"+dataJson.stp1.parttime+"' WHERE no='"+dataJson.jobcode+"'";
          con.query(up1, function(err, result) {
            if (!err){
              console.log("Edit Job Description..");
              res.json({ status: true,  message: "แก้ไข Job Description สำเร็จแล้ว" });
            }else{
              res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถแก้ไขได้" });
            }
          })
      break;
    case "2":
          let up2="UPDATE jibhr.recruit_profile SET intro_name='"+dataJson.stp2.intro_name+"',first_name='"+dataJson.stp2.first_name+"',last_name='"+dataJson.stp2.last_name
          +"',nick_name='"+dataJson.stp2.nick_name+"',first_name_eng='"+dataJson.stp2.first_name_eng+"',last_name_eng='"+dataJson.stp2.last_name_eng+"',nick_name_eng='"+dataJson.stp2.nick_name_eng
          +"',birthday='"+dataJson.stp2.birthday+"',person_id='"+dataJson.stp2.person_id+"',sex_status='"+dataJson.stp2.sex_status+"',age='"+dataJson.stp2.age+"',group_blood='"+dataJson.stp2.group_blood
          +"',height='"+dataJson.stp2.height+"',weight='"+dataJson.stp2.weight+"',nationlity='"+dataJson.stp2.nationlity+"',race='"+dataJson.stp2.race+"',religion='"+dataJson.stp2.religion
          +"',home_land='"+dataJson.stp2.home_land+"',cur_no='"+dataJson.stp2.cur_no+"',cur_group='"+dataJson.stp2.cur_group+"',cur_village='"+dataJson.stp2.cur_village
          +"',cur_road='"+dataJson.stp2.cur_road+"',cur_zone='"+dataJson.stp2.cur_zone+"',cur_area='"+dataJson.stp2.cur_area+"',cur_city='"+dataJson.stp2.cur_city
          +"',cur_post='"+dataJson.stp2.cur_post+"',cur_tel='"+dataJson.stp2.cur_tel+"',cur_phone='"+dataJson.stp2.cur_phone+"',cur_fax='"+dataJson.stp2.cur_fax+"',cur_email='"+dataJson.stp2.cur_email
          +"',add_no='"+dataJson.stp2.add_no+"',add_group='"+dataJson.stp2.add_group+"',add_village='"+dataJson.stp2.add_village+"',add_road='"+dataJson.stp2.add_road
          +"',add_zone='"+dataJson.stp2.add_zone+"',add_area='"+dataJson.stp2.add_area+"',add_city='"+dataJson.stp2.add_city+"',add_post='"+dataJson.stp2.add_post
          +"',add_tel='"+dataJson.stp2.add_tel+"',add_phone='"+dataJson.stp2.add_phone+"',add_fax='"+dataJson.stp2.add_fax+"' WHERE no='"+dataJson.jobcode+"'";
          con.query(up2, function(err, result) {
            if (!err){
              console.log("Edit Profile..");
              res.json({ status: true,  message: "แก้ไข Edit Profile สำเร็จแล้ว" });
            }else{
              res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถแก้ไขได้" });
            }
          })
      break;
    case "3":
          let up3="UPDATE jibhr.recruit_profile SET child='"+dataJson.stp3.child+"',child_num='"+dataJson.stp3.child_num+"',child_study='"+dataJson.stp3.child_study
          +"',family_status='"+dataJson.stp3.family_status+"',father_job='"+dataJson.stp3.father_job+"',father_life_status='"+dataJson.stp3.father_life_status+"',father_name='"+dataJson.stp3.father_name
          +"',father_tel='"+dataJson.stp3.father_tel+"',home_status='"+dataJson.stp3.home_status+"',mate_jlocation='"+dataJson.stp3.mate_jlocation+"',mate_job='"+dataJson.stp3.mate_job+"',mate_name='"+dataJson.stp3.mate_name
          +"',mother_job='"+dataJson.stp3.mother_job+"',mother_life_status='"+dataJson.stp3.mother_life_status+"',mother_name='"+dataJson.stp3.mother_name+"',mother_tel='"+dataJson.stp3.mother_tel+"',soldier_status='"+dataJson.stp3.soldier_status
          +"',with_status='"+dataJson.stp3.home_land+"' WHERE no='"+dataJson.jobcode+"'";
          con.query(up3, function(err, result) {
            if (!err){
              console.log("Edit Family..");
              res.json({ status: true,  message: "แก้ไข Edit Family สำเร็จแล้ว" });
            }else{
              res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถแก้ไขได้" });
            }
          })
          
      break;
    case "4":
          let up4="UPDATE jibhr.recruit_profile SET exi_address='"+dataJson.stp4.exi_address+"',exi_name='"+dataJson.stp4.exi_name+"',exi_phone='"+dataJson.stp4.exi_phone
          +"',exi_relation='"+dataJson.stp4.exi_relation+"',exi_tel='"+dataJson.stp4.exi_tel+"',facebook='"+dataJson.stp4.facebook+"',jib_know='"+dataJson.stp4.jib_know
          +"',jib_know_other='"+dataJson.stp4.jib_know_other+"',line='"+dataJson.stp4.line+"' WHERE no='"+dataJson.jobcode+"'";
          con.query(up4, function(err, result) {
            if (!err){
              console.log("Edit Contact..");
              res.json({ status: true,  message: "แก้ไข Edit Contact สำเร็จแล้ว" });
            }else{
              res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถแก้ไขได้" });
            }
          })
      break;
    case "5":
          let up5="UPDATE jibhr.recruit_education  SET activity='"+dataJson.stp5.activity+"',bachelor_from='"+dataJson.stp5.bachelor_from+"',bachelor_grade='"+dataJson.stp5.bachelor_grade
          +"',bachelor_major='"+dataJson.stp5.bachelor_major+"',bachelor_name='"+dataJson.stp5.bachelor_name+"',bachelor_to='"+dataJson.stp5.bachelor_to+"',high_sc_from='"+dataJson.stp5.high_sc_from
          +"',high_sc_grade='"+dataJson.stp5.high_sc_grade+"',high_sc_major='"+dataJson.stp5.high_sc_major+"',high_sc_name='"+dataJson.stp5.high_sc_name+"',high_sc_to='"+dataJson.stp5.high_sc_to+"',high_st_from='"+dataJson.stp5.high_st_from
          +"',high_st_grade='"+dataJson.stp5.high_st_grade+"',high_st_major='"+dataJson.stp5.high_st_major+"',high_st_name='"+dataJson.stp5.high_st_name+"',high_st_to='"+dataJson.stp5.high_st_to+"',low_sc_form='"+dataJson.stp5.low_sc_form
          +"',low_sc_grade='"+dataJson.stp5.low_sc_grade+"',low_sc_major='"+dataJson.stp5.low_sc_major+"',low_sc_name='"+dataJson.stp5.low_sc_name+"',low_sc_to='"+dataJson.stp5.low_sc_to
          +"',low_st_from='"+dataJson.stp5.low_st_from+"',low_st_grade='"+dataJson.stp5.low_st_grade+"',low_st_major='"+dataJson.stp5.low_st_major+"',low_st_name='"+dataJson.stp5.low_st_name
          +"',low_st_to='"+dataJson.stp5.low_st_to+"',master_from='"+dataJson.stp5.master_from+"',master_grade='"+dataJson.stp5.master_grade+"',master_major='"+dataJson.stp5.master_major+"',master_name='"+dataJson.stp5.master_name
          +"',master_to='"+dataJson.stp5.master_to+"',other_from='"+dataJson.stp5.other_from+"',other_grade='"+dataJson.stp5.other_grade+"',other_major='"+dataJson.stp5.other_major
          +"',other_name='"+dataJson.stp5.other_name+"',other_to='"+dataJson.stp5.other_to+"' WHERE no='"+dataJson.jobcode+"'";
          con.query(up5, function(err, result) {
            if (!err){
              console.log("Edit Education...");
              res.json({ status: true,  message: "แก้ไข Edit Education. สำเร็จแล้ว" });
            }else{
              res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถแก้ไขได้" });
            }
          })
      break;
    case "6":
        con.query("DELETE FROM jibhr.recruit_training  WHERE `no`='"+dataJson.jobcode+"'", function(err, result) {
          if(!err){
            console.log("DELETE UP in_training > no="+dataJson.jobcode)
            for(var i=0;i<dataJson.stp6.length;i++){
              let in_training="INSERT INTO jibhr.recruit_training SET `no`='"+dataJson.jobcode+"',training_year='"+dataJson.stp6[i].training_year+"',training_name='"+dataJson.stp6[i].training_name
              +"',training_course='"+dataJson.stp6[i].training_course+"',training_time='"+dataJson.stp6[i].training_time+"'";
              con.query(in_training, function(err, result) {
                if (!err) {
                          console.log("INSERT UP in_training > no="+dataJson.jobcode)
                          
                    } else {
                          res.json({ status: false, error: err, message: 'ทำรายการไม่สำเร็จ' });
                    }
              })
            }
              console.log("Edit Training..");
              res.json({ status: true,  message: "แก้ไข Edit Training สำเร็จแล้ว" });
          }else{
            res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถแก้ไขได้" });
          }
        })
          
      break;
    case "7":
          con.query("DELETE FROM jibhr.recruit_work  WHERE `no`='"+dataJson.jobcode+"'", function(err, result) {
            if(!err){
              console.log("DELETE UP Career History > no="+dataJson.jobcode)
              for(var i=0;i<dataJson.stp6.length;i++){
                let in_work="INSERT INTO jibhr.recruit_work SET `no`='"+dataJson.jobcode+"',work_location='"+dataJson.stp7[i].work_location+"',work_from='"+dataJson.stp7[i].work_from
                    +"',work_to='"+dataJson.stp7[i].work_to+"',work_salary='"+dataJson.stp7[i].work_salary+"',work_job='"+dataJson.stp7[i].work_job+"',work_out='"+dataJson.stp7[i].work_out+"'"; 
                con.query(in_work, function(err, result) {
                  if (!err) {
                            console.log("INSERT UP Career History > no="+dataJson.jobcode)
                            
                      } else {
                            res.json({ status: false, error: err, message: 'ทำรายการไม่สำเร็จ' });
                      }
                })
              }
                console.log("Edit Career History..");
                res.json({ status: true,  message: "แก้ไข Edit Career History สำเร็จแล้ว" });
            }else{
              res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถแก้ไขได้" });
            }
          })
      break;
    case "8":
          let up8="UPDATE jibhr.recruit_skill  SET bike='"+dataJson.stp8.bike+"',bike_card='"+dataJson.stp8.bike_card+"',car='"+dataJson.stp8.car
          +"',car_card='"+dataJson.stp8.car_card+"',com_excel_status='"+dataJson.stp8.com_excel_status+"',com_other_detail='"+dataJson.stp8.com_other_detail+"',com_other_status='"+dataJson.stp8.com_other_status
          +"',com_windows_status='"+dataJson.stp8.com_windows_status+"',com_word_status='"+dataJson.stp8.com_word_status+"',ins_ststus='"+dataJson.stp8.ins_ststus+"',jib_name='"+dataJson.stp8.jib_name+"',jib_relation='"+dataJson.stp8.jib_relation
          +"',pim_eng_status='"+dataJson.stp8.pim_eng_status+"',pim_thai_status='"+dataJson.stp8.pim_thai_status+"',read_eng_status='"+dataJson.stp8.read_eng_status+"',read_other_status='"+dataJson.stp8.read_other_status+"',read_thai_status='"+dataJson.stp8.read_thai_status
          +"',reg_detail='"+dataJson.stp8.reg_detail+"',skill_other='"+dataJson.stp8.skill_other+"',speak_eng_status='"+dataJson.stp8.speak_eng_status+"',speak_other_detail='"+dataJson.stp8.speak_other_detail
          +"',speak_other_status='"+dataJson.stp8.speak_other_status+"',speak_thai_status='"+dataJson.stp8.speak_thai_status+"',write_eng_status='"+dataJson.stp8.write_eng_status+"',write_other_status='"+dataJson.stp8.write_other_status
          +"',write_thai_status='"+dataJson.stp8.write_thai_status+"' WHERE no='"+dataJson.jobcode+"'";
          con.query(up8, function(err, result) {
            if (!err){
              console.log("Edit Skill..");
              res.json({ status: true,  message: "แก้ไข Edit Skill สำเร็จแล้ว" });
            }else{
              res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถแก้ไขได้" });
            }
          })
      break;
    default:
      // code block
  }
});

app.post("/hr/job/registerdoc", function(req, res) {
  console.log("/hr/job/registerdoc");
  let dataJson = req.body;
  if(dataJson.searchdate!='' || dataJson.searchdate){
    let str="SELECT `no`,intro_name,CONCAT(first_name,' ',last_name) AS regisname,nick_name,job_first,job_second FROM jibhr.recruit_profile WHERE reg_date='"+dataJson.searchdate+"'";
    con.query(str, function(err, result) {
      if (!err){
        res.json({ status: true,  data: result });
      }else{
        res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถค้นหาได้" });
      }
    })
  }else{
    res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถค้นหาได้" });
  }
});

app.post("/hr/job/registeredit", function(req, res) {
  console.log("/hr/job/registerdoc");
  let dataJson = req.body;
    let str1="SELECT a.`no`,cast( a.reg_date AS CHAR charset utf8 ) AS reg_date,a.intro_name,a.first_name,a.last_name,a.nick_name,a.first_name_eng,a.last_name_eng,"+
    "a.nick_name_eng,a.person_id,a.sex_status,cast(a.birthday AS CHAR charset utf8) AS birthday,a.nationlity,a.race,a.religion,a.age,a.group_blood,a.height,a.weight,"+
    "a.home_land,a.cur_no,a.cur_group,a.cur_village,a.cur_road,a.cur_zone,a.cur_area,a.cur_city,a.cur_post,a.cur_tel,a.cur_phone,a.cur_fax,a.cur_email,a.add_no,a.add_group,"+
    "a.add_village,a.add_road,a.add_zone,a.add_area,a.add_city,a.add_post,a.add_tel,a.add_phone,a.add_fax,a.with_status,a.home_status,a.family_status,a.mate_name,"+
    "a.mate_job,a.mate_jlocation,a.child,a.child_study,a.child_num,a.father_name,a.father_job,a.father_life_status,a.mother_name,a.mother_job,a.mother_life_status,"+
    "a.soldier_status,a.exi_name,a.exi_relation,a.exi_address,a.exi_tel,a.exi_phone,a.jib_know,a.jib_know_other,a.job_first,a.job_second,a.parttime,a.salary,"+
    "a.work_status,cast(a.start_date AS CHAR charset utf8 ) AS start_date,a.branch,a.father_tel,a.mother_tel,a.facebook,a.line,a.upd "+
    "FROM jibhr.recruit_profile AS a WHERE a.`no`='"+dataJson.jobcode+"'";
    con.query(str1, function(err, result1) {
      if (!err){
        let str2="SELECT * FROM jibhr.recruit_education AS a WHERE a.`no`='"+dataJson.jobcode+"'";
        con.query(str2, function(err, result2) {
          if (!err){
            let str3="SELECT * FROM jibhr.recruit_skill AS a WHERE a.`no`='"+dataJson.jobcode+"'";
            con.query(str3, function(err, result3) {
              if (!err){
                let str4="SELECT * FROM jibhr.recruit_training AS a WHERE a.`no`='"+dataJson.jobcode+"'";
                con.query(str4, function(err, result4) {
                  if (!err){
                    let str5="SELECT * FROM jibhr.recruit_work AS a WHERE a.`no`='"+dataJson.jobcode+"'";
                    con.query(str5, function(err, result5) {
                      if (!err){
                        let stp1=Array();let stp2=Array();let stp3=Array();let stp4=Array();let stp5=Array();let stp6=Array();let stp7=Array();let stp8=Array();
                            stp1={
                              "branch": result1[0].branch,
                              "job_first":result1[0].job_first,
                              "job_second":result1[0].job_second,
                              "salary":result1[0].salary,
                              "start_date":result1[0].start_date,
                              "work_status":result1[0].work_status,
                              "parttime":result1[0].parttime
                            }
                            stp2={
                              "intro_name": result1[0].intro_name,
                              "first_name": result1[0].first_name,
                              "last_name": result1[0].last_name,
                              "nick_name": result1[0].nick_name,
                              "first_name_eng": result1[0].first_name_eng,
                              "last_name_eng": result1[0].last_name_eng,
                              "nick_name_eng": result1[0].nick_name_eng,
                              "birthday": result1[0].birthday,
                              "person_id": result1[0].person_id,
                              "sex_status": result1[0].sex_status,
                              "age": result1[0].age,
                              "group_blood": result1[0].group_blood,
                              "height": result1[0].height,
                              "weight": result1[0].weight,
                              "nationlity": result1[0].nationlity,
                              "race": result1[0].race,
                              "religion": result1[0].religion,
                              "home_land": result1[0].home_land,
                              "cur_no": result1[0].cur_no,
                              "cur_group": result1[0].cur_group,
                              "cur_village": result1[0].cur_village,
                              "cur_road": result1[0].cur_road,
                              "cur_zone": result1[0].cur_zone,
                              "cur_area": result1[0].cur_area,
                              "cur_city": result1[0].cur_city,
                              "cur_post": result1[0].cur_post,
                              "cur_tel": result1[0].cur_tel,
                              "cur_phone": result1[0].cur_phone,
                              "cur_fax": result1[0].cur_fax,
                              "cur_email": result1[0].cur_email,
                              "add_no": result1[0].add_no,
                              "add_group": result1[0].add_group,
                              "add_village":  result1[0].add_village,
                              "add_road":  result1[0].add_road,
                              "add_zone":  result1[0].add_zone,
                              "add_area":  result1[0].add_area,
                              "add_city":  result1[0].add_city,
                              "add_post":  result1[0].add_post,
                              "add_tel":  result1[0].add_tel,
                              "add_phone":  result1[0].add_phone,
                              "add_fax": result1[0].add_fax,
                            }
                            stp3={
                              "child":  result1[0].child,
                              "child_num":  result1[0].child_num,
                              "child_study":  result1[0].child_study,
                              "family_status":  result1[0].family_status,
                              "father_job":  result1[0].father_job,
                              "father_life_status":  result1[0].father_life_status,
                              "father_name": result1[0].father_name,
                              "father_tel":  result1[0].father_tel,
                              "home_status": result1[0].home_status,
                              "mate_jlocation": result1[0].mate_jlocation,
                              "mate_job": result1[0].mate_job,
                              "mate_name": result1[0].mate_name,
                              "mother_job": result1[0].mother_job,
                              "mother_life_status": result1[0].mother_life_status,
                              "mother_name": result1[0].mother_name,
                              "mother_tel": result1[0].mother_tel,
                              "soldier_status": result1[0].soldier_status,
                              "with_status": result1[0].with_status
                            }
                            stp4={
                              "exi_address": result1[0].exi_address,
                              "exi_name": result1[0].exi_name,
                              "exi_phone": result1[0].exi_phone,
                              "exi_relation": result1[0].exi_relation,
                              "exi_tel": result1[0].exi_tel,
                              "facebook": result1[0].facebook,
                              "jib_know": result1[0].jib_know,
                              "jib_know_other": result1[0].jib_know_other,
                              "line": result1[0].line,
                            }
                            stp5={
                              "activity": result2[0].activity,
                              "bachelor_from": result2[0].bachelor_from,
                              "bachelor_grade": result2[0].bachelor_grade,
                              "bachelor_major": result2[0].bachelor_major,
                              "bachelor_name": result2[0].bachelor_name,
                              "bachelor_to": result2[0].bachelor_to,
                              "high_sc_from": result2[0].high_sc_from,
                              "high_sc_grade": result2[0].high_sc_grade,
                              "high_sc_major":  result2[0].high_sc_major,
                              "high_sc_name":  result2[0].high_sc_name,
                              "high_sc_to": result2[0].high_sc_to,
                              "high_st_from": result2[0].high_st_from,
                              "high_st_grade": result2[0].high_st_grade,
                              "high_st_major": result2[0].high_st_major,
                              "high_st_name":  result2[0].high_st_name,
                              "high_st_to": result2[0].high_st_to,
                              "low_sc_form": result2[0].low_sc_form,
                              "low_sc_grade": result2[0].low_sc_grade,
                              "low_sc_major": result2[0].low_sc_major,
                              "low_sc_name":  result2[0].low_sc_name,
                              "low_sc_to": result2[0].low_sc_to,
                              "low_st_from": result2[0].low_st_from,
                              "low_st_grade": result2[0].low_st_grade,
                              "low_st_major": result2[0].low_st_major,
                              "low_st_name": result2[0].low_st_name,
                              "low_st_to": result2[0].low_st_to,
                              "master_from": result2[0].master_from,
                              "master_grade": result2[0].master_grade,
                              "master_major": result2[0].master_major,
                              "master_name": result2[0].master_name,
                              "master_to": result2[0].master_to,
                              "other_from":  result2[0].other_from,
                              "other_grade": result2[0].other_grade,
                              "other_major": result2[0].other_major,
                              "other_name": result2[0].other_name,
                              "other_to": result2[0].other_to,
                            }
                            stp8={
                              "bike":  result3[0].bike,
                              "bike_card":  result3[0].bike_card,
                              "car":  result3[0].car,
                              "car_card":  result3[0].car_card,
                              "com_excel_status":  result3[0].com_excel_status,
                              "com_other_detail":  result3[0].com_other_detail,
                              "com_other_status":  result3[0].com_other_status,
                              "com_windows_status":  result3[0].com_windows_status,
                              "com_word_status":  result3[0].com_word_status,
                              "ins_ststus":  result3[0].ins_ststus,
                              "jib_name":  result3[0].jib_name,
                              "jib_relation":  result3[0].jib_relation,
                              "pim_eng_status":  result3[0].pim_eng_status,
                              "pim_thai_status":  result3[0].pim_thai_status,
                              "read_eng_status":  result3[0].read_eng_status,
                              "read_other_status":  result3[0].read_other_status,
                              "read_thai_status":  result3[0].read_thai_status,
                              "reg_detail":  result3[0].reg_detail,
                              "skill_other":  result3[0].skill_other,
                              "speak_other_detail":  result3[0].speak_other_detail,
                              "speak_other_status":  result3[0].speak_other_status,
                              "speak_thai_status":  result3[0].speak_thai_status,
                              "write_eng_status":  result3[0].write_eng_status,
                              "write_other_status":  result3[0].write_other_status,
                              "write_thai_status":  result3[0].write_thai_status,
                            }


                        res.json({ status: true,  data: {stp1:stp1,stp2:stp2,stp3:stp3,stp4:stp4,stp5:stp5,stp6:result4,stp7:result5,stp8:stp8} });
                      }else{
                        res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถค้นหาได้" });
                      }
                    })
                  }else{
                    res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถค้นหาได้" });
                  }
                })
              }else{
                res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถค้นหาได้" });
              }
            })
          }else{
            res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถค้นหาได้" });
          }
        })
        
      }else{
        res.json({ status: false,  message: "เกิดเหตุขัดข้อง ไม่สามารถค้นหาได้" });
      }
    })
 
});



app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send(err);
  } else {
    next(err);
  }
});
