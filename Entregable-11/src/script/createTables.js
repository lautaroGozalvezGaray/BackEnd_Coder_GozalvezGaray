const { mysql, sqlite } = require("../container/option")


const mySqlKnex = require("knex")(mysql);


const sqLiteKnex = require("knex")(sqlite);


const creationTables = () => {
  mySqlKnex.schema.hasTable('products').then(function(exists) {
    if (!exists) {
      return mySqlKnex.schema.createTable('products', t =>{
        t.increments('id').primary();
        t.string('title').notNullable();
        t.float('price').notNullable();
        t.string('thumbnail').notNullable();
      })
      .then(()=>{
        console.log("mySql table has been created");
      })
      .catch((error)=>{
        console.log(error);
      })
      .finally(()=>{
        mySqlKnex.destroy();
      })
    }else{
      return console.log("mysql table already exist");
    }
  });


  sqLiteKnex.schema.hasTable('chat').then(function(exists) {
    if (!exists) {
      return sqLiteKnex.schema.createTable('chat', t => {
        t.increments('id');
        t.string('email').notNullable();
        t.float('message').notNullable();
        t.timestamp('date').defaultTo(sqLiteKnex.fn.now());
      })
      .then(()=>{
        console.log("SQLite table has been created");
      })
      .catch((error)=>{
        console.log(error);
      })
      .finally(()=>{
        sqLiteKnex.destroy();
      })
    }else{
      return console.log("sqlite table already exist");
    }
  });
}

module.exports = {creationTables}