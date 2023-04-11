let MediaManagerComponents = () => import('./Components/MediaManagerComponent');
let FileComponents = () => import('./Components/FileComponent');


export const routes = [
    {
        path:'/dashboard/media',
        name:'media-manager',
        component: MediaManagerComponents
    },
    {
        path:'/dashboard/files',
        name:'files',
        component: FileComponents
    },
];
