import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import anchor from '@alpinejs/anchor'
import resize from '@alpinejs/resize'

export default () => {
    document.addEventListener('alpine:init', () => {
        Alpine.data('mainState', function () {
            return {
                init() {
                    this.$refs.loading?.classList?.add('hidden')
                },
                loading: true,
                isSidebarOpen: false,
                toggleSidbarMenu() {
                    this.isSidebarOpen = !this.isSidebarOpen
                },
                handleWindowResize() {
                    if (window.innerWidth <= 1024) {
                        this.isSidebarOpen = false
                    } else {
                        this.isSidebarOpen = true
                    }
                },
                isSearchBoxOpen: false,
            }
        })

        Alpine.plugin(persist)
        Alpine.plugin(anchor)
        Alpine.plugin(resize)

        Alpine.store('darkMode', {
            on: Alpine.$persist(false),

            toggle() {
                this.on = !this.on
            },
        })
    })
}
