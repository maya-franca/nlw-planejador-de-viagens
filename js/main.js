const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd')
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  }
}

const atividade = {
  nome: "Almoço",
  data: new Date("2024-08-08 12:00"),
  finalizada: false
}

let atividades = [
  atividade,
  {
    nome: 'Academia em grupo',
    data: new Date("2024-08-08 15:00"),
    finalizada: false
  },
  {
    nome: 'Gamming session',
    data: new Date("2024-08-08 20:00"),
    finalizada: false
  }
]

const criarItemAtividade = (atividade) => {
  let input = `<input 
  onchange="concluirAtividade(event)" 
  type="checkbox" 
  value=${atividade.data}`

  if (atividade.finalizada) {
    input += 'checked'
  }

  input += '>'

  const formatar = formatador(atividade.data);

  return `<div class="card-bg">
  ${input}

  <div class="wrapper">
    <div class="conteudo">
      <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z"
          stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492"
          stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span>${atividade.nome}</span>
    </div>
      <time class="short cinza">
        ${formatar.dia.semana.curto}.&nbsp;${formatar.dia.numerico} </br>
        ${formatar.hora}
      </time>
      <time class="full cinza">${formatar.dia.semana.longo}, dia ${formatar.dia.numerico} de ${formatar.mes} às
        ${formatar.hora}h</time>
  </div>
  <div>
<span class="remover" onclick="removerAtividade(${atividades.indexOf(atividade)})">
  <svg width="10" height="10" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.49925 42C2.80713 41.9999 2.13058 41.7945 1.55515 41.4099C0.979715 41.0253 0.531227 40.4788 0.266382 39.8393C0.00153693 39.1999 -0.0677745 38.4962 0.067212 37.8174C0.202198 37.1386 0.535423 36.515 1.02476 36.0255L36.0248 1.02552C36.6849 0.387969 37.569 0.0351876 38.4867 0.0431621C39.4043 0.0511366 40.2822 0.419229 40.9311 1.06816C41.58 1.71709 41.9481 2.59493 41.9561 3.51262C41.9641 4.43031 41.6113 5.31441 40.9738 5.97452L5.97375 40.9745C5.64917 41.3 5.26347 41.5582 4.83882 41.7342C4.41417 41.9101 3.95893 42.0005 3.49925 42Z" />
    <path d="M38.4993 42C38.0396 42.0005 37.5843 41.9101 37.1597 41.7342C36.735 41.5582 36.3493 41.3 36.0248 40.9745L1.02476 5.97452C0.387206 5.31441 0.0344247 4.43031 0.0423992 3.51262C0.0503736 2.59493 0.418466 1.71709 1.06739 1.06816C1.71632 0.419229 2.59417 0.0511366 3.51185 0.0431621C4.42954 0.0351876 5.31365 0.387969 5.97376 1.02552L40.9738 36.0255C41.4631 36.515 41.7963 37.1386 41.9313 37.8174C42.0663 38.4962 41.997 39.1999 41.7321 39.8393C41.4673 40.4788 41.0188 41.0253 40.4434 41.4099C39.8679 41.7945 39.1914 41.9999 38.4993 42Z" />
  </svg>
</span>

  </div>
</div>
  `
}

const atualizarListaDeAtividades = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  if (atividades.length === 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
  }

  atividades.sort((a, b) => new Date(a.data) - new Date(b.data))

  for (let atividade of atividades) {
    section.innerHTML += criarItemAtividade(atividade)
  }
}

atualizarListaDeAtividades()

const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)
  const nome = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('dia')
  const hora = dadosDoFormulario.get('hora')
  const data = `${dia} ${hora}`

  const novaAtividade = {
    nome,
    data,
    finalizada: false
  }

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  if (atividadeExiste) {
    return alert('Dia/Hora não disponível')
  }

  atividades = [novaAtividade, ...atividades]
  atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ]

  let diasSelecao = ''

  for (let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `
  ${formatar.dia.numerico} de ${formatar.mes}`
    diasSelecao += `
  <option value="${dia}">${diaFormatado}</option>
  `
  }

  document.querySelector('select[name="dia"]').innerHTML = diasSelecao
}

criarDiasSelecao()

const criarHorasSelecao = () => {
  let horasDisponiveis = ''

  for (let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, '0')
    horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
    horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
  }

  document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}

criarHorasSelecao()

const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput
  })

  if (!atividade) {
    return
  }

  atividade.finalizada = !atividade.finalizada
}

const removerAtividade = (indice) => {
  atividades.splice(indice, 1);
  atualizarListaDeAtividades();
}
