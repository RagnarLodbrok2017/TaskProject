<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <!-- Gallery -->
                    <div class="row">
                        <div class="col-lg-4 col-md-12 mb-4 mb-lg-0" v-for="image in images">
                            <img
                                :src="image.url"
                                class="w-100 shadow-1-strong rounded mb-4"
                                alt="Boat on Calm Water"
                            />
                            <h6> Album: {{image.album_name }}</h6>
                            <p> Name: {{image.name }}</p>
                        </div>
                    </div>
                    <!-- Gallery -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>


import swalHelper from "../../../../../../resources/js/Helpers/SwalHelper";
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
    name: "FileComponent",

    created() {
        this.fetchImages();
    },
    components:{
        vueDropzone: vue2Dropzone
    },
    mounted() {
        // const myDropzone = this.$refs.myVueDropzone.dropzone;
        // myDropzone.on('queuecomplete', this.uploadImage);
    },
    data(){
        return {
            images:[],
            base_url:base_url,
            addForm:{},
            editForm:{},
            editFormFile:{},
            form:{},
            searchTerm:'',
            addFormErrors:{},
            editFormErrors:{},
            dropzoneOptions: {
                url: base_url + 'api/files',
                thumbnailWidth: 150,
                acceptedFiles: 'image/*',
                maxFilesize: 2,
                autoProcessQueue: false,
                enctype: "multipart/form-data",
                parallelUploads: 3,
                clickable: true,
                dictDefaultMessage: 'Drag and drop files',
                headers: {
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
                },
                params: {
                    album_id: null,
                }
            },
            dropzoneOptionsUpdate: {
                url: base_url + 'api/files',
                thumbnailWidth: 150,
                acceptedFiles: 'image/*',
                maxFilesize: 2,
                autoProcessQueue: false,
                enctype: "multipart/form-data",
                parallelUploads: 3,
                clickable: true,
                dictDefaultMessage: 'Drag and drop files',
                headers: {
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
                },
                params:{
                    album_id : null,
                    photoNames : [],
                }
            },
        }
    },
    methods:{
        fetchImages()
        {
            axios.get(base_url + 'api/files')
                .then(response => {
                    this.images = response.data.data;
                })
                .catch(error => {
                    swalHelper.errorWithMessage('no images loaded')
                })
        },
        storeMethod(FormData)
        {
            axios.post(base_url + 'api/files/' , FormData)
                .then(response => {
                    this.dropzoneOptions.params.album_id = response.data.data.id;
                    // console.log(this.photoNames);
                    this.dropzoneOptions.params.photoNames = this.photoNames;
                    this.$refs.myVueDropzone.processQueue();
                    response.data.data ? this.images.push(response.data.data) : null;
                    this.addFormErrors = response.data.errors;
                    // SwalHelper.successWithMessage('Album added successfully!');
                })
                .catch(error => {
                    this.addFormErrors = error.response.data.errors;
                    Notifiations.error();
;                })
        },
        editMethod(data)
        {
            this.editForm = data;
            this.editFormErrors = null;
        },
        firstStepDeleteMethod(data)
        {
            this.images = data.images;
            this.form.album_name = data.name;
            this.form.id = data.id;
        },
        deleteAfterMoveImages(form)
        {
            console.log(form.new_album_id);
            if (form.new_album_id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this setting!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(base_url+'api/files/updatecollection/' , form)
                            .then(response => {
                                this.deleteMethod(form.id);
                            })
                            .catch(error => {
                                Notification.error();
                            })
                    }
                });
            }

        },
        updateMethod(FormData)
        {
            axios.put(base_url + 'api/images/' + FormData.id, FormData)
                .then(response => {
                    if (response.data){
                        this.dropzoneOptionsUpdate.params.album_id = FormData.id;
                        this.$refs.myVueDropzoneUpdate.processQueue();
                        Object.assign(FormData, response.data.data);
                    }
                })
                .catch(error => {
                    this.editFormErrors = error.response.data.errors;
                    this.fetchAlbums();
                })
        },
        deleteMethod(id)
        {
            if (id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this setting!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(base_url+'api/images/'+id)
                            .then(response => {
                                this.images = this.images.filter(album => {
                                    return album.id !== id;
                                });
                                SwalHelper.successWithMessage(response.data.message);
                            })
                            .catch(error => {
                                Notification.errorWithMessage(error.response.data.message);
                            })
                    }
                });
            }
        },
        deleteFile(id)
        {
            if (id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this setting!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(base_url+'api/files/'+id)
                            .then(response => {
                                this.images = this.images.filter(image => {
                                    return image.id !== id;
                                });
                            })
                            .catch(error => {
                                Notification.errorWithMessage(error.response.data.message);
                            })
                    }
                });
            }
        },
        editFile(data)
        {
            this.editFormFile = data;
        },
        updateFile(FormData)
        {
            axios.put(base_url + 'api/files/' + FormData.id, FormData)
                .then(response => {
                    if (response.data){
                        Object.assign(FormData, response.data.data);
                    }
                })
                .catch(error => {
                    this.editFormErrors = error.response.data.errors;
                    this.fetchAlbums();
                })
        },
    },
    computed:{
        AlbumsSearchFilter(){
            if (!this.searchTerm){
                return this.images;
            }
            else {
                return this.images.filter(album => {
                    return album.name.toLowerCase().includes(this.searchTerm.toLowerCase());
                })
            }
        }
    },
    watch:{

    }
}
</script>

<style scoped>

</style>
