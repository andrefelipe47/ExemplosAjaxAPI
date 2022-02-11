AtualizarTabela();
$('#cpfCliente').mask('000.000.000-00', { reverse: true });


function CriarObjetoCliente() {
    var cliente = {
        cpf: $("#cpfCliente").val().replaceAll("-", "").replaceAll(".", ""),
        nome: $("#nomeCliente").val()
    };
    return cliente;
}
//ESTE TRECHO DE CODIGO ABAIXO, E CHAMADO NO CLIQUE DO BOTAO

$("#demo-form").submit(function (e) {
    e.preventDefault();

    CadastrarCliente();
});

function CadastrarCliente() {
    if ($('#demo-form').parsley().validate()) {
        var objCliente = CriarObjetoCliente();
        var jsonCliente = JSON.stringify(objCliente);

        $.ajax({
            method: "POST",
            url: "https://es03.aiur.com.br/v1/InserirCliente",
            data: jsonCliente, // o que eu vou enviar para o servidor
            contentType: "application/json"
        }).done(function (resposta) {
            AtualizarTabela();
        }).fail(function (details, error) {
            Swal.fire(
                'Erro!',
                details.responseText,
                'error'
            );
        });
    }
}

 function AtualizarTabela(){
    $.ajax({
        method: "GET",
        url: "https://es03.aiur.com.br/v1/ListarClientes",
        dataType: "json"
    }).done(function (resposta) {
        var linhas = "";
       
        $(resposta).each(function (posicao, cliente) {
            var cpf = cliente.cpf;
            var nome = cliente.nome;
    
            var linha = "<tr><td>" + cpf + "</td><td>" + nome + "</td></tr>";
            linhas += linha;
        });
    
        $("#conteudoClientes").html(linhas);
        $('#tabelaClientes').DataTable();
    }).fail(function (details, error) {
    
    });
 }