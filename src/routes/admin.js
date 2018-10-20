const router = require('koa-router')();
const koaParser = require('koa-bodyparser');
const crypto = require('crypto');
const { ap, an, sk } = require('../libs/secrets');
const knex = require('../connector');
const today = require('../libs/utils/today');
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

  ctx.session.logedIn = true;

  ctx.body = {
    error: ''
  };
});

router.get('/consumers/all', async (ctx, next) => {
  if (ctx.session.logedIn) {
    const res = [];
    const users = await knex('users').select('*');
    await Promise.all(
      users.map(async user => {
        const bonus = await Bonus.getBonus(user.uid);
        user.bonus = bonus.points;
        delete user.uid;
        delete user.session_key;
        res.push(user);
      })
    );
    ctx.body = {
      data: res
    };
  } else {
    ctx.redirect('/');
  }
});

router.post('/recycle', koaParser(), async (ctx, next) => {
  if (ctx.session.logedIn) {
    const {
      stdid = '',
      // kg为单位
      paper = 0,
      bottle = 0,
      cloth = 0
    } = ctx.request.body;
    const date = today();
    let id = '';

    try {
      const [user] = await knex('users')
        .where({ student_id: stdid })
        .select('*');
      if (!user) {
        throw new Error('register');
      } else {
        id = user.uid;
      }
    } catch (e) {
      ctx.body = {
        error: 'register first'
      };
      // 否则后面仍然会执行
      return;
    }

    await knex('recycle_items').insert({
      stdid,
      paper,
      bottle,
      date,
      cloth
    });
    try {
      await Bonus.addBonus(id, paper * 6 + bottle * 0.5);
    } catch {
      console.log('id', id);
    }

    ctx.body = {
      error: ''
    };
  } else {
    ctx.redirect('/');
  }
});

router.post('/garbage', async (ctx, next) => {
  await next();
});

module.exports = router;
