function mostrarAviso() {
  alert("Bem-vindo ao EcoCiclo! Separe seus resíduos e ajude o meio ambiente.");
}

/* ===== MODO ESCURO ===== */
const botaoTema = document.createElement("button");
botaoTema.id = "botao-tema";
botaoTema.type = "button";
botaoTema.setAttribute("aria-label", "Alternar modo escuro");
document.body.appendChild(botaoTema);

function aplicarTema(escuro) {
  document.body.classList.toggle("modo-escuro", escuro);
  botaoTema.textContent = escuro ? "☀️" : "🌙";
  try {
    localStorage.setItem("tema", escuro ? "escuro" : "claro");
  } catch (e) {}
}

let temaSalvo = null;
try {
  temaSalvo = localStorage.getItem("tema");
} catch (e) {}
aplicarTema(temaSalvo === "escuro");

botaoTema.addEventListener("click", function () {
  aplicarTema(!document.body.classList.contains("modo-escuro"));
});

/* ===== VOLTAR AO TOPO ===== */
const botaoTopo = document.createElement("button");
botaoTopo.id = "botao-topo";
botaoTopo.type = "button";
botaoTopo.setAttribute("aria-label", "Voltar ao topo");
botaoTopo.textContent = "↑";
document.body.appendChild(botaoTopo);

window.addEventListener("scroll", function () {
  botaoTopo.classList.toggle("visivel", window.scrollY > 300);
});

botaoTopo.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===== VALIDAÇÃO DE FORMULÁRIOS ===== */
document.querySelectorAll("form").forEach(function (form) {
  form.setAttribute("novalidate", "");

  form.addEventListener("submit", function (evento) {
    let valido = true;
    form.querySelectorAll(".erro-campo").forEach(function (m) {
      m.remove();
    });

    form.querySelectorAll("input, textarea, select").forEach(function (campo) {
      if (["submit", "button", "hidden", "radio"].includes(campo.type)) return;

      const valor = campo.value.trim();
      let mensagem = "";

      if (campo.type === "checkbox") {
        if (campo.required && !campo.checked) mensagem = "Marque esta opção.";
      } else if (campo.required && valor === "") {
        mensagem = "Preencha este campo.";
      } else if (
        campo.type === "email" &&
        valor !== "" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
      ) {
        mensagem = "Digite um e-mail válido.";
      } else if (
        campo.minLength > 0 &&
        valor !== "" &&
        valor.length < campo.minLength
      ) {
        mensagem = "Digite pelo menos " + campo.minLength + " caracteres.";
      }

      if (mensagem) {
        valido = false;
        const aviso = document.createElement("span");
        aviso.className = "erro-campo";
        aviso.textContent = mensagem;
        aviso.style.cssText =
          "display:block;color:#c0392b;font-size:14px;margin-top:6px;";
        campo.insertAdjacentElement("afterend", aviso);
      }
    });

    if (!valido) evento.preventDefault();
  });
});
