"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["Modules_MediaManager_Resources_assets_js_Components_FileComponent_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
  name: "FileComponent",
  created: function created() {
    this.fetchImages();
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
      images: [],
      base_url: base_url,
      addForm: {},
      editForm: {},
      editFormFile: {},
      form: {},
      searchTerm: '',
      addFormErrors: {},
      editFormErrors: {},
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
        params: {
          album_id: null,
          photoNames: []
        }
      }
    };
  },
  methods: {
    fetchImages: function fetchImages() {
      var _this = this;
      axios.get(base_url + 'api/files').then(function (response) {
        _this.images = response.data.data;
      })["catch"](function (error) {
        _resources_js_Helpers_SwalHelper__WEBPACK_IMPORTED_MODULE_0__["default"].errorWithMessage('no images loaded');
      });
    },
    storeMethod: function storeMethod(FormData) {
      var _this2 = this;
      axios.post(base_url + 'api/files/', FormData).then(function (response) {
        _this2.dropzoneOptions.params.album_id = response.data.data.id;
        // console.log(this.photoNames);
        _this2.dropzoneOptions.params.photoNames = _this2.photoNames;
        _this2.$refs.myVueDropzone.processQueue();
        response.data.data ? _this2.images.push(response.data.data) : null;
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
      axios.put(base_url + 'api/images/' + FormData.id, FormData).then(function (response) {
        if (response.data) {
          _this4.dropzoneOptionsUpdate.params.album_id = FormData.id;
          _this4.$refs.myVueDropzoneUpdate.processQueue();
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
            axios["delete"](base_url + 'api/images/' + id).then(function (response) {
              _this5.images = _this5.images.filter(function (album) {
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
    },
    editFile: function editFile(data) {
      this.editFormFile = data;
    },
    updateFile: function updateFile(FormData) {
      var _this7 = this;
      axios.put(base_url + 'api/files/' + FormData.id, FormData).then(function (response) {
        if (response.data) {
          Object.assign(FormData, response.data.data);
        }
      })["catch"](function (error) {
        _this7.editFormErrors = error.response.data.errors;
        _this7.fetchAlbums();
      });
    }
  },
  computed: {
    AlbumsSearchFilter: function AlbumsSearchFilter() {
      var _this8 = this;
      if (!this.searchTerm) {
        return this.images;
      } else {
        return this.images.filter(function (album) {
          return album.name.toLowerCase().includes(_this8.searchTerm.toLowerCase());
        });
      }
    }
  },
  watch: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=template&id=e130b5a8&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=template&id=e130b5a8&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_c("div", {
    staticClass: "row"
  }, _vm._l(_vm.images, function (image) {
    return _c("div", {
      staticClass: "col-lg-4 col-md-12 mb-4 mb-lg-0"
    }, [_c("img", {
      staticClass: "w-100 shadow-1-strong rounded mb-4",
      attrs: {
        src: image.url,
        alt: "Boat on Calm Water"
      }
    }), _vm._v(" "), _c("h6", [_vm._v(" Album: " + _vm._s(image.album_name))]), _vm._v(" "), _c("p", [_vm._v(" Name: " + _vm._s(image.name))])]);
  }), 0)])])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue":
/*!*******************************************************************************!*\
  !*** ./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FileComponent_vue_vue_type_template_id_e130b5a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileComponent.vue?vue&type=template&id=e130b5a8&scoped=true& */ "./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=template&id=e130b5a8&scoped=true&");
/* harmony import */ var _FileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileComponent.vue?vue&type=script&lang=js& */ "./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FileComponent_vue_vue_type_template_id_e130b5a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _FileComponent_vue_vue_type_template_id_e130b5a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "e130b5a8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FileComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=template&id=e130b5a8&scoped=true&":
/*!**************************************************************************************************************************!*\
  !*** ./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=template&id=e130b5a8&scoped=true& ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileComponent_vue_vue_type_template_id_e130b5a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileComponent_vue_vue_type_template_id_e130b5a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileComponent_vue_vue_type_template_id_e130b5a8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FileComponent.vue?vue&type=template&id=e130b5a8&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./Modules/MediaManager/Resources/assets/js/Components/FileComponent.vue?vue&type=template&id=e130b5a8&scoped=true&");


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