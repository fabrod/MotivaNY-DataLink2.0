'use strict';

module.exports = (app) => {
    if (!app.get('initialData')) return;

    const User = app.models.user;
    const Role = app.models.Role;
    const RoleMapping = app.models.RoleMapping;
    // create a user
    User.findOrCreate({where: {email: 'fabio@fabio.me'}},
        {
            name: 'Admin',
            surname: '-',
            username: 'admin',
            email: 'fabio@fabio.me',
            password: 'admin',
            emailVerified: true
        }
        , function (err, user) {
            if (err) console.log('ERROR', err);
            console.log('Created user:', user);

            //create the admin role
            Role.findOrCreate({where: {name: 'admin'}}, {
                name: 'admin'
            }, function (err, role) {
                if (err) console.log('ERROR', err);

                // make an admin user
                RoleMapping.findOrCreate({
                    where: {
                        principalId: user.id,
                        roleId: role.id
                    }
                }, {
                    principalType: RoleMapping.USER,
                    principalId: user.id,
                    roleId: role.id
                }, function (err, principal) {
                    if (err) console.log('ERROR', err);
                    console.log('Created principal:', principal);
                });
            });
        });

    User.findOrCreate({where: {email: 'editor@fabio.me'}},
        {
            name: 'Editor',
            surname: '-',
            username: 'editor',
            email: 'editor@fabio.me',
            password: 'editor',
            emailVerified: true
        }
        , function (err, user) {
            if (err) console.log('ERROR', err);
            console.log('Created user:', user);

            //create the editor role
            Role.findOrCreate({where: {name: 'editor'}}, {
                name: 'editor'
            }, function (err, role) {
                if (err) console.log('ERROR', err);

                // make an editor user
                RoleMapping.findOrCreate({
                    where: {
                        principalId: user.id,
                        roleId: role.id
                    }
                }, {
                    principalType: RoleMapping.USER,
                    principalId: user.id,
                    roleId: role.id
                }, function (err, principal) {
                    if (err) console.log('ERROR', err);
                    console.log('Created principal:', principal);
                });
            });
        });

    User.findOrCreate({where: {email: 'manager@fabio.me'}},
        {
            name: 'Manager',
            surname: '-',
            username: 'manager',
            email: 'manager@fabio.me',
            password: 'manager',
            emailVerified: true
        }
        , function (err, user) {
            if (err) console.log('ERROR', err);
            console.log('Created user:', user);

            //create the editor role
            Role.findOrCreate({where: {name: 'manager'}}, {
                name: 'manager'
            }, function (err, role) {
                if (err) console.log('ERROR', err);

                // make an editor user
                RoleMapping.findOrCreate({
                    where: {
                        principalId: user.id,
                        roleId: role.id
                    }
                }, {
                    principalType: RoleMapping.USER,
                    principalId: user.id,
                    roleId: role.id
                }, function (err, principal) {
                    if (err) console.log('ERROR', err);
                    console.log('Created principal:', principal);
                });
            });
        });

    User.findOrCreate({where: {email: 'worker@fabio.me'}},
        {
            name: 'Worker',
            surname: '-',
            username: 'worker',
            email: 'worker@fabio.me',
            password: 'worker',
            emailVerified: true
        }
        , function (err, user) {
            if (err) console.log('ERROR', err);
            console.log('Created user:', user);

            //create the editor role
            Role.findOrCreate({where: {name: 'worker'}}, {
                name: 'worker'
            }, function (err, role) {
                if (err) console.log('ERROR', err);

                // make an editor user
                RoleMapping.findOrCreate({
                    where: {
                        principalId: user.id,
                        roleId: role.id
                    }
                }, {
                    principalType: RoleMapping.USER,
                    principalId: user.id,
                    roleId: role.id
                }, function (err, principal) {
                    if (err) console.log('ERROR', err);
                    console.log('Created principal:', principal);
                });
            });
        });


    User.findOrCreate({where: {email: 'user@fabio.me'}},
        {
            name: 'User',
            surname: '-',
            username: 'user',
            email: 'user@fabio.me',
            password: 'user',
            emailVerified: true
        }
        , function (err, user) {
            if (err) console.log('ERROR', err);
            console.log('Created user:', user);
        });

};
