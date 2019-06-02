const router = require("express").Router();
const dayjs = require("dayjs");
const authRouter = require("./authRouter");
const pg = require("pg");
const config = require("../config/config");
const pool = new pg.Pool(config.postgres.poolSettings);
const middleware = require("../middleware");

router.get("/", middleware.islogged, async (req, res) => {
  const client = await pool.connect();
  let limite_linhas = 10;
  let tipo1 = `ram`;
  let tipo2 = `disco`;
  let tipo3 = `processos`;
  let tipo4 = `cpumaquina`;

  try {
    let resultados1 = await client.query(
      `select * from get_values('${tipo1}',${limite_linhas});`
    );
    let resultados2 = await client.query(
      `select * from get_values('${tipo2}',${limite_linhas});`
    );
    let resultados3 = await client.query(
      `select * from get_values('${tipo3}',${limite_linhas});`
    );
    let resultados4 = await client.query(
      `select * from get_values('${tipo4}',${limite_linhas});`
    );
    resultados1 = resultados1.rows;
    let label1 = [];
    let data1 = [];
    let titulo1 = "Ram";
    resultados1.map((item, index) => {
      label1.push(
        dayjs(item.data_hora)
          .format("HH:mm")
          .toString()
      );
      data1.push(item.value);
    });
    resultados2 = resultados2.rows;
    let label2 = [];
    let data2 = [];
    let titulo2 = `Disco`;
    resultados2.map((item, index) => {
      label2.push(
        dayjs(item.data_hora)
          .format("HH:mm")
          .toString()
      );
      data2.push(item.value);
    });
    resultados3 = resultados3.rows;
    let label3 = [];
    let data3 = [];
    let titulo3 = `Processos`;
    resultados3.map((item, index) => {
      label3.push(
        dayjs(item.data_hora)
          .format("HH:mm")
          .toString()
      );
      data3.push(item.value);
    });
    resultados4 = resultados4.rows;
    let label4 = [];
    let data4 = [];
    let titulo4 = `Disco`;
    resultados4.map((item, index) => {
      label4.push(
        dayjs(item.data_hora)
          .format("HH:mm")
          .toString()
      );
      data4.push(item.value);
    });
    console.log(resultados1);
    console.log(resultados2);
    console.log(resultados3);
    console.log(resultados4);
    res.render("index", {
      title: `${titulo1}`,
      label: label1,
      data: data1,
      title2: `${titulo2}`,
      label2: label2,
      data2: data2,
      title3: `${titulo3}`,
      label3: label3,
      data3: data3,
      title4: `${titulo4}`,
      label4: label4,
      data4: data4
    });
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
});

router.get("/dashboard/:type", async (req, res) => {});

router.use("/auth", authRouter);

router.get("/logout", (req, res) => {
  res.redirect("/auth/logout");
});
router.get("/login", (req, res) => {
  res.redirect("/auth/login");
});
router.get("/register", (req, res) => {
  res.redirect("/auth/register");
});

router.get("/dados", (req, res) => {
  res.redirect("/auth/dados");
});

router.get("/dados", async (req, res, next) => {
  const client = await pool.connect();

  let limite_linhas = 10;
  let tipo = "ram";
  try {
    let resultado = await client.query(
      `select * from get_values('${tipo}',${limite_linhas});`
    );
    res.json(resultados);
    console.log(resultados);
  } catch (error) {
  } finally {
    client.release();
  }
});
module.exports = router;
