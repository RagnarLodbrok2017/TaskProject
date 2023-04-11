"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["Modules_Album_Resources_assets_js_Components_AlbumComponent_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _resources_js_Helpers_SwalHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../resources/js/Helpers/SwalHelper */ "./resources/js/Helpers/SwalHelper.js");
/* harmony import */ var vue2_dropzone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue2-dropzone */ "./node_modules/vue2-dropzone/dist/vue2Dropzone.js");
/* harmony import */ var vue2_dropzone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue2_dropzone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue2_dropzone_dist_vue2Dropzone_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue2-dropzone/dist/vue2Dropzone.min.css */ "./node_modules/vue2-dropzone/dist/vue2Dropzone.min.css");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "AlbumComponent",
  created: function created() {
    this.fetchAlbums();
  },
  components: {
    vueDropzone: (vue2_dropzone__WEBPACK_IMPORTED_MODULE_1___default())
  },
  mounted: function mounted() {
    // const myDropzone = this.$refs.myVueDropzone.dropzone;
    // myDropzone.on('queuecomplete', this.uploadImage);
  },
  data: function data() {
    return {
      albums: [],
      base_url: base_url,
      data_style: 'table',
      addForm: {},
      editForm: {},
      form: {},
      searchTerm: '',
      addFormErrors: {},
      editFormErrors: {},
      images: [],
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
          album_id: null
        }
      }
    };
  },
  methods: {
    uploadImage: function uploadImage(response) {
      console.log('response');
    },
    fetchAlbums: function fetchAlbums() {
      var _this = this;
      axios.get(base_url + 'api/albums').then(function (response) {
        _this.albums = response.data.data;
      })["catch"](function (error) {
        _resources_js_Helpers_SwalHelper__WEBPACK_IMPORTED_MODULE_0__["default"].errorWithMessage('no albums loaded');
      });
    },
    storeMethod: function storeMethod(FormData) {
      var _this2 = this;
      axios.post(base_url + 'api/albums/', FormData).then(function (response) {
        _this2.dropzoneOptions.params.album_id = response.data.data.id;
        _this2.$refs.myVueDropzone.processQueue();
        response.data.data ? _this2.albums.push(response.data.data) : null;
        _this2.addFormErrors = response.data.errors;
        // SwalHelper.successWithMessage('Album added successfully!');
      })["catch"](function (error) {
        _this2.addFormErrors = error.response.data.errors;
        Notifiations.error();
        ;
      });
    },
    editMethod: function editMethod(data) {
      this.editForm = data;
      this.editFormErrors = null;
    },
    firstStepDeleteMethod: function firstStepDeleteMethod(data) {
      this.images = data.images;
      this.form.album_name = data.name;
      this.form.id = data.id;
    },
    deleteAfterMoveImages: function deleteAfterMoveImages(form) {
      var _this3 = this;
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
        }).then(function (result) {
          if (result.isConfirmed) {
            axios.post(base_url + 'api/files/updatecollection/', form).then(function (response) {
              _this3.deleteMethod(form.id);
            })["catch"](function (error) {
              Notification.error();
            });
          }
        });
      }
    },
    updateMethod: function updateMethod(FormData) {
      var _this4 = this;
      axios.put(base_url + 'api/albums/' + FormData.id, FormData).then(function (response) {
        if (response.data) {
          Object.assign(FormData, response.data.data);
        }
      })["catch"](function (error) {
        _this4.editFormErrors = error.response.data.errors;
        _this4.fetchAlbums();
      });
    },
    deleteMethod: function deleteMethod(id) {
      var _this5 = this;
      if (id) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this setting!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
          if (result.isConfirmed) {
            axios["delete"](base_url + 'api/albums/' + id).then(function (response) {
              _this5.albums = _this5.albums.filter(function (album) {
                return album.id !== id;
              });
              SwalHelper.successWithMessage(response.data.message);
            })["catch"](function (error) {
              Notification.errorWithMessage(error.response.data.message);
            });
          }
        });
      }
    },
    deleteFile: function deleteFile(id) {
      var _this6 = this;
      if (id) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this setting!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
          if (result.isConfirmed) {
            axios["delete"](base_url + 'api/files/' + id).then(function (response) {
              _this6.images = _this6.images.filter(function (image) {
                return image.id !== id;
              });
            })["catch"](function (error) {
              Notification.errorWithMessage(error.response.data.message);
            });
          }
        });
      }
    }
  },
  computed: {
    AlbumsSearchFilter: function AlbumsSearchFilter() {
      var _this7 = this;
      if (!this.searchTerm) {
        return this.albums;
      } else {
        return this.albums.filter(function (album) {
          return album.name.toLowerCase().includes(_this7.searchTerm.toLowerCase());
        });
      }
    }
  },
  watch: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=template&id=7f51d21d&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=template&id=7f51d21d&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "card"
  }, [_c("div", {
    staticClass: "card-body"
  }, [_c("h4", {
    staticClass: "card-title"
  }, [_vm._v("Albums Table:")]), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-4"
  }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.data_style,
      expression: "data_style"
    }],
    staticClass: "input-group form-control",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.data_style = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c("option", {
    attrs: {
      value: "table"
    }
  }, [_vm._v("\n                                    Table Style\n                                ")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "cards"
    }
  }, [_vm._v("\n                                    Cards Style\n                                ")])])]), _vm._v(" "), _c("div", {
    staticClass: "col-6"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.searchTerm,
      expression: "searchTerm"
    }],
    staticClass: "input-group form-control",
    attrs: {
      type: "text",
      placeholder: "Search"
    },
    domProps: {
      value: _vm.searchTerm
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.searchTerm = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "col-2"
  }, [_c("div", {
    staticClass: "modal",
    attrs: {
      id: "addModel",
      tabindex: "-1",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-lg"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", {
    attrs: {
      method: "post"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
      }
    }
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "form-group"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-8"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "title"
    }
  }, [_vm._v("\n                                                                        Name:\n                                                                    ")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.addForm.name,
      expression: "addForm.name"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "Please Enter Nane:",
      maxlength: "200",
      required: ""
    },
    domProps: {
      value: _vm.addForm.name
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.addForm, "name", $event.target.value);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "col-4"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "title"
    }
  }, [_vm._v("\n                                                                        Status:\n                                                                    ")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.addForm.status,
      expression: "addForm.status"
    }],
    staticClass: "input-group form-control",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.addForm, "status", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    staticClass: "btn btn-success badge",
    domProps: {
      value: true
    }
  }, [_vm._v("\n                                                                            Active\n                                                                        ")]), _vm._v(" "), _c("option", {
    staticClass: "btn btn-danger badge",
    domProps: {
      value: false
    }
  }, [_vm._v("\n                                                                            Not Active\n                                                                        ")])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "col-12 pt-2"
  }, [_c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "key"
    }
  }, [_vm._v("\n                                                                Description:\n                                                            ")]), _vm._v(" "), _c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.addForm.description,
      expression: "addForm.description"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      rows: "3"
    },
    domProps: {
      value: _vm.addForm.description
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.addForm, "description", $event.target.value);
      }
    }
  })])])])]), _vm._v(" "), _vm.addFormErrors ? _c("div", {
    staticClass: "col-12"
  }, _vm._l(_vm.addFormErrors, function (error) {
    return _c("p", {
      staticClass: "text-danger"
    }, [_vm._v(_vm._s(error))]);
  }), 0) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "col-12 pt-2"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "key"
    }
  }, [_vm._v("\n                                                    Images:\n                                                ")]), _vm._v(" "), _c("vue-dropzone", {
    ref: "myVueDropzone",
    attrs: {
      id: "dropzone",
      options: _vm.dropzoneOptions
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "btn btn-secondary",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal"
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        return _vm.storeMethod(_vm.addForm);
      }
    }
  }, [_vm._v("Add")])])])])]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary",
    attrs: {
      "data-bs-toggle": "modal",
      "data-bs-target": "#addModel"
    }
  }, [_vm._v("Add Album")])])]), _vm._v(" "), _c("p", {
    staticClass: "card-title-desc"
  }), _vm._v(" "), _c("table", {
    staticClass: "table table-bordered dt-responsive nowrap",
    staticStyle: {
      "border-collapse": "collapse",
      "border-spacing": "0",
      width: "100%"
    },
    attrs: {
      id: "datatable"
    }
  }, [_vm._m(1), _vm._v(" "), _c("tbody", _vm._l(_vm.AlbumsSearchFilter, function (album, index) {
    return _c("tr", {
      key: album.id
    }, [_c("td", [_vm._v(" " + _vm._s(album.name))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(album.description))]), _vm._v(" "), _c("td", [album.status ? _c("button", {
      staticClass: "badge btn btn-success"
    }, [_vm._v("Active")]) : _c("button", {
      staticClass: "badge btn btn-danger"
    }, [_vm._v("Not Active")])]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(album.images_count))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(album.created_at))]), _vm._v(" "), _c("td", [_c("button", {
      staticClass: "btn btn-primary",
      attrs: {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editModel"
      },
      on: {
        click: function click($event) {
          return _vm.editMethod(album);
        }
      }
    }, [_vm._v("Edit")]), _vm._v(" "), !album.has_images ? _c("button", {
      staticClass: "btn btn-warning",
      on: {
        click: function click($event) {
          return _vm.deleteMethod(album.id);
        }
      }
    }, [_vm._v(" Delete ")]) : _vm._e(), _vm._v(" "), album.has_images ? _c("button", {
      staticClass: "btn btn-danger",
      attrs: {
        "data-bs-toggle": "modal",
        "data-bs-target": "#deleteModel"
      },
      on: {
        click: function click($event) {
          return _vm.firstStepDeleteMethod(album);
        }
      }
    }, [_vm._v("Delete")]) : _vm._e()])]);
  }), 0)]), _vm._v(" "), _c("div", {
    staticClass: "modal",
    attrs: {
      id: "editModel",
      tabindex: "-1",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-lg"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(2), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", {
    attrs: {
      method: "post"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
      }
    }
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "form-group"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-8"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "title"
    }
  }, [_vm._v("\n                                                                Name:\n                                                            ")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.editForm.name,
      expression: "editForm.name"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "Please Enter Nane:",
      maxlength: "200",
      required: ""
    },
    domProps: {
      value: _vm.editForm.name
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.editForm, "name", $event.target.value);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "col-4"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "title"
    }
  }, [_vm._v("\n                                                                Status:\n                                                            ")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.editForm.status,
      expression: "editForm.status"
    }],
    staticClass: "input-group form-control",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.editForm, "status", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    staticClass: "btn btn-success badge",
    domProps: {
      value: true
    }
  }, [_vm._v("\n                                                                    Active\n                                                                ")]), _vm._v(" "), _c("option", {
    staticClass: "btn btn-danger badge",
    domProps: {
      value: false
    }
  }, [_vm._v("\n                                                                    Not Active\n                                                                ")])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "col-12 pt-2"
  }, [_c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    staticClass: "form-label",
    attrs: {
      title: "key"
    }
  }, [_vm._v("\n                                                        Description:\n                                                    ")]), _vm._v(" "), _c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.editForm.description,
      expression: "editForm.description"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      rows: "3"
    },
    domProps: {
      value: _vm.editForm.description
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.editForm, "description", $event.target.value);
      }
    }
  })])])])]), _vm._v(" "), _vm.editFormErrors ? _c("div", {
    staticClass: "col-12"
  }, _vm._l(_vm.editFormErrors, function (error) {
    return _c("p", {
      staticClass: "text-danger"
    }, [_vm._v(_vm._s(error))]);
  }), 0) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "btn btn-secondary",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal"
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        return _vm.updateMethod(_vm.editForm);
      }
    }
  }, [_vm._v("Update")])])])])]), _vm._v(" "), _c("div", {
    staticClass: "modal",
    attrs: {
      id: "deleteModel",
      tabindex: "-1",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-lg"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Delete Album "), _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.form.album_name))]), _vm._v(":")]), _vm._v(" "), _c("button", {
    staticClass: "btn-close",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal",
      "aria-label": "Close"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", {
    attrs: {
      method: "post"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
      }
    }
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "row",
    attrs: {
      "data-masonry": '{"percentPosition": true }'
    }
  }, _vm._l(_vm.images, function (image) {
    return _c("div", {
      staticClass: "col-sm-6 col-lg-4"
    }, [_c("div", {
      staticClass: "card",
      staticStyle: {
        height: "315px",
        overflow: "hidden"
      }
    }, [_c("img", {
      staticClass: "card-img-top",
      staticStyle: {
        height: "173px",
        width: "100%"
      },
      attrs: {
        src: image.url,
        alt: image.url
      }
    }), _vm._v(" "), _c("div", {
      staticClass: "card-body"
    }, [_c("h5", {
      staticClass: "card-title"
    }, [_vm._v(_vm._s(image.name))]), _vm._v(" "), _c("div", {
      staticClass: "row pt-2 pb-2"
    }, [_c("button", {
      staticClass: "col-4 btn-sm btn btn-danger",
      on: {
        click: function click($event) {
          return _vm.deleteFile(image.id);
        }
      }
    }, [_vm._v("Delete")]), _vm._v(" "), _c("div", {
      staticClass: "col-4"
    }), _vm._v(" "), _c("button", {
      staticClass: "col-4 btn-sm btn btn-info",
      on: {
        click: function click($event) {
          return _vm.deleteFile(image.id);
        }
      }
    }, [_vm._v("Edit")])]), _vm._v(" "), _c("p", {
      staticClass: "card-text"
    }, [_c("small", {
      staticClass: "text-muted"
    }, [_vm._v("Last updated " + _vm._s(image.updated_at))])])])])]);
  }), 0)]), _vm._v(" "), _c("div", {
    staticClass: "col-12 pt-3"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-6"
  }, [_c("label", [_vm._v("Delete album with all Images :")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-danger",
    on: {
      click: function click($event) {
        return _vm.deleteMethod(_vm.form.id);
      }
    }
  }, [_vm._v("Delete")])]), _vm._v(" "), _c("div", {
    staticClass: "col-6"
  }, [_c("label", [_vm._v("Change the images's album :")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.new_album_id,
      expression: "form.new_album_id"
    }],
    staticClass: "form-control",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.form, "new_album_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, _vm._l(_vm.albums, function (album) {
    return _c("option", {
      domProps: {
        value: album.id
      }
    }, [_vm._v(_vm._s(album.name) + " "), _c("code", [_vm._v("(" + _vm._s(album.images_count) + ")")])]);
  }), 0), _vm._v(" "), _c("button", {
    staticClass: "btn btn-danger",
    on: {
      click: function click($event) {
        return _vm.deleteAfterMoveImages(_vm.form);
      }
    }
  }, [_vm._v("Move And Delete")])])])])])]), _vm._v(" "), _vm.editFormErrors ? _c("div", {
    staticClass: "col-12"
  }, _vm._l(_vm.editFormErrors, function (error) {
    return _c("p", {
      staticClass: "text-danger"
    }, [_vm._v(_vm._s(error))]);
  }), 0) : _vm._e()]), _vm._v(" "), _vm._m(3)])])])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Album :")]), _vm._v(" "), _c("button", {
    staticClass: "btn-close",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal",
      "aria-label": "Close"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("Name")]), _vm._v(" "), _c("th", [_vm._v("Description")]), _vm._v(" "), _c("th", [_vm._v("Status")]), _vm._v(" "), _c("th", [_vm._v("Number of images")]), _vm._v(" "), _c("th", [_vm._v("Date")]), _vm._v(" "), _c("th", [_vm._v("Action")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Edit Album :")]), _vm._v(" "), _c("button", {
    staticClass: "btn-close",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal",
      "aria-label": "Close"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "btn btn-secondary",
    attrs: {
      type: "button",
      "data-bs-dismiss": "modal"
    }
  }, [_vm._v("Close")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue":
/*!*************************************************************************!*\
  !*** ./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AlbumComponent_vue_vue_type_template_id_7f51d21d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AlbumComponent.vue?vue&type=template&id=7f51d21d&scoped=true& */ "./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=template&id=7f51d21d&scoped=true&");
/* harmony import */ var _AlbumComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AlbumComponent.vue?vue&type=script&lang=js& */ "./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AlbumComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AlbumComponent_vue_vue_type_template_id_7f51d21d_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _AlbumComponent_vue_vue_type_template_id_7f51d21d_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7f51d21d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Modules/Album/Resources/assets/js/Components/AlbumComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AlbumComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AlbumComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AlbumComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=template&id=7f51d21d&scoped=true&":
/*!********************************************************************************************************************!*\
  !*** ./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=template&id=7f51d21d&scoped=true& ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AlbumComponent_vue_vue_type_template_id_7f51d21d_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AlbumComponent_vue_vue_type_template_id_7f51d21d_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AlbumComponent_vue_vue_type_template_id_7f51d21d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AlbumComponent.vue?vue&type=template&id=7f51d21d&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/Album/Resources/assets/js/Components/AlbumComponent.vue?vue&type=template&id=7f51d21d&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);