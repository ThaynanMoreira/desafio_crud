'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [
    {
      name: 'John Travolta',
      email: 'test@email.com',
      password_hash: '$2a$08$zAb3/EFcit.z0lvQ2sid0OKQw1/R3IC9zPGuJnlbUAI6stZQkTaBy',
      created_at: '2020-05-28 16:45:57',
      updated_at: '2020-05-28 16:45:57',
    },
  ], {}),




  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
