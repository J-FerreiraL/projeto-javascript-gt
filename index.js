function abrirModal() {
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
  }
  
  function fecharModal() {
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
  }
  
  function buscarTarefas() {
    fetch("http://localhost:3000/tarefas")
      .then((res) => res.json())
      .then((res) => {
        inserirTarefas(res);
      });
  }
  function inserirTarefas(listaDeTarefas) {
    if (listaDeTarefas.length > 0) {
      lista.innerHTML = "";
      listaDeTarefas.forEach((tarefa) => {
        let li = document.createElement('li');
        li.innerHTML = `
          <h5>${tarefa.titulo}</h5>
          <p>${tarefa.descricao}</p>
          <div class="actions"><box-icon name='trash' size='sm'></box-icon></div>`;
        li.querySelector('box-icon').onclick = function() {
          deletarTarefa(tarefa.id);
        };
        lista.appendChild(li);
      });
    }
  }
  
  buscarTarefas();
  
  function novaTarefa() {
    event.preventDefault();
    let tarefa = {
      titulo: titulo.value,
      descricao: descricao.value,
    };
    fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    fecharModal();
    buscarTarefas();
    let form = document.querySelector("#criarTarefa form");
    form.reset();
  }
  
  function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        buscarTarefas();
      });
  }
  function pesquisarTarefas() {
    console.log("oiii");
    let lis = document.querySelectorAll("ul li");
    console.log(lis);
    console.log(busca.value.length);
  
    if (busca.value.length > 0) {
      lis.forEach((li) => {
        if (!li.children[0].innerText.toLowerCase().includes(busca.value)) {
          li.classList.add("oculto");
        } else {
          li.classList.remove("oculto");
        }
      });
    } else {
      lis.forEach((li) => {
        li.classList.remove("oculto");
      });
    }
  }