class Cart {
    constructor() {
        this.cartKey = 'cart'
        this.cartIcon = document.querySelector('.cart__icon')
        this.cartCountEl = document.querySelector('.cart__count')
        this.cartDropdown = document.querySelector('.cart__dropdown')
        this.cartItemsEl = document.querySelector('.cart__items')
        this.cartTotalEl = document.querySelector('.cart__total')
        this.clearBtn = document.querySelector('.cart__button--clear')
        this.checkoutBtn = document.querySelector('.cart__button--checkout')

        this.init()
    }

    init() {
        // Event listeners
        if (this.cartIcon) {
            this.cartIcon.addEventListener('click', (e) => {
                e.stopPropagation()
                this.toggleDropdown()
            })

            // Close dropdown on outside click
            document.addEventListener('click', (e) => {
                if (!this.cartIcon.parentElement.contains(e.target)) {
                    this.cartDropdown.classList.remove('cart__dropdown--show')
                }
            })
        }

        if (this.clearBtn) {
            this.clearBtn.addEventListener('click', () => {
                localStorage.removeItem(this.cartKey)
                this.updateCartCount()
                this.renderMiniCart()
            })
        }

        if (this.checkoutBtn) {
            this.checkoutBtn.addEventListener('click', () => {
                alert('Checkout feature coming soon!')
            })
        }

        this.updateCartCount()
    }

    toggleDropdown() {
        const isVisible = this.cartDropdown.classList.contains(
            'cart__dropdown--show'
        )
        document
            .querySelectorAll('.cart__dropdown')
            .forEach((el) => el.classList.remove('cart__dropdown--show'))

        if (!isVisible) {
            this.renderMiniCart()
            this.cartDropdown.classList.add('cart__dropdown--show')
        }
    }

    getCart() {
        return JSON.parse(localStorage.getItem(this.cartKey) || '[]')
    }

    saveCart(cart) {
        localStorage.setItem(this.cartKey, JSON.stringify(cart))
        this.updateCartCount()
    }

    updateCartCount() {
        const cart = this.getCart()
        const count = cart.reduce((sum, item) => sum + item.quantity, 0)
        if (this.cartCountEl) {
            this.cartCountEl.textContent = count
            this.cartCountEl.style.display = count > 0 ? 'inline-block' : 'none'
        }
    }

    addToCart(product) {
        const cart = this.getCart()
        const existing = cart.find((item) => item.id === product.id)

        if (existing) {
            existing.quantity += 1
        } else {
            cart.push({
                id: product.id,
                name: product.title,
                price: parseFloat(product.price),
                image: `https://ai-project.technative.dev.f90.co.uk${product.image}`,
                quantity: 1,
            })
        }
        button.textContent = 'Added!'
        setTimeout(() => (button.textContent = 'Add to Cart'), 1000) // Revert after 1s

        console.log('Cart updated:', cart)

        this.saveCart(cart)
        this.renderMiniCart()
    }

    removeFromCart(index) {
        const cart = this.getCart()
        cart.splice(index, 1)
        this.saveCart(cart)
        this.renderMiniCart()
    }

    renderMiniCart() {
        const cart = this.getCart()

        // Clear existing elements
        while (this.cartItemsEl.firstChild) {
            this.cartItemsEl.removeChild(this.cartItemsEl.lastChild)
        }

        if (cart.length === 0) {
            const emptyMsg = document.createElement('p')
            emptyMsg.textContent = 'Your cart is empty.'
            this.cartItemsEl.appendChild(emptyMsg)
            this.cartTotalEl.textContent = ''
            return
        }

        let total = 0

        cart.forEach((item, index) => {
            total += item.price * item.quantity

            const itemEl = document.createElement('div')
            itemEl.classList.add('cart__item')

            const img = document.createElement('img')
            img.classList.add('cart__item-image')
            img.src = item.image
            img.alt = item.name

            const info = document.createElement('div')
            info.classList.add('cart__item-info')
            info.innerHTML = `<strong>${item.name}</strong><br>£${item.price.toLocaleString()} × ${item.quantity}`

            const removeBtn = document.createElement('button')
            removeBtn.classList.add('cart__item-remove')
            removeBtn.textContent = '✕'
            removeBtn.addEventListener('click', () =>
                this.removeFromCart(index)
            )

            itemEl.appendChild(img)
            itemEl.appendChild(info)
            itemEl.appendChild(removeBtn)
            this.cartItemsEl.appendChild(itemEl)
        })

        this.cartTotalEl.textContent = `Total: £${total.toLocaleString()}`
    }
}

export default new Cart()
