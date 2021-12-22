const app = require('../component/Express');
const passport = require('../component/Passport');
const jwt = require('jsonwebtoken');

const helloWorldUrl = '/hello';
const sortNumUrl = '/sortnum';
const loginUrl = '/login';

app.get(helloWorldUrl, async (req, res) => {
  res.status(200).send('Hello World');
});

app.post(sortNumUrl, async (req, res) => {
  try {
    const { numbers } = req.body;
    const result = numbers.sort((a, b) => a - b);

    res.status(200).send(result);
  } catch (err) {
    console.log(err)
    res.status(400).send({ message: "Failed to sort the number" });
  }
});

app.post(loginUrl, function (req, res, next) {
  passport.authenticate('local', { session: false }, function (err, user, info) {

    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(400).send(err);
      }
    });

    const token = jwt.sign(user, 'jwt_key');
    res.json({ user, "access-token": token });
  })(req, res, next);
});