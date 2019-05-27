const sql = require("mssql");
const config = {
  user: "whoami",
  password: "P@55w.rd",
  server: "theohashi.database.windows.net",
  database: "kildekodedb",
  options: {
    encrypt: true
  }
};

module.exports = {
  query: function(queryString) {
    if (isNull(queryString)) {
      return null;
    } else {
      sql.close();
      return new Promise((resolve, reject) => {
        console.log("Conectando-se ao banco...");
        sql
          .connect(config)
          .then(pool => {
            console.log("Conectado ao banco!");
            return pool.request().query(queryString);
          })
          .then(results => {
              console.log("Query executada!");
              console.log("Fechando conexão...");
              sql.close();
              resolve(results);
          }).catch(error =>{
                console.log("Erro ao tentar executar query: ", error);
                console.log("Fechando conexão...");
                sql.close();
                reject(error);
          });
      });
    }
  }
};
