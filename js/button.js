const button = {
    init() {
        document.addEventListener('DOMContentLoaded', function () {
            const tabButtons = document.querySelectorAll('.about-nav__button')
            const tabSections = document.querySelectorAll('.about-section')

            tabButtons.forEach((button) => {
                button.addEventListener('click', function () {
                    const targetTab = this.getAttribute('data-tab')

                    tabButtons.forEach((btn) =>
                        btn.classList.remove('about-nav__button--active')
                    )
                    tabSections.forEach((section) =>
                        section.classList.remove('about-section--active')
                    )

                    this.classList.add('about-nav__button--active')
                    document
                        .getElementById(targetTab)
                        .classList.add('about-section--active')
                })
            })
        })
    },
}

export default button
