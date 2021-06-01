
//EXECUÇÃO DE CÓDIGO COM O DOCUMENTO
 window.onload = function() {

    navegation();
    getGroup();
    temaGenerico();
    getUser();
    followClass();


 }

// ADICIONAR TEMA GENERICO
var valid;

function temaGenerico() {

    var tema = $("#tema").val();

    if (tema == "Outros") {
        $("#outros_div").removeClass("nav-close");
        valid++;
    }

    if (valid > 0 || tema != "Outros") {
        $("#outros_div").addClass("nav-close");
    }
        

};

function temaGenerico2() {

    var textSelect = $("#tema").val();

    if (textSelect == "Outros") {

        $("#outros_div").removeClass("nav-close");
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

        if (valueTable == "") {

            var date_convert = "";

        }

        else {

            var diaSE = valueTable.substring(8, 12);
            var mesSE = valueTable.substring(5, 7);
            var anoSE = valueTable.substring(0, 4);

            var date_convert = diaSE + "/" + mesSE + "/" + anoSE;
        
        }

        $("#tb_closure___" + i).val(date_convert);

        
    }


};


// APLICAÇÃO DE STATUS - A PARTIR DO ENCERRAMENTO, PRAZO E O DIA ATUAL
function status_PE() {

    var tableRowCount = $('#tb_addR tr').length;
    var rowCount = tableRowCount - 2;

    for (var i = 1; i <= rowCount; i++) {

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


//NAVEGAÇÃO ENTRE FASES DO FLUXO DE PROCESSOS
function navegation() {

    var get_form = getFormMode();
    var get_mobile = getMobile();
    var get_atividade = getWKNumState();
    var get_usuario = getWKUser();
    var get_processo = getWKNumProces();
    var get_locale = getWKUserLocale();
    var get_cardid = getWKCardId();

    status_PE();

    var input_follow = document.getElementById("follow_up");

    //Atividade 1 (inicial)
    if (get_atividade == 0) {

        $("#panel3").addClass("nav-close");
        $("#panel4").addClass("nav-close");
        $("#panel5").addClass("nav-close");

        $('#follow_up').prop('readonly', true);

        sombraGroup();
        sombraTema();
        sombraOutro();

    }

    //Atividade 2 (Coordenador)
    if (get_atividade == 2) {

        var rowCount = 0;    

        var tableRowCount = $('#tb_addR tr').length;
        rowCount = tableRowCount - 2;

        

        for (var i = 1; i <= rowCount; i++) {

            $('#tb_descricao___' + i).prop('readonly', true);
            $('#tb_prazo___' + i).prop('readonly', true);

            button_ex[i].disabled = true;
            

        }

        $('#group_solic').attr("disabled", true); 
        $('#tema').attr("disabled", true); 

        $("#outros").prop('readonly', true);
        $('#follow_up').prop('readonly', true);
        $('#add_tb').prop('disabled', true);
        $("#panel5").addClass("nav-close");

        

        temaGenerico2();

       
    }

    //Atividade 3 (Follow-up)
    if (get_atividade == 3) {

        $('#group_solic').attr("disabled", true); 
        $('#tema').attr("disabled", true); 

        $('#desc_action').prop('readonly', true);
        $('#date_closure').prop('readonly', true);
        $('#add_tb').prop('disabled', true);

        $("#group_div").addClass('nav-close');
        $("#tema_div").addClass('nav-close');
        $("#outro_div").addClass('nav-close');
        
        $("#group_div_s").removeClass('nav-close');
        $("#tema_div_s").removeClass('nav-close');

        var valid_outros = $("#tema_s").val();
       

        if (valid_outros == "Outros") {

            $("#outros_div_s").removeClass('nav-close');
            
        }         

        var tableRowCount = $('#tb_addR tr').length;
        var rowCount = tableRowCount - 2;

        for (var i = 1; i <= rowCount; i++) {

            $('#tb_descricao___' + i).prop('readonly', true);
            $('#tb_prazo___' + i).prop('readonly', true);
            $('#tb_date_enc___' + i).prop('readonly', true);
            button_ex[i].disabled = true;

        }

    }

    



}; 

// GRUPO E USUÁRIO CORRESPONDENTES

function getGroup() {

    //Condição de Busca
    var user = getWKUser();

    //Filtro de Busca 
    var userConstraint = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", user, user, ConstraintType.MUST);
   
    var arrayConstraint = new Array(userConstraint);

    // Busca no Dataset + Condições de Filtro
    var array = DatasetFactory.getDataset("colleagueGroup", null, arrayConstraint, null);

    var valuesCount = array.values.length;

    if (valuesCount > 1) {

        $('#group_solic').append($('<option>', {

            value: "",
            text: "Selecione..."

        }));

        for (var i = 0; i < valuesCount; i++) {    

            $('#group_solic').append($('<option>', {

                value: array.values[i]["colleagueGroupPK.groupId"],
                text: array.values[i]["colleagueGroupPK.groupId"]

            }));

        }   
    }
    else {

        for (var i = 0; i < valuesCount; i++) {    

            $('#group_solic').append($('<option>', {

                value: array.values[i]["colleagueGroupPK.groupId"],
                text: array.values[i]["colleagueGroupPK.groupId"]

            }));
        }

        $('#group_solic').attr("disabled", true);

    }
};

function getUser() {
 
    //Condição de Busca
    var user = getWKUser();

    //Filtro de Busca 
    var userConstraint = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);

    var arrayConstraint = new Array(userConstraint);

    // Busca no Dataset + Condições de Filtro
    var array = DatasetFactory.getDataset("colleague", null, arrayConstraint, null);

    var responsavel = array.values[0].colleagueName

    $("#resp").val(responsavel);

    
    

};

//Follow-up classe

function followClass() {

    var valueLoad = $("#follow_up").val();

    if (valueLoad == "") {

        $("#follow_up").removeClass();
        $("#follow_up").addClass("form-control status-andam");

    }

    if (valueLoad == "Aprovado") {

        $("#follow_up").removeClass();
        $("#follow_up").addClass("form-control status-enc");
    }

    if (valueLoad == "Não Conforme") {

        $("#follow_up").removeClass();
        $("#follow_up").addClass("form-control status-enc-for");
    }

    document.getElementById("follow_up").onchange = function() {

        var valueFollow = $("#follow_up").val();

        if (valueFollow == "") {

            $("#follow_up").removeClass();
            $("#follow_up").addClass("form-control status-andam");

        }

        if (valueFollow == "Aprovado") {

            $("#follow_up").removeClass();
            $("#follow_up").addClass("form-control status-enc");
        }

        if (valueFollow == "Não Conforme") {

            $("#follow_up").removeClass();
            $("#follow_up").addClass("form-control status-enc-for");
        }

    };
    
}

function sombraGroup() {

    document.getElementById("group_solic").onchange = function() {

        var group = $("#group_solic").val();
        var tema = $("#tema").val();
        var outros = $("#outros").val();

        $("#group_s").val(group);
        $("#tema_s").val(tema);
        $("#outros_s").val(outros);

    }

}

function sombraTema() {

    document.getElementById("tema").onchange = function() {

        var group = $("#group_solic").val();
        var tema = $("#tema").val();
        var outros = $("#outros").val();

        $("#group_s").val(group);
        $("#tema_s").val(tema);
        $("#outros_s").val(outros);

        if (tema == "Outros") {
            $("#outros_div").removeClass("nav-close");
            valid++;
        }

        if (valid > 0 || tema != "Outros") {
            $("#outros_div").addClass("nav-close");
        }


    }

}

function sombraOutro() {

    document.getElementById("outros").onchange = function() {

        var group = $("#group_solic").val();
        var tema = $("#tema").val();
        var outros = $("#outros").val();

        $("#group_s").val(group);
        $("#tema_s").val(tema);
        $("#outros_s").val(outros);


    }

}

