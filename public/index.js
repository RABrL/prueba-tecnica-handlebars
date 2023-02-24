const btnHome = document.querySelector('.home')

btnHome.addEventListener('clcik', async () => {
  await fetch('/clients')
    .then(res => res)
})
