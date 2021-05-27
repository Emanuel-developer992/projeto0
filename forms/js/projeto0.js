
// ADICIONAR TEMA GENERICO
var outros = "Outros"
var valid;

document.getElementById("tema").onchange = function() {

    var tema = $("#tema").val();

    if (tema == outros) {
        $("#outros_div").removeClass("nav-close");
        valid++;
    }

    if (valid > 0 || tema != outros) {
        $("#outros_div").addClass("nav-close");
    }
    

};

//TABELA DE REGISTRO
var clickRes = 0;

function register() {

    clickRes++;

    wdkAddChild('tb_addR');

    var em_and = "Em Andamento";
    $("#tb_status___" + clickRes).val(em_and);

    $(".excluir").bind("click", Excluir);


};

//EXCLUIR LINHA
function Excluir(){

    var par = $(this).parent().parent(); //tr

    par.remove();
};

//ALIMENAÇÃO DO HISTÓRICO
var clickSave = 0;

function historico() {

    clickSave++;

    wdkAddChild('tb_hist');

    var table = $('#tb_addR tr');
    var date = new Date();

    var dia = date.getDate();           // 1-31
    var mes = date.getMonth();          // 0-11 (zero=janeiro)
    var ano = date.getFullYear();       // 4 dígitos

    var n = clickSave;
    var input_desc = $("#desc_action").val();
    var input_resp = $("#resp").val();
    var hoje = dia + "/" + "0" + (mes + 1) + "/" + ano;
    var input_closure = $("#date_closure").val();
        
    var column_1 = document.getElementById("tb_nAction___"+ clickSave);
    var column_2 = document.getElementById("tb_desc___"+ clickSave);
    var column_3 = document.getElementById("tb_resp___"+ clickSave);
    var column_4 = document.getElementById("tb_date___"+ clickSave);
    var column_5 = document.getElementById("tb_date_enc___"+ clickSave);

    column_1.value = n;
    column_2.value = input_desc;
    column_3.value = input_resp;
    column_4.value = hoje;
    column_5.value = input_closure;

    $(".excluir").bind("click", Excluir);



}

//INSERIR DATA DE ENCERRAMENTO A SOLICITAÇÃO
function tabela() {

    
    var tableInput = $('#tb_hist tr input');

    var nArray = tableInput.length;

    var n = (nArray - 5) / 5

    for (var i = 1; i <= n; i++) {

        var number = (i / n) * (nArray - 5);

        var valueTable = tableInput[number +4].value; //data de encerramento

        var diaSE = valueTable.substring(8, 12);
        var mesSE = valueTable.substring(5, 7);
        var anoSE = valueTable.substring(0, 4);

        var date_convert = diaSE + "/" + mesSE + "/" + anoSE;

        $("#tb_closure___" + i).val(date_convert);

    }


};


// APLICAÇÃO DE STATUS - A PARTIR DO ENCERRAMENTO, PRAZO E O DIA ATUAL


function status_PE() {

    for (var i = 1; i <= clickSave; i++) {

        //hoje
        var date = new Date();

        var diaH = date.getDate();           // 1-31
        var mesH = date.getMonth() + 1;      // 0-11 (zero=janeiro)
        var anoH = date.getFullYear();       // 4 dígitos

        var diaHS = diaH.toString();
        var mesHS = mesH.toString();
        var anoHS = anoH.toString();

        var var_hoje = anoHS + "0" + mesHS + diaHS;


        //Prazo e Encerramento
        var prazo = $("#tb_prazo___" + i).val();
        var encerramento = $("#tb_closure___" + i).val();
        //  99/99/9999

        //Prazo
        var diaP = prazo.substring(8, 12);
        var mesP = prazo.substring(5, 7);
        var anoP = prazo.substring(0, 4);

        var var_prazo = anoP + mesP + diaP;

        //Encerramento
        var diaE = encerramento.substring(0, 2);
        var mesE = encerramento.substring(3, 5);
        var anoE = encerramento.substring(6, 12);

        var var_encerramento = anoE + mesE + diaE;
        

        if (var_encerramento == "") {

            //Aberto - Quando hoje for abaixo do prazo
            if (var_prazo < var_hoje) {
            
                var aberto = "Aberto";
                $("#tb_status___" + i).val(aberto);
                $("#tb_status___" + i).removeClass();
                $("#tb_status___" + i).addClass('form-control status-aberto');
            }

            //Em Andamento - Não foi encerrado e hoje não ultrapassa o prazo
            if (var_prazo > var_hoje) {

                var andamento = "Em Andamento";
                $("#tb_status___" + i).val(andamento);
                $("#tb_status___" + i).removeClass();
                $("#tb_status___" + i).addClass('form-control status-andam');

            }

        } else {

            //Encerrado - Quando Encerrar e estiver no prazo
            if (var_encerramento < var_prazo) {

                var encerrado = "Encerrado";
                $("#tb_status___" + i).val(encerrado);
                $("#tb_status___" + i).removeClass();
                $("#tb_status___" + i).addClass('form-control status-enc');

            }

            //Encerrado fora - Quando for encerrado fora do prazo
            if (var_encerramento > var_prazo) {

                var encerrado_f = "Encerrado Fora do Prazo"
                $("#tb_status___" + i).val(encerrado_f);
                $("#tb_status___" + i).removeClass();
                $("#tb_status___" + i).addClass('form-control status-enc-for');


            }

        }

    }   

}


//CONTROLE DE SALVAMENTO E ATUALIZAÇÃO
function controle() {

    historico();

    $("#date_closure").val("");
    $("#desc_action").val("");

    tabela();
    status_PE();

}

function atualizar() {

    tabela();
    status_PE();

}

function eventTest() {

    console.log(getFormMode());
    console.log(getMobile());
    console.log("----------------");
    console.log(getWKNumState());
    console.log(getWKUser());
    console.log(getWKNumProces());
    console.log(getWKUserLocale());
    console.log(getWKCardId());

}