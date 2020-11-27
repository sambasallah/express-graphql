const db = require('../models');

let user = {
    getUsersData: async () => {
        let users = await db.User.findAll();
        if(users.length === 0) {
          throw new Error('no user exists with id  ' + id);
        }
        let data = [];
        users.map((value) => {
          data.push(value);
        });
    
        return data;
    },
    getUserData: async (id) => {
        let user = await db.User.findAll({
            where: {
              id: id 
            }
          });
          if(user.length === 0) {
            throw new Error('no message exists with id ' + id);
          }
          return {id: id, name: user[0].name, email: user[0].email, 
            role: user[0].role, password: user[0].password}
    },
    createUserData: async (input) => {
        const { name, email, role, password } = input;
        let user = await db.User.findAll({
          where: {
            email: email
          }
        });
        if(user.length === 1) {
          return new Error('Email Exists');
        }
        let resp = await db.User.create({
          name: name,
          email: email, 
          role: role,
          password: password,
          createAt: new Date(),
          updatedAt: new Date()
          });
          if(resp.id !== null) {
              return {id: resp.id, name: resp.name};
          }
          return new Error('Cannot create user');
        
    },
    updateUserData: async (id, input) => {
        let user = await db.User.update(input, {
            where: {
              id: id
            }
          });
           if(user[0] === 1) {
             return {id: id};
           }
           return new Error('could not update user with id ' + id);
    }
}

module.exports = {getUserData: user.getUserData, 
  getUsersData: user.getUsersData, createUserData: user.createUserData,
  updateUserData: user.updateUserData};