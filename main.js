document.addEventListener("DOMContentLoaded", () => {
    getFilmsFromKinopoisk()
})

const createPreviews = previewsData => {
    const container = document.querySelector(".previews")

    previewsData.forEach(previewData => {
        const name = previewData.name !== null ? previewData.name : previewData.alternativeName
        const posterPreviewURL = previewData.poster.previewUrl
        const preview = `<div class="preview">
                <img src="${posterPreviewURL}" alt="${name}">
                <h5>${name}</h5>
            </div>`
        container.insertAdjacentHTML("beforeEnd", preview)
    })
}

const showError = textError => {
    const dialog = document.querySelector("dialog")
    dialog.textContent = textError
    dialog.showModal()
    setTimeout(() => {
        dialog.close()
    }, 2500)
}

const getFilmsFromKinopoisk = async () => {
    const api = "https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10"
    const token = "EB3E65G-Q4JM42B-H861NNH-AP97J88"

    try {
        const response = await fetch(api, {headers: {"X-API-KEY": token}})
        if (response.ok) {
            const data = await response.json()
            createPreviews(data.docs)
        } else showError(`Ошибка запроса: ${response.status}`)
    } catch (error) {
        showError(`Ошибка на сервере. Каталог загружен не полностью.`)
    }
}
