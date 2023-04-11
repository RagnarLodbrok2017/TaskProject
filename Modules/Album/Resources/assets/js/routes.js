let AlbumComponent = () => import('./Components/AlbumComponent');
let AlbumComponentCards = () => import('./Components/AlbumComponentCards');


export const routes = [
    {
        path:'/dashboard/albums',
        name:'album',
        component: AlbumComponent
    },
    {
        path:'/dashboard/albums/cards',
        name:'album-cards',
        component: AlbumComponentCards
    },
];
