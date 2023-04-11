<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">Albums Table:</h4>
                    <div class="row">
                        <div class="col-4">
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
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button @click="addMethod(addForm)" type="button" class="btn btn-primary">Add</button>
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
                        <tr v-for="(album, index) in AlbumsSearchFilter" :key="album.id">
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
                                <button @click="deleteMethod(album.id)" class="btn btn-danger"> Delete </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
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
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button @click="updateMethod(editForm)" type="button" class="btn btn-primary">Update</button>
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

export default {
    name: "AlbumComponent",
    created() {
        this.fetchAlbums();
    },
    mounted() {
    },
    data(){
        return {
            albums:[],
            base_url:base_url,
            data_style:'table',
            addForm:{},
            editForm:{},
            searchTerm:'',
            addFormErrors:{},
            editFormErrors:{},
        }
    },
    methods:{
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
        addMethod(FormData)
        {
            axios.post(base_url + 'api/albums/' , FormData)
                .then(response => {
                    Notification.successWithMessage('Album added successfully!');
                    response.data.data ? this.albums.push(response.data.data) : null;
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
        updateMethod(FormData)
        {
            axios.put(base_url + 'api/albums/' + FormData.id, FormData)
                .then(response => {
                    if (response.data){
                        Object.assign(FormData, response.data.data);
                    }
                })
                .catch(error => {
                    this.editFormErrors = error.response.data.errors;
                    this.fetchAlbums();
;                })
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
