var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { session: req.session });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    session: req.session,
    alert: false
  });
});

router.post('/login', function(req, res, next) {
  if( req.body.pw == 'test' ) {
    req.session.regenerate( function(){
      req.session.loggㅅed_in = true;
      req.session.user_id = req.body.id;
      res.redirect('/');
    });
    return;
  }
  res.render('login', {
    session: req.session,
    alert: { level:'warning', message: "아이디 또는 패스워드가 맞지 않습니다." }
  });
});
 
router.post('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});

router.get('/session', function(req, res, next) {
  res.render('session', {
    vcap_application: JSON.parse(process.env.VCAP_APPLICATION),
    sessionID: req.sessionID,
    session: req.session
  });
});

module.exports = router;
