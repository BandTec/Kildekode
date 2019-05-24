// 'use strict';
// var config = require("./config").database;
// var isNull = require('./script').isNull;

// module.exports = {
// 	'query': function(queryString) {
//         if (isNull(queryString)) {
//             return null;
//         } else {
            
            
//         	return new Promise((resolve, reject) => {

//                 global.conn.request().query`queryString`
//                 .then(results => {
//                     console.log('Query succeded!');
//                     console.log('Closing connection...');
//                     resolve(results);
//                 }).catch(error => {
//                     console.log('Error executing query :(', error);
//                     console.log('Closing connection...');
//                     reject(error);
//                 });
//             });
//         }
//     }
// };
