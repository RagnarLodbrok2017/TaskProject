let AlbumComponent = () => import('./Components/AlbumComponent');


export const routes = [
    {
        path:'/dashboard/albums',
        name:'album',
        component: AlbumComponent
    }
];
