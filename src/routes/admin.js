const router = require('koa-router')();
const koaParser = require('koa-bodyparser');
const crypto = require('crypto');
const { ap, an, sk } = require('../libs/secrets');
const knex = require('../connector');
const { today } = require('../libs/utils/today');
const Bonus = require('../models/Bonus');
const User = require('../models/User');

router.post('/user', koaParser(), async (ctx, next) => {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;

  console.log(username, password, ctx.request.body);
  if (username !== an || password !== ap) {
    ctx.body = {
      error: 'username or password wrong'
    };
    return;
  }

  ctx.body = {
    error: ''
  };

  ctx.logedIn = true;

  await next();
});

router.get('/consumers/all', async (ctx, next) => {
  if (ctx.logedIn) {
    const res = []
    const users = await knex('users').select('*')
    await Promise.all(users.map(async (user) => {
      const bonus = await Bonus.getBonus(user.uid);
      user.bonus = bonus;
      delete user.uid;
      delete user.session_key;
      res.push(user)
    }))
    ctx.body = {
      data: res
    }
  } else {
    ctx.redirect('/');
  }
});

router.post('/recycle', koaParser(), async (ctx, next) => {
  if (ctx.logedIn) {
    const stdid = ctx.request.stdid;
    // 以 kg 为单位
    const paper = ctx.request.paper;
    const bottle = ctx.request.bottle;
    const cloth = ctx.request.cloth;
  
    const date = doday;
    let id = "";
  
    try {
      const [user] = await knex('users').where({ student_id: stdid }).select('*')
      id = user.uid;
    } catch {
      ctx.body = {
        error: "register first"
      }
    }
  
    await knex('recycle_items').insert({
      stdid = "",
      paper = 0,
      bottle = 0,
      date,
      cloth
    });
  
    await Bonus.addBonus(id, paper * 6 + bottle * 0.5)
  
    ctx.body = {
      error: ""
    }
  } else {
    ctx.redirect('/');
  }

  await next();
});

router.post('/garbage', async (ctx, next) => {
  await next()
})

module.exports = router;
