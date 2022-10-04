const URL = 'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json'
const AllCandidatos = document.querySelector('.AllCanditados')

document.addEventListener('keypress', (event) => {
  if(event.code === 'Space'){
    fetch(URL)
      .then((response) => response.json())
      .then(results => {
        restart(results.cand) 
        console.log(results) 
    })
  }
})

const restart = async (cands) => {
  const all = await cands
  all.map(AllCands => {
    const name = document.createElement("strong")
    name.innerHTML = `${AllCands.nm} ${AllCands.n}`
    console.log(AllCands)

    const porc = document.createElement("p")
    porc.innerHTML = `${AllCands.pvap}%`

    const nVots = document.createElement("p")
    nVots.innerHTML = `${AllCands.vap} votos`

    AllCandidatos.removeChild(name)
    AllCandidatos.removeChild(porc)
    AllCandidatos.removeChild(nVots)
    AllCandidatos.appendChild(name)
    AllCandidatos.appendChild(porc)
    AllCandidatos.appendChild(nVots)
  })
}

const initializonApllication = () => {
  fetch(URL)
    .then((response) => response.json())
    .then(results => {
      getAllCands(results.cand, results) 
      console.log(results) 
  })
}

const getAllCands = async (arrayCands, infos) => {
  const cands = await arrayCands
  const details = await infos

  const top = document.querySelector('.top')

  const dateAndHour = document.createElement('p')
  dateAndHour.innerHTML = `Atualizado as ${details.ht}`

  const ContainerporcUrnsAp = document.createElement('div')
  ContainerporcUrnsAp.style.width = '80vw'
  const porcUrnsAp = document.createElement('div')
  const getPorc = details.psa
  const convers = getPorc.replace(",", ".")
  porcUrnsAp.style.width = `${convers}%`
  porcUrnsAp.style.height = '30px'
  porcUrnsAp.style.backgroundColor = 'blue'
  porcUrnsAp.style.borderRadius = '7px'

  const urnsAp = document.querySelector('.urnsAp')
  urnsAp.innerHTML = `${getPorc}% das urnas apuradas` 

  ContainerporcUrnsAp.appendChild(porcUrnsAp)

  top.appendChild(ContainerporcUrnsAp)
  top.appendChild(dateAndHour)
  
  cands.map((AllCands) => {
    const container = document.createElement('div')
    container.classList.add('containerAll')

    const nameAndPhoto = document.createElement('div')
    nameAndPhoto.classList.add('nameAndPhoto')

    const name = document.createElement("strong")
    name.innerHTML = `${AllCands.nm} ${AllCands.n}`

    const photo = document.createElement('img')
    photo.style.width = '100px'
    if(AllCands.nm == 'JAIR BOLSONARO'){
      photo.src = 'https://pbs.twimg.com/profile_images/1559734581942800385/qtN3jE9H_400x400.jpg'
    }

    if(AllCands.nm == 'LULA'){
      photo.src = 'https://pbs.twimg.com/profile_images/1559375109609213954/H69EARpJ_400x400.jpg'
    }

    const porc = document.createElement("p")
    porc.innerHTML = `${AllCands.pvap}%`

    const nVots = document.createElement("p")
    let NumbersVots = AllCands.vap
    internationalNumberFormat = new Intl.NumberFormat('pt-BR')
    nVots.innerHTML = `${internationalNumberFormat.format(NumbersVots)} votos`

    const containerPorc = document.createElement("div")
    containerPorc.style.width = '70vw'

    const containerVots = document.createElement('div')
    containerVots.classList.add("containerVots")

    let AllPorc = AllCands.pvap

    const virgulaPorPonto = AllPorc.replace(',', '.')

    const widthForVots = document.createElement('div')
    widthForVots.style.width = `${virgulaPorPonto}%`
    widthForVots.style.height = '20px'
    widthForVots.style.backgroundColor = 'blue'
    widthForVots.style.borderRadius = '7px'

    nameAndPhoto.appendChild(photo)
    nameAndPhoto.appendChild(name)

    containerPorc.appendChild(widthForVots)
    
    containerVots.appendChild(porc)
    containerVots.appendChild(nVots)
    containerVots.appendChild(containerPorc)

    container.appendChild(nameAndPhoto)
    container.appendChild(containerVots)
    AllCandidatos.appendChild(container)
  }) 
}

initializonApllication()

const button = document.querySelector('.buttonAtualizar')

button.addEventListener('click', getAllCands())