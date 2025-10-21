import Cart from './cart.js'

class Shop {
    constructor() {
        this.searchContainer = document.querySelector('.search')
        if (this.searchContainer) {
            this.searchInput = this.searchContainer.querySelector('.search__input')
            this.searchButton = this.searchContainer.querySelector('.search__submit')
            this.searchResultCount = this.searchContainer.querySelector('.search__result-count')
            this.loading = this.searchContainer.querySelector('.search__loading')

            this.productsContainer = document.querySelector('.products')
            this.productsList = this.productsContainer.querySelector('.products__list')
            this.sortSelect = this.searchContainer.querySelector('.search__sort')

            this.showMoreButton = this.productsContainer.querySelector('.products__show-more button')
        }
        this.cartCountEl = document.querySelector('.header__cart-count')
        this.allProducts = []
        this.displayedCount = 0
        this.itemsPerPage = 6
    }

    init() {
        if (!this.searchContainer) return
        this.searchInput.addEventListener('input', (e) => this.checkInput(e))
        this.searchButton.addEventListener('click', (e) => this.search(e))
        this.checkInput()
        this.search()
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', () => this.search())
        }
        if (this.showMoreButton) {
            this.showMoreButton.addEventListener('click', () => this.showMore())
        }
    }

    checkInput() {
        this.searchButton.disabled = this.searchInput.value.length === 0
    }

    async search(e) {
        if (e) e.preventDefault()

        this.loading.classList.add('is-loading')
        this.productsContainer.classList.remove('is-shown')
        this.searchResultCount.textContent = ''

        while (this.productsList.firstChild) {
            this.productsList.removeChild(this.productsList.lastChild)
        }

        const url = 'https://ai-project.technative.dev.f90.co.uk/products/careernest'
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            await setTimeout(async () => {
                const json = await response.json()
                console.log(json)
                const results = json.products
                console.log(results)
                this.processProducts(results)
                this.loading.classList.remove('is-loading')
            }, 1000)
        } catch (error) {
            console.error(error.message)
            this.loading.classList.remove('is-loading')
        }
    }

    processProducts(data) {
        const searchTerm = this.searchInput.value.toLowerCase()
        const filteredProducts = data.filter((product) => product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm))
        console.log(data)

        this.searchResultCount.textContent = `${filteredProducts.length} products found`

        if (filteredProducts.length > 0) {
            this.productsContainer.classList.add('is-shown')
        } else {
            this.productsContainer.classList.remove('is-shown')
        }
        const sortOrder = this.sortSelect ? this.sortSelect.value : 'asc'
        const sortedProducts = this.sortProductsByPrice(filteredProducts, sortOrder)

        // Store all products and reset display count
        this.allProducts = sortedProducts
        this.displayedCount = 0

        // Display first batch
        this.displayProducts()
    }

    displayProducts() {
        const productsToShow = this.allProducts.slice(this.displayedCount, this.displayedCount + this.itemsPerPage)

        productsToShow.forEach((product) => {
            const productsItem = document.createElement('div')
            productsItem.classList.add('products__item')
            this.productsList.appendChild(productsItem)

            const productsItemImage = document.createElement('img')
            productsItemImage.classList.add('products__item-image')
            productsItemImage.src = `https://ai-project.technative.dev.f90.co.uk${product.image}`
            console.log(productsItemImage.src)
            productsItem.appendChild(productsItemImage)

            const productsItemTitle = document.createElement('h3')
            productsItemTitle.classList.add('products__item-title')
            productsItemTitle.textContent = product.title
            productsItem.appendChild(productsItemTitle)

            const productsItemDescription = document.createElement('p')
            productsItemDescription.classList.add('products__item-description')
            productsItemDescription.textContent = product.description
            productsItem.appendChild(productsItemDescription)

            const productsItemStars = document.createElement('p')
            productsItemStars.classList.add('products__item-stars')
            productsItemStars.textContent = '⭐'.repeat(product.stars)
            productsItem.appendChild(productsItemStars)

            const productsItemPrice = document.createElement('p')
            productsItemPrice.classList.add('products__item-price')
            productsItemPrice.textContent = `£${product.price}`
            productsItem.appendChild(productsItemPrice)

            const addToCartButton = document.createElement('button')
            addToCartButton.classList.add('button', 'button--primary', 'products__item-cart')
            addToCartButton.textContent = 'Add to Cart'
            addToCartButton.addEventListener('click', () => Cart.addToCart(product, addToCartButton))
            productsItem.appendChild(addToCartButton)
        })

        this.displayedCount += productsToShow.length

        // Hide "Show more" button if all products are displayed
        const showMoreContainer = this.productsContainer.querySelector('.products__show-more')
        if (this.displayedCount >= this.allProducts.length) {
            showMoreContainer.style.display = 'none'
        } else {
            showMoreContainer.style.display = 'block'
        }
    }

    showMore() {
        this.displayProducts()
    }
    sortProductsByPrice(products, order = 'asc') {
        return products.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0
            const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0

            return order === 'asc' ? priceA - priceB : priceB - priceA
        })
    }
}

// Expose an instance of the 'Shop' class
export default new Shop()
