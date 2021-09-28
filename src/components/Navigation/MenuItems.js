import style from "./Navigation.module.scss"

export const MenuItems = [
    {
        title: 'Home',
        url: '/',
        cName: style.links,
    },
    {
        title: 'Auto',
        url: '/car',
        cName: style.links,
    },
    {
        title: 'Wetter',
        url: '/weather',
        cName: style.links,
    },
    {
        title: 'Sign Up',
        url: '#',
        cName: style.linksMobile,
    }
]