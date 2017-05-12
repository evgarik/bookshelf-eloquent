'use strict';

const Bookshelf = require('../bookshelf.js');

require('./role');
require('./group');
require('./friend');
require('./post');
require('./comment');
require('./enrolment');
require('./rating');

module.exports = Bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: ['createdAt', 'updatedAt'],
  hidden: [
    'password',
    'jwtPasswordResetCounter',
    'deletedAt',
    'deletedUsername',
    'deletedEmail',
  ],
  softDelete: true,

  // Owned groups. The groups that this user created.
  groups: function() {
    return this.hasMany('Group', 'ownerId');
  },

  posts: function() {
    return this.hasMany('Post', 'createdById');
  },

  comments: function() {
    return this.hasMany('Comment', 'createdById');
  },

  enrolments: function() {
    return this.hasMany('Enrolment', 'userId');
  },

  ratings: function() {
    return this.hasMany('Rating', 'userId');
  },

  roles: function() {
    return this.belongsToMany('Role', 'user_has_roles', 'userId', 'roleId');
  },

  friends1: function() {
    return this.hasMany('Friend', 'user1Id');
  },

  friends2: function() {
    return this.hasMany('Friend', 'user2Id');
  },
});
