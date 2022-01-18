const User = require('../models/user');
const { exception } = require('../exceptions/exception');

exports.index = (req, res, next) => {
    User.findAll()
        .then(r => res.send(r))
        .catch(e => {
            console.error(e.message, e.errors);
            return next(exception('Возникла ошибка получения пользователей.'));
        });
}

exports.create = (req, res, next) => {
    const age = Number(req.body.age);

    if(!req.body.name)  return next(exception('Укажите параметр name.', 400));
    if(!req.body.email) return next(exception('Укажите параметр email.', 400));
    if(!age) return next(exception('Укажите параметр age.', 400));

    if(!User.validateAge(age)) return next(exception('Укажите валидный возраст.', 400));

    User.create({ name: req.body.name, email: req.body.email, age: age })
        .then(r => res.send(r))
        .catch(e => {
            console.error(e.message, e.errors);
            return next(exception('Возникла ошибка при создании пользователя.'));
        });
}


exports.get = (req, res, next) => {
    const id = req.params.id;
    User.findByIdOrFail(id)
        .then(user => res.send(user))
        .catch(e => {
            console.error(e.message, e.errors);
            return next(e);
        });
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    User.findByIdOrFail(id)
        .then(async user => {
            if(req.body.name) user.name = req.body.name;
            if(req.body.email) user.email = req.body.email;
            if(req.body.age) user.age = req.body.age;

            user.save()
                .then(r => res.send(user))
                .catch(e => {
                    console.error(e.message, e.errors);
                    return next(exception('Возникла ошибка сохранения пользователя.'));
                });
        })
        .catch(e => {
            console.error(e.message, e.errors);
            return next(e);
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    User.findByIdOrFail(id)
        .then(user => {
            user.destroy()
                .then(r => res.end())
                .catch(e => {
                    console.error(e.message, e.errors);
                    return next(exception('Возникла ошибка удаления пользователя.'));
                });
        })
        .catch(e => {
            console.error(e.message, e.errors);
            return next(e);
        });
}