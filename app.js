// Lojinha da Vila: monta a vitrine a partir de itens.js. Sem rastreador, sem cookie, sem recurso de outros sites.
import { ITENS, OPERADORA } from "./itens.js";

const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const seguro = (u) => typeof u === "string" && /^https:\/\//.test(u);
// Imagem e vídeo só do próprio site (caminho relativo, sem "//" nem "..").
const local = (u) => typeof u === "string" && /^[a-z0-9_\-/]+\.(webp|png|jpg|jpeg|mp4|webm)$/i.test(u) && !u.includes("..");

const itens = ITENS.filter((it) => it && seguro(it.link) && it.titulo && it.loja && local(it.imagem) && (!it.video || local(it.video)));
const vitrine = document.querySelector("#vitrine");
vitrine.innerHTML = itens.length
  ? `<h2>Indicações</h2><div class="grade">${itens.map((it) => `
    <article class="item">
      <a class="midia" href="${esc(it.link)}" target="_blank" rel="sponsored noopener noreferrer" aria-label="${esc(it.titulo)}, em ${esc(it.loja)} (abre o site da loja)">
        ${it.video ? `<video src="${esc(it.video)}" poster="${esc(it.imagem)}" preload="none" muted playsinline controls aria-label="${esc(it.alt || it.titulo)}"></video>`
          : `<img src="${esc(it.imagem)}" alt="${esc(it.alt || it.titulo)}" loading="lazy">`}</a>
      <p class="nome">${esc(it.titulo)}</p>
      <p class="aviso"><b>Publicidade.</b> Recebemos uma comissão se você comprar, sem custo a mais para você. A compra é feita no site de ${esc(it.loja)}.</p>
      <a class="botao" href="${esc(it.link)}" target="_blank" rel="sponsored noopener noreferrer">Ver em ${esc(it.loja)}</a>
    </article>`).join("")}</div>`
  : `<p class="vazio"><b>A lojinha ainda não abriu.</b> Ainda não há indicações nem links de lojas.</p>`;

document.querySelector("#operadora").textContent = OPERADORA
  ? `Operada por ${OPERADORA.nome}, CNPJ ${OPERADORA.cnpj}.`
  : "A empresa que opera a lojinha será informada aqui antes da abertura.";
