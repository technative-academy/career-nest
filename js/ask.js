class Ask {
    maxLength = 160

    constructor() {
        this.askContainer = document.querySelector('.ask')
        this.cachedResponses = {}
        if (this.askContainer) {
            this.askInput = this.askContainer.querySelector('.ask__input')
            this.exampleButton = this.askContainer.querySelector(
                '.ask__button-example'
            )
            this.askButton = this.askContainer.querySelector('.ask__button-ask')
            this.resetButton =
                this.askContainer.querySelector('.ask__button-reset')
            this.charCounter =
                this.askContainer.querySelector('.ask__char-count')
            this.loading = this.askContainer.querySelector('.ask__loading')

            this.resultsContainer = document.querySelector('.results')
            this.resultsList =
                this.resultsContainer.querySelector('.results__list')
        }
    }

    init() {
        if (!this.askContainer) return
        this.askInput.addEventListener('input', (e) => this.checkInput(e))
        this.exampleButton.addEventListener('click', (e) => this.setExample(e))
        this.askButton.addEventListener('click', (e) => this.askClicked(e))
        this.resetButton.addEventListener('click', (e) => this.resetClicked(e))
        this.checkInput()
    }

    checkInput() {
        // check submission validity
        const charsRemaining = this.maxLength - this.askInput.value.length
        if (charsRemaining < 0) {
            this.askButton.disabled = true
            this.charCounter.classList.add('has-error')
        } else {
            this.askButton.disabled = false
            this.charCounter.classList.remove('has-error')
        }
        this.charCounter.textContent = `${charsRemaining} characters remaining`

        // check whether to display example button
        if (this.askInput.value.length === 0) {
            this.askButton.disabled = true
            this.exampleButton.classList.remove('is-hidden')
        } else {
            this.exampleButton.classList.add('is-hidden')
        }
    }

    setExample(event) {
        event.preventDefault()
        console.log('setting example')

        const exampleQuestions = [
            'I want a job in Hobbiton!',
            'How do I become a Jedi Knight in the Star Wars galaxy?',
            'What career opportunities are there in Winterfell?',
            'I want to work at Hogwarts School of Witchcraft and Wizardry',
            'How do I get a job with the Ministry of Magic?',
            'What positions are available on the Death Star?',
            'I want to be a dragon trainer in Westeros',
            'How do I become a Ranger of the North in Middle-earth?',
            'What jobs are there in King\'s Landing?',
            'I want to work for the Rebel Alliance',
            'How do I become a wizard in the Shire?',
            'What career paths are there in Narnia?',
            'I want to join the Night\'s Watch at Castle Black',
            'How do I get hired by Gringotts Wizarding Bank?',
            'What jobs are available in the Marvel universe?'
        ]

        const randomIndex = Math.floor(Math.random() * exampleQuestions.length)
        this.askInput.value = exampleQuestions[randomIndex]
        this.checkInput()
    }

    resetClicked(event) {
        event.preventDefault()
        this.askInput.value = ''
        this.checkInput()
    }

    async askClicked(event) {
        event.preventDefault()
        this.loading.classList.add('is-loading')

        const query = this.askInput.value // Get the value first

        if (this.cachedResponses[query]) {
            console.log('Using cached response')
            this.processResults(this.cachedResponses[query])
            this.loading.classList.remove('is-loading')
            return
        }

        const apiUrl = `https://ai-project.technative.dev.f90.co.uk/ai/careernest?query=${encodeURIComponent(
            query
        )}`

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const json = await response.json()
            console.log(json)
            const results = json.results
            console.log(results)

            this.processResults(results)
            this.loading.classList.remove('is-loading')
        } catch (error) {
            console.error('API call failed:', error.message)
            this.loading.classList.remove('is-loading')
        }
    }

    processResults(data) {
        this.resultsList.replaceChildren()
        if (data.length > 0) {
            this.resultsContainer.classList.add('is-shown')
        } else {
            this.resultsContainer.classList.remove('is-shown')
        }

        data.forEach((result) => {
            const resultsItem = document.createElement('div')
            resultsItem.classList.add('results__item')
            this.resultsList.appendChild(resultsItem)

            const resultsItemTitle = document.createElement('h3')
            resultsItemTitle.classList.add('results__item-title')
            resultsItemTitle.textContent = result.title
            resultsItem.appendChild(resultsItemTitle)

            const resultsItemDescription = document.createElement('p')
            resultsItemDescription.classList.add('results__item-description')
            resultsItemDescription.textContent = result.description
            resultsItem.appendChild(resultsItemDescription)
        })
    }
}

// Expose an instance of the 'Ask' class
export default new Ask()
