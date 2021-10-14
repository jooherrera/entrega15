export function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    res.render("protected")
  }else{
    res.render('not')
  }
}