function acao() {
    let modal = document.querySelector(".modal")
    modal.style.display = 'block';
}
function fechar() {
    let modal = document.querySelector(".modal")
    modal.style.display = 'none';
}

function visualizar(pagina) {
    document.body.setAttribute('page',pagina)
    if (pagina == 'cadastro') {
        document.getElementById('nome').focus();
    }
}
