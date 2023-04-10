let MediaManagerComponents = () => import('./Components/MediaManagerComponent');


export const routes = [
    {
        path:'/dashboard/media',
        name:'media-manager',
        component: MediaManagerComponents
    }
];
