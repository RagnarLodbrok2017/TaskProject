<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">Albums Table:</h4>
                    <div class="row">
                        <div class="col-2">
                            <button class="btn btn-info">
                                <router-link :to="{name : 'album'}" class="text-white">Table View</router-link>
                            </button>
                        </div>
                        <div class="col-2">
                            <select class="input-group form-control" v-model="data_style">
                                <option value="table">
                                    Table Style
                                </option>
                                <option value="cards">
                                    Cards Style
                                </option>
                            </select>
                        </div>
                        <div class="col-6">
                            <input type="text" v-model="searchTerm" placeholder="Search" class="input-group form-control"/>
                        </div>
                        <div class="col-2">
                            <!-- Button trigger modal -->
                            <div class="modal" id="addModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Album :</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form method="post" @click.prevent="">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col-8">
                                                                    <label class="form-label" title="title">
                                                                        Name:
                                                                    </label>
                                                                    <input v-model="addForm.name" class="form-control" type="text" placeholder="Please Enter Nane:" maxlength="200" required>
                                                                </div>
                                                                <div class="col-4">
                                                                    <label class="form-label" title="title">
                                                                        Status:
                                                                    </label>
                                                                    <select class="input-group form-control" v-model="addForm.status">
                                                                        <option class="btn btn-success badge" :value="true">
                                                                            Active
                                                                        </option>
                                                                        <option class="btn btn-danger badge" :value="false">
                                                                            Not Active
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12 pt-2">
                                                        <div class="form-group">
                                                            <label class="form-label" title="key">
                                                                Description:
                                                            </label>
                                                            <textarea v-model="addForm.description" class="form-control" type="text" rows="3">
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="col-12" v-if="addFormErrors">
                                                <p class="text-danger" v-for="error in addFormErrors">{{ error }}</p>
                                            </div>
                                            <div class="col-12 pt-2">
                                                <label class="form-label" title="key">
                                                    Images:
                                                </label>
                                                <vue-dropzone ref="myVueDropzone" id="dropzone"
                                                              :options="dropzoneOptions"></vue-dropzone>
<!--                                                <vue-dropzone ref="myVueDropzone" id="dropzone"-->
<!--                                                              :options="dropzoneOptions" @vdropzone-complete="uploadImage"></vue-dropzone>-->
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button @click="storeMethod(addForm)" type="button" class="btn btn-primary">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModel">Add Album</button>
                        </div>
                    </div>
                    <p class="card-title-desc">

                    </p>

                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Number of images</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(album, index) in AlbumsSearchFilter" :key="album.id" v-if="!album.has_images">
                            <td> {{ album.name }}</td>
                            <td> {{ album.description }}</td>
                            <td>
                                <button v-if="album.status" class="badge btn btn-success">Active</button>
                                <button v-else class="badge btn btn-danger">Not Active</button>
                            </td>
                            <td> {{ album.images_count }}</td>
                            <td> {{ album.created_at }}</td>
                            <td>
                                <!-- Button trigger modal -->
                                <button @click="editMethod(album)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModel">Edit</button>
                                <button v-if="!album.has_images" @click="deleteMethod(album.id)" class="btn btn-warning"> Delete </button>
                                <button v-if="album.has_images" @click="firstStepDeleteMethod(album)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModel">Delete</button>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="col-12 pt-5 pb-3"  v-for="album in albums" v-if="album.has_images">

                        <div class="row">
                            <div class="col-10">
                                <h4 class="my-3 text-pink"><span class="text-dark">Album </span>{{ album.name }}</h4>
                                <h6 class="my-3 text-black">{{ album.description }}</h6>
                            </div>
                            <div class="col-2">
                                <button @click="editMethod(album)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModel">Edit</button>
                                <button v-if="!album.has_images" @click="deleteMethod(album.id)" class="btn btn-warning"> Delete </button>
                                <button v-if="album.has_images" @click="firstStepDeleteMethod(album)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModel">Delete</button>

                            </div>
                        </div>
<!--                        <div class="row" v-else>-->
<!--                            <div class="col-4">-->
<!--                                <h4 class="my-3 text-pink"><span class="text-dark">Album </span>{{ album.name }}</h4>-->
<!--                            </div>-->
<!--                            <div class="col-6">-->
<!--                                <h6 class="my-3 text-black">Description: {{ album.description }}</h6>-->
<!--                            </div>-->
<!--                            <div class="col-2">-->
<!--                                <button @click="editMethod(album)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModel">Edit</button>-->
<!--                                <button v-if="!album.has_images" @click="deleteMethod(album.id)" class="btn btn-warning"> Delete </button>-->
<!--                                <button v-if="album.has_images" @click="firstStepDeleteMethod(album)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModel">Delete</button>-->

<!--                            </div>-->
<!--                        </div>-->

                        <div class="row" data-masonry='{"percentPosition": true }'>
                            <div class="col-sm-6 col-lg-4" v-for="image in album.images">
                                <div class="card" style="height: 315px;overflow: hidden;">
                                    <img style="height: 173px;width: 100%" :src="image.url" class="card-img-top" :alt="image.url">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ image.name  }}</h5>
                                        <div class="row pt-2 pb-2">
                                            <button class="col-4  btn-sm btn btn-danger" @click="deleteFile(image.id)">Delete</button>
                                            <div class="col-4"></div>
                                            <button  @click="editFile(image)" class="col-4  btn-sm btn btn-info" data-bs-toggle="modal" data-bs-target="#editFileModal">Edit</button>
                                        </div>
                                        <p class="card-text"><small class="text-muted">Last updated {{ image.updated_at }}</small></p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
<!--                    Edit Modal Album     -->
                    <div class="modal" id="editModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Album :</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" @click.prevent="">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-8">
                                                            <label class="form-label" title="title">
                                                                Name:
                                                            </label>
                                                            <input v-model="editForm.name" class="form-control" type="text" placeholder="Please Enter Nane:" maxlength="200" required>
                                                        </div>
                                                        <div class="col-4">
                                                            <label class="form-label" title="title">
                                                                Status:
                                                            </label>
                                                            <select class="input-group form-control" v-model="editForm.status">
                                                                <option class="btn btn-success badge" :value="true">
                                                                    Active
                                                                </option>
                                                                <option class="btn btn-danger badge" :value="false">
                                                                    Not Active
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 pt-2">
                                                <div class="form-group">
                                                    <label class="form-label" title="key">
                                                        Description:
                                                    </label>
                                                    <textarea v-model="editForm.description" class="form-control" type="text" rows="3">
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="col-12" v-if="editFormErrors">
                                        <p class="text-danger" v-for="error in editFormErrors">{{ error }}</p>
                                    </div>
                                    <div class="col-12">
                                        <div class="row pt-3" data-masonry='{"percentPosition": true }'>
                                            <div class="col-sm-6 col-lg-4" v-for="image in editForm.images">
                                                <div class="card" style="height: 315px;overflow: hidden;">
                                                    <img style="height: 173px;width: 100%" :src="image.url" class="card-img-top" :alt="image.url">
                                                    <div class="card-body">
                                                        <h5 class="card-title">{{ image.name  }}</h5>
                                                        <div class="row pt-2 pb-2">
                                                            <button class="col-4  btn-sm btn btn-danger" @click="deleteFile(image.id)">Delete</button>
                                                            <div class="col-4"></div>
                                                            <button  @click="editFile(image)" class="col-4  btn-sm btn btn-info" data-bs-toggle="modal" data-bs-target="#editFileModal">Edit</button>
                                                        </div>
                                                        <p class="card-text"><small class="text-muted">Last updated {{ image.updated_at }}</small></p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="col-12 pt-2">
                                        <vue-dropzone ref="myVueDropzoneUpdate" id="dropzoneInUpdate"
                                                      :options="dropzoneOptionsUpdate"></vue-dropzone>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button @click="updateMethod(editForm)" type="button" class="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

<!--                    Delete Modal of Album       -->
                    <div class="modal" id="deleteModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Delete Album <span class="text-danger">{{ form.album_name }}</span>:</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" @click.prevent="">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="row" data-masonry='{"percentPosition": true }'>
                                                    <div class="col-sm-6 col-lg-4" v-for="image in images">
                                                        <div class="card" style="height: 315px;overflow: hidden;">
                                                            <img style="height: 173px;width: 100%" :src="image.url" class="card-img-top" :alt="image.url">
                                                            <div class="card-body">
                                                                <h5 class="card-title">{{ image.name  }}</h5>
                                                                <div class="row pt-2 pb-2">
                                                                    <button class="col-4  btn-sm btn btn-danger" @click="deleteFile(image.id)">Delete</button>
                                                                    <div class="col-4"></div>
                                                                    <button  @click="editFile(image)" class="col-4  btn-sm btn btn-info" data-bs-toggle="modal" data-bs-target="#editFileModal">Edit</button>
                                                                </div>
                                                                <p class="card-text"><small class="text-muted">Last updated {{ image.updated_at }}</small></p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="col-12 pt-3">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <label>Delete album with all Images :</label>
                                                        <button class="btn btn-danger" @click="deleteMethod(form.id)">Delete</button>
                                                    </div>
                                                    <div class="col-6">
                                                        <label>Move the images to other album :</label>
                                                        <select class="form-control" v-model="form.new_album_id">
                                                            <option v-for="album in albums" :value="album.id">{{ album.name }} <code>({{ album.images_count }})</code></option>
                                                        </select>
                                                        <button class="btn btn-danger" @click="deleteAfterMoveImages(form)">Move And Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="col-12" v-if="editFormErrors">
                                        <p class="text-danger" v-for="error in editFormErrors">{{ error }}</p>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<!--                                    <button @click="deleteMethod(editForm.id)" type="button" class="btn btn-primary">Ok</button>-->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--                    Edit Modal of File     -->
                    <div class="modal" id="editFileModal" tabindex="-2" aria-labelledby="editFileModal" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Image:</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" @click.prevent="">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <label class="form-label" title="title">
                                                                Name:
                                                            </label>
                                                            <input v-model="editFormFile.name" class="form-control" type="text" placeholder="Please Enter Nane:" maxlength="200" required>
                                                        </div>
                                                        <div class="col-12">
                                                            <label class="form-label" title="title">
                                                                Album:
                                                            </label>
                                                            <select class="input-group form-control" v-model="editFormFile.album_id">
                                                                <option v-for="album in albums" :value="album.id">
                                                                    {{ album.name }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button @click="updateFile(editFormFile)" type="button" class="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
    name: "AlbumComponent",

    created() {
        this.fetchAlbums();
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
            albums:[],
            base_url:base_url,
            data_style:'table',
            addForm:{},
            editForm:{},
            editFormFile:{},
            form:{},
            searchTerm:'',
            addFormErrors:{},
            editFormErrors:{},
            images:[],
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
                params:{
                    album_id : null,
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
                }
            },
        }
    },
    methods:{
        uploadImage(response){
          console.log('response');
        },
        fetchAlbums()
        {
            axios.get(base_url + 'api/albums')
                .then(response => {
                    this.albums = response.data.data;
                })
                .catch(error => {
                    swalHelper.errorWithMessage('no albums loaded')
                })
        },
        storeMethod(FormData)
        {
            axios.post(base_url + 'api/albums/' , FormData)
                .then(response => {
                    this.dropzoneOptions.params.album_id = response.data.data.id;
                    this.$refs.myVueDropzone.processQueue();
                    response.data.data ? this.albums.push(response.data.data) : null;
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
            axios.put(base_url + 'api/albums/' + FormData.id, FormData)
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
                        axios.delete(base_url+'api/albums/'+id)
                            .then(response => {
                                this.albums = this.albums.filter(album => {
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
                return this.albums;
            }
            else {
                return this.albums.filter(album => {
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
