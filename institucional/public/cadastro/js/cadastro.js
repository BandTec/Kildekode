class Validacao {
    constructor() {
      this.telefone;
      this.cpf;
    }
    validarFone(telefone) {
      //retira todos os caracteres menos os numeros
      this.telefone = telefone.replace(/\D/g, "");
      //verifica se tem a quantidade de numeros correta
      if (!(this.telefone.length >= 10 && this.telefone.length <= 11)) {
        return false;
      }
      //Verifica se o DDD é válido
      if (
        parseInt(this.telefone.substring(0, 1)) == 0 ||
        parseInt(this.telefone.substring(1, 2)) == 0
      ) {
        return false;
      }
      //Se tiver 11 caracteres, verificar se começa com 9
      if (
        this.telefone.length == 11 &&
        parseInt(this.telefone.substring(2, 3)) != 9
      ) {
        return false;
      }
      //Se tiver 11 caracteres, verifica se o 4° digito está correto
      if (
        this.telefone.length == 11 &&
        [6, 7, 8, 9].indexOf(parseInt(this.telefone.substring(3, 4))) == -1
      ) {
        return false;
      }
      //Se tiver 10 caracteres, verifica se o 3° digito está correto
      if (
        this.telefone.length == 10 &&
        [2, 3, 4, 5].indexOf(parseInt(this.telefone.substring(2, 3))) == -1
      ) {
        return false;
      }
  
      return true;
    }
  
    validarCPF(strCPF) {
      this.cpf = strCPF.replace(/\D/g, ""); //Remove tudo o que não é dígito
      let soma = 0;
      let resto;
      if (this.cpf == "00000000000") {
        return false;
      }
  
      for (i = 1; i <= 9; i++) {
        soma += parseInt(this.cpf.substring(i - 1, i)) * (11 - i);
      }
      resto = (soma * 10) % 11;
  
      if (resto == 10 || resto == 11) {
        resto = 0;
      }
      if (resto != parseInt(this.cpf.substring(9, 10))) {
        return false;
      }
  
      soma = 0;
      for (i = 1; i <= 10; i++) {
        soma += parseInt(this.cpf.substring(i - 1, i)) * (12 - i);
      }
      resto = (soma * 10) % 11;
  
      if (resto == 10 || resto == 11) {
        resto = 0;
      }
      if (resto != parseInt(this.cpf.substring(10, 11))) {
        return false;
      }
      return true;
    }
  }
  
  const selectorAll = document.querySelectorAll.bind(document);
  const id = document.getElementById.bind(document);
  function mascara(o, f) {
    obj = o;
    fun = f;
    setTimeout("execmascara()", 1);
  }
  function execmascara() {
    obj.value = fun(obj.value);
  }
  function mtel(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1)$2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }
  function validaCPF(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    return v;
  }
  function validaCep(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{5})(\d{3})$/g, "$1-$2");
    return v;
  }
  
  window.onload = () => {
    let cpf = selectorAll(".cpf");
    for (let i = 0; i < cpf.length; i++) {
      cpf[i].onkeyup = function() {
        mascara(this, validaCPF);
      };
    }
    let numero = selectorAll(".telefone");
    for (let i = 0; i < numero.length; i++) {
      numero[i].onkeyup = function() {
        mascara(this, mtel);
      };
    }
    let cep = id("cep");
    cep.onkeyup = function() {
      mascara(this, validaCep);
    };
  };
  
  function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    id("rua").value = "";
    id("bairro").value = "";
    id("cidade").value = "";
    id("uf").value = "";
  }
  function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
      //Atualiza os campos com os valores.
      id("rua").value = conteudo.logradouro;
      id("bairro").value = conteudo.bairro;
      id("cidade").value = conteudo.localidade;
      id("uf").value = conteudo.uf;
    } else {
      //end if.
      //CEP não Encontrado.
      limpa_formulário_cep();
      respostaCep.style.display = "block";
      respostaCep.innerHTML = "CEP não encontrado.";
    }
  }
  function pesquisacep(valor) {
    //Preenche os campos com "..." enquanto consulta webservice.
    /**
    document.getElementById('rua').value="...";
    document.getElementById('bairro').value="...";
    document.getElementById('cidade').value="...";
    document.getElementById('uf').value="...";
    */
    //Nova variável "cep" somente com dígitos.
    let cep = valor.replace(/\D/g, "");
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Cria um elemento javascript.
        let script = document.createElement("script");
        //Sincroniza com o callback.
        script.src =
          "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";
        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
        respostaCep.style.display = "none";
        respostaCep.innerHTML = "";
      } else {
        //end if.
        //cep é inválido.
        limpa_formulário_cep();
        respostaCep.style.display = "block";
        respostaCep.innerHTML = "Formato de CEP inválido.";
      }
    } else {
      //end if.
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  }
  
  cadastro.cep.onblur = function() {
    var cep = id("cep");
    pesquisacep(cep.value);
  };
  
  cadastro.onsubmit = function() {
    let validacao = new Validacao();
  
    let respostaTel = id("respostaTel");
    let numero = selectorAll(".telefone");
  
    for (let i = 0; i < numero.length; i++) {
      if (validacao.validarFone(numero[i].value) == false) {
        respostaTel.style.display = "block";
        respostaTel.innerHTML = "O número digitado não existe";
        return false;
      } else {
        respostaTel.innerHTML = "";
      }
    }
    let respostaCPF = id("respostaCPF");
    let cpf = selectorAll(".cpf");
    for (let i = 0; i < cpf.length; i++) {
      if (validacao.validarCPF(cpf[i].value) == false) {
        respostaCPF.style.display = "block";
        respostaCPF.innerHTML = "O CPF digitado não existe";
        return false;
      } else {
        respostaCPF.innerHTML = "";
      }
    }
  };
  