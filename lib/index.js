import { defineComponent, computed, openBlock, createBlock, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, createElementBlock, Fragment, renderList, ref, watch, isRef, createCommentVNode, h, render, resolveDynamicComponent } from 'vue';
import { VCard, VCardTitle, VIcon, VCardText, VCardActions, VBtn, VBottomSheet, VList, VListItem, VDialog, VLayout, VSnackbar } from 'vuetify/lib/components/index.mjs';

class PluginContext {
    static pluginOptions;
    static app;
    constructor(app, _pluginOptions) {
        if (!app)
            throw new Error('Error during initialization : app is required');
        PluginContext.app = app;
        const vuetify = app._context.mixins.find((mixin) => mixin.computed?.$vuetify);
        if (!vuetify)
            throw new Error('Error during initialization : vuetify is required. Please declare it with Vue.use(Vuetify)');
        if (_pluginOptions)
            PluginContext.pluginOptions = _pluginOptions;
    }
    static getPluginOptions() {
        return PluginContext.pluginOptions;
    }
    static getApp() {
        return PluginContext.app;
    }
}

var script$3 = /*#__PURE__*/ defineComponent({
    __name: 'Card',
    props: {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: false
        },
        buttons: {
            type: Array,
        },
        icon: {
            type: String,
            default: ''
        },
        level: {
            type: String,
            default: 'info'
        },
        cardOptions: {
            type: Object,
            default: () => ({})
        },
        textHTML: {
            type: String,
            default: ''
        },
    },
    emits: ['buttonClicked'],
    setup(__props, { emit: __emit }) {
        const props = __props;
        // ------- EVENTS -------
        const emit = __emit;
        // ------- COMPUTED -------
        const _buttons = computed(() => {
            if (props.buttons && props.buttons.length > 0)
                return props.buttons;
            else
                return [
                    { key: 'cancel', title: 'Annuler', value: 'cancel', color: 'grey', variant: 'text' },
                    { key: 'ok', title: 'OK', value: 'ok', color: props.level, variant: 'tonal' }
                ];
        });
        const _icon = computed(() => {
            if (props.icon)
                return props.icon;
            switch (props.level) {
                case 'info':
                    return 'mdi-information';
                case 'warning':
                    return 'mdi-alert';
                case 'error':
                    return 'mdi-alert-circle';
                case 'success':
                    return 'mdi-check-circle';
                default:
                    return 'mdi-information';
            }
        });
        const _color = computed(() => {
            return props.level === 'info' ? 'primary' : props.level;
        });
        // ------- METHODS -------
        function close(buttonKey) {
            emit('buttonClicked', buttonKey);
        }
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(unref(VCard), mergeProps({ class: "vuetify3-dialog-card" }, __props.cardOptions), {
                default: withCtx(() => [
                    createVNode(unref(VCardTitle), { class: "d-flex align-center" }, {
                        default: withCtx(() => [
                            createVNode(unref(VIcon), {
                                color: _color.value,
                                class: "mr-2"
                            }, {
                                default: withCtx(() => [
                                    createTextVNode(toDisplayString(_icon.value), 1 /* TEXT */)
                                ]),
                                _: 1 /* STABLE */
                            }, 8 /* PROPS */, ["color"]),
                            createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                        ]),
                        _: 1 /* STABLE */
                    }),
                    (__props.textHTML)
                        ? (openBlock(), createBlock(unref(VCardText), {
                            key: 0,
                            innerHTML: __props.textHTML
                        }, null, 8 /* PROPS */, ["innerHTML"]))
                        : (openBlock(), createBlock(unref(VCardText), { key: 1 }, {
                            default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.text), 1 /* TEXT */)
                            ]),
                            _: 1 /* STABLE */
                        })),
                    createVNode(unref(VCardActions), null, {
                        default: withCtx(() => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(_buttons.value, (button) => {
                                return (openBlock(), createBlock(unref(VBtn), mergeProps({
                                    key: button.key
                                }, button, {
                                    color: button.color || _color.value,
                                    onClick: ($event) => (close(button.key))
                                }), {
                                    default: withCtx(() => [
                                        createTextVNode(toDisplayString(button.title), 1 /* TEXT */)
                                    ]),
                                    _: 2 /* DYNAMIC */
                                }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["color", "onClick"]));
                            }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _: 1 /* STABLE */
                    })
                ]),
                _: 1 /* STABLE */
            }, 16 /* FULL_PROPS */));
        };
    }
});

script$3.__file = "src/components/Card.vue";

var script$2 = /*#__PURE__*/ defineComponent({
    __name: 'BottomSheet',
    props: {
        bottomSheetOptions: {
            type: Object,
            default: () => ({})
        },
        dialogOptions: {
            type: Object,
            required: false
        },
        items: {
            type: Array,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        }
    },
    emits: ['closeBottomSheet'],
    setup(__props, { emit: __emit }) {
        const props = __props;
        // ------- EVENTS -------
        const emit = __emit;
        // ------- DATA -------
        let showBottomSheet = ref(true);
        // ------- COMPUTED -------
        const _items = computed(() => {
            if (props.items && props.items.length > 0)
                return props.items;
            else
                return [];
        });
        // ------- WATCH -------
        watch(() => showBottomSheet, (val) => {
            if (!val)
                emit('closeBottomSheet');
        });
        // ------- METHODS -------
        function close(value) {
            showBottomSheet.value = false;
            emit('closeBottomSheet', value);
        }
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(unref(VBottomSheet), mergeProps({ class: "vuetify3-dialog-bottom-sheet" }, __props.bottomSheetOptions, {
                modelValue: unref(showBottomSheet),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (isRef(showBottomSheet) ? (showBottomSheet).value = $event : showBottomSheet = $event))
            }), {
                default: withCtx(() => [
                    (!__props.dialogOptions)
                        ? (openBlock(), createBlock(unref(VCard), { key: 0 }, {
                            default: withCtx(() => [
                                (__props.title)
                                    ? (openBlock(), createBlock(unref(VCardTitle), { key: 0 }, {
                                        default: withCtx(() => [
                                            createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                        ]),
                                        _: 1 /* STABLE */
                                    }))
                                    : createCommentVNode("v-if", true),
                                (__props.text)
                                    ? (openBlock(), createBlock(unref(VCardText), { key: 1 }, {
                                        default: withCtx(() => [
                                            createTextVNode(toDisplayString(__props.text), 1 /* TEXT */)
                                        ]),
                                        _: 1 /* STABLE */
                                    }))
                                    : createCommentVNode("v-if", true),
                                (__props.items)
                                    ? (openBlock(), createBlock(unref(VList), { key: 2 }, {
                                        default: withCtx(() => [
                                            (openBlock(true), createElementBlock(Fragment, null, renderList(_items.value, (item) => {
                                                return (openBlock(), createBlock(unref(VListItem), {
                                                    title: item.title,
                                                    key: item.value,
                                                    onClick: ($event) => (close(item.value))
                                                }, null, 8 /* PROPS */, ["title", "onClick"]));
                                            }), 128 /* KEYED_FRAGMENT */))
                                        ]),
                                        _: 1 /* STABLE */
                                    }))
                                    : createCommentVNode("v-if", true)
                            ]),
                            _: 1 /* STABLE */
                        }))
                        : (openBlock(), createBlock(script$3, mergeProps({ key: 1 }, __props.dialogOptions, {
                            title: __props.dialogOptions.title,
                            text: __props.dialogOptions.text,
                            onButtonClicked: close
                        }), null, 16 /* FULL_PROPS */, ["title", "text"]))
                ]),
                _: 1 /* STABLE */
            }, 16 /* FULL_PROPS */, ["modelValue"]));
        };
    }
});

script$2.__file = "src/components/BottomSheet.vue";

class BottomSheets {
    static initContext() {
        PluginContext.getApp().config.globalProperties.$bottomSheet = {
            create: createBottomSheet,
            createList: createBottomSheetList,
        };
    }
}
function createBottomSheetList(items, options) {
    items.forEach((item) => {
        if (!isNotEmptyAndNotNull$2(item.title))
            throw new Error('title is required for each item');
        if (!isNotEmptyAndNotNull$2(item.value))
            throw new Error('value is required for each item');
    });
    return createBottomSheet({
        items,
        ...options,
    });
}
function createBottomSheet(options) {
    try {
        if (options.items && options.dialogOptions) {
            throw new Error('You can not use items and dialogOptions together');
        }
        if (options.dialogOptions) {
            if (!isNotEmptyAndNotNull$2(options.dialogOptions.title))
                throw new Error('title is required');
            if (!isNotEmptyAndNotNull$2(options.dialogOptions.text))
                throw new Error('text is required');
        }
        const div = document.createElement('div');
        return new Promise((resolve, reject) => {
            const props = {
                bottomSheetOptions: options?.bottomSheetOptions ?? PluginContext.getPluginOptions()?.defaults?.bottomSheet,
                dialogOptions: options?.dialogOptions,
                items: options?.items,
                title: options?.title,
                text: options?.text,
                onCloseBottomSheet: (value) => {
                    resolve(value);
                },
            };
            const vNode = h(script$2, props);
            vNode.appContext = PluginContext.getApp()._context;
            render(vNode, div);
        });
    }
    catch (err) {
        console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
    }
}
function isNotEmptyAndNotNull$2(value) {
    if (value === undefined || value === null)
        return false;
    return typeof value === 'boolean' ? true : value.trim().length > 0 && value !== '';
}

var script$1 = /*#__PURE__*/ defineComponent({
    __name: 'Dialog',
    props: {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        buttons: {
            type: Array,
        },
        icon: {
            type: String,
            default: ''
        },
        level: {
            type: String,
            default: 'info'
        },
        cardOptions: {
            type: Object,
            default: () => ({})
        },
        dialogOptions: {
            type: Object,
            default: () => ({})
        },
        customComponent: {
            type: Object,
            required: false
        },
        textHTML: {
            type: String,
            default: ''
        },
    },
    emits: ['closeDialog'],
    setup(__props, { emit: __emit }) {
        // ------- EVENTS -------
        const emit = __emit;
        // ------- DATA -------
        let showDialog = ref(true);
        // ------- METHODS -------
        function close(buttonKey) {
            showDialog.value = false;
            emit('closeDialog', buttonKey);
        }
        // ------- WATCH ---------
        watch((showDialog), (newValue) => {
            if (!newValue) {
                close(false);
            }
        });
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(unref(VDialog), mergeProps({
                class: "vuetify3-dialog-popup",
                modelValue: unref(showDialog),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (isRef(showDialog) ? (showDialog).value = $event : showDialog = $event))
            }, __props.dialogOptions), {
                default: withCtx(() => [
                    (__props.customComponent)
                        ? (openBlock(), createBlock(resolveDynamicComponent(__props.customComponent.component), mergeProps({ key: 0 }, __props.customComponent.props, {
                            onCloseDialog: close,
                            ref: "custom-component"
                        }), null, 16 /* FULL_PROPS */))
                        : (openBlock(), createBlock(script$3, mergeProps({ key: 1 }, __props.cardOptions, {
                            title: __props.title,
                            text: __props.text,
                            textHTML: __props.textHTML,
                            buttons: __props.buttons,
                            icon: __props.icon,
                            level: __props.level,
                            onButtonClicked: close
                        }), null, 16 /* FULL_PROPS */, ["title", "text", "textHTML", "buttons", "icon", "level"]))
                ]),
                _: 1 /* STABLE */
            }, 16 /* FULL_PROPS */, ["modelValue"]));
        };
    }
});

script$1.__file = "src/components/Dialog.vue";

class Dialogs {
    static initContext() {
        PluginContext.getApp().config.globalProperties.$dialog = {
            create: createDialog,
            confirm: confirmDialog,
            warning: warningDialog,
            error: errorDialog,
            info: infoDialog,
            success: successDialog,
        };
    }
}
function createDialog(options) {
    try {
        const div = document.createElement('div');
        if (!options.customComponent) {
            if (!isNotEmptyAndNotNull$1(options.title))
                throw new Error('title is required');
            if (!isNotEmptyAndNotNull$1(options.text) && !isNotEmptyAndNotNull$1(options.textHTML))
                throw new Error('text is required');
        }
        else {
            options.title = options.title ?? '';
            options.text = options.text ?? '';
            options.textHTML = options.textHTML ?? '';
        }
        if (options.buttons) {
            options.buttons.forEach(validateButton);
        }
        return new Promise((resolve, reject) => {
            const props = {
                title: options.title,
                text: options.text,
                textHTML: options.textHTML,
                buttons: options.buttons,
                icon: options.icon,
                level: options.level,
                customComponent: options.customComponent,
                dialogOptions: options.dialogOptions ??
                    PluginContext.getPluginOptions()?.defaults?.dialog?.component ?? {
                    width: '400px',
                },
                cardOptions: options.cardOptions ?? PluginContext.getPluginOptions()?.defaults?.dialog?.card ?? undefined,
                onCloseDialog: (value) => {
                    resolve(value);
                },
            };
            const vNode = h(script$1, props);
            vNode.appContext = PluginContext.getApp()._context;
            render(vNode, div);
        });
    }
    catch (err) {
        console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
    }
}
function warningDialog(options) {
    return createDialog({
        title: options.title ?? 'Warning',
        text: options.text,
        textHTML: options.textHTML,
        icon: options.icon,
        buttons: [{ key: 'ok', title: 'OK', color: 'warning', ...options.buttonOptions }],
        level: 'warning',
        cardOptions: options.cardOptions,
    });
}
function errorDialog(options) {
    return createDialog({
        title: options.title ?? 'Error',
        text: options.text,
        textHTML: options.textHTML,
        icon: options.icon,
        buttons: [{ key: 'ok', title: 'OK', color: 'error', ...options.buttonOptions }],
        level: 'error',
        cardOptions: options.cardOptions,
    });
}
function infoDialog(options) {
    return createDialog({
        title: options.title ?? 'Info',
        text: options.text,
        textHTML: options.textHTML,
        icon: options.icon,
        buttons: [{ key: 'ok', title: 'OK', color: 'info', ...options.buttonOptions }],
        level: 'info',
        cardOptions: options.cardOptions,
    });
}
function successDialog(options) {
    return createDialog({
        title: options.title ?? 'Success',
        text: options.text,
        textHTML: options.textHTML,
        icon: options.icon,
        buttons: [{ key: 'ok', title: 'OK', color: 'success', ...options.buttonOptions }],
        level: 'success',
        cardOptions: options.cardOptions,
    });
}
function confirmDialog(options) {
    return createDialog({
        title: options.title,
        text: options.text,
        textHTML: options.textHTML,
        buttons: [
            { key: false, title: options.cancelText ?? 'Cancel', color: 'grey', ...options.cancelButtonOptions },
            {
                key: true,
                title: options.confirmationText ?? 'Confirm',
                color: 'warning',
                ...options.confirmationButtonOptions,
            },
        ],
        icon: options.icon,
        level: options.level,
        cardOptions: options.cardOptions,
    });
}
function validateButton(button, index) {
    if (!button) {
        throw new Error(`button at index ${index} is not defined`);
    }
    if (!isNotEmptyAndNotNull$1(button.key)) {
        throw new Error(`button at index ${index} has no key`);
    }
    if (!isNotEmptyAndNotNull$1(button.title)) {
        throw new Error(`button at index ${index} has no title`);
    }
}
function isNotEmptyAndNotNull$1(value) {
    if (value === undefined || value === null)
        return false;
    return typeof value === 'boolean' ? true : value.trim().length > 0 && value !== '';
}

const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["innerHTML"];
var script = /*#__PURE__*/ defineComponent({
    __name: 'Snackbar',
    props: {
        text: {
            type: String,
            required: false
        },
        htmlContent: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: true
        },
        level: {
            type: String,
            default: 'info'
        },
        notifyOptions: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['closeSnackbar'],
    setup(__props, { emit: __emit }) {
        // ------- EVENTS -------
        const emit = __emit;
        // ------- DATA -------
        let showSnackbar = ref(true);
        // ------- METHODS -------
        function close() {
            showSnackbar.value = false;
            emit('closeSnackbar');
        }
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(unref(VLayout), null, {
                default: withCtx(() => [
                    createVNode(unref(VSnackbar), mergeProps({ class: "vuetify3-dialog-snackbar" }, __props.notifyOptions, {
                        modelValue: unref(showSnackbar),
                        "onUpdate:modelValue": [
                            _cache[0] || (_cache[0] = ($event) => (isRef(showSnackbar) ? (showSnackbar).value = $event : showSnackbar = $event)),
                            _cache[1] || (_cache[1] = ($event) => (close()))
                        ],
                        color: __props.level,
                        location: __props.location,
                        "location-strategy": "static",
                        dark: __props.level === 'warning' || __props.level === 'error'
                    }), {
                        default: withCtx(() => [
                            (__props.text)
                                ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(__props.text), 1 /* TEXT */))
                                : createCommentVNode("v-if", true),
                            (__props.htmlContent)
                                ? (openBlock(), createElementBlock("div", {
                                    key: 1,
                                    innerHTML: __props.htmlContent
                                }, null, 8 /* PROPS */, _hoisted_2))
                                : createCommentVNode("v-if", true)
                        ]),
                        _: 1 /* STABLE */
                    }, 16 /* FULL_PROPS */, ["modelValue", "color", "location", "dark"])
                ]),
                _: 1 /* STABLE */
            }));
        };
    }
});

script.__file = "src/components/Snackbar.vue";

class SnackBar {
    static initContext() {
        PluginContext.getApp().config.globalProperties.$notify = {
            create: createNotification,
            warning: notifyWarning,
            error: notifyError,
            info: notifyInfo,
            success: notifySuccess,
        };
    }
}
function notifyWarning(text, notifyOptions) {
    return createNotification({ text, level: 'warning', notifyOptions });
}
function notifyError(text, notifyOptions) {
    return createNotification({ text, level: 'error', notifyOptions });
}
function notifyInfo(text, notifyOptions) {
    return createNotification({ text, level: 'info', notifyOptions });
}
function notifySuccess(text, notifyOptions) {
    return createNotification({ text, level: 'success', notifyOptions });
}
function createNotification(options) {
    try {
        const potentialLocation = options.location ??
            options.notifyOptions?.location ??
            PluginContext.getPluginOptions()?.defaults?.notify?.location ??
            'top right';
        let locationY = potentialLocation.split(' ')[0] ?? 'top';
        let locationX = potentialLocation.split(' ')[1] ?? 'right';
        let div = document.createElement('div');
        if (!isNotEmptyAndNotNull(options.text) && !isNotEmptyAndNotNull(options.htmlContent))
            throw new Error('text or htmlContent is required');
        return new Promise((resolve, reject) => {
            const props = {
                text: options.text,
                htmlContent: options.htmlContent,
                level: options.level,
                location: potentialLocation,
                notifyOptions: options.notifyOptions ?? PluginContext.getPluginOptions()?.defaults?.notify,
                onCloseSnackbar: () => {
                    resolve(true);
                },
            };
            const vNode = h(script, props);
            vNode.appContext = PluginContext.getApp()._context;
            render(vNode, div);
            const vuetifyDivOverlay = document.querySelector('.v-overlay-container');
            let margin = 0;
            if (vuetifyDivOverlay?.childElementCount > 1) {
                for (let child of vuetifyDivOverlay.children) {
                    if (child === vuetifyDivOverlay.lastElementChild ||
                        !(child.classList.contains('v-snackbar--' + locationX) &&
                            child.classList.contains('v-snackbar--' + locationY)))
                        continue;
                    if (child.lastElementChild) {
                        margin += child.lastElementChild.offsetHeight + 12;
                    }
                }
            }
            if (margin > 0) {
                switch (locationY) {
                    case 'top':
                        (vuetifyDivOverlay?.lastElementChild).style.marginTop = `${margin + 12}px`;
                        break;
                    case 'bottom':
                        (vuetifyDivOverlay?.lastElementChild).style.marginBottom = `${margin + 12}px`;
                        break;
                    default:
                        throw new Error('location must be top or bottom');
                }
            }
        });
    }
    catch (err) {
        console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
    }
}
function isNotEmptyAndNotNull(value) {
    return value !== undefined && value !== null && value.trim().length > 0 && value !== '';
}

const Vuetify3Dialog = {
    install(app, options) {
        try {
            new PluginContext(app, options);
            Dialogs.initContext();
            SnackBar.initContext();
            BottomSheets.initContext();
        }
        catch (err) {
            console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
        }
    },
};

export { Vuetify3Dialog, confirmDialog, createBottomSheet, createBottomSheetList, createDialog, createNotification, errorDialog, infoDialog, notifyError, notifyInfo, notifySuccess, notifyWarning, successDialog, warningDialog };
//# sourceMappingURL=index.js.map
