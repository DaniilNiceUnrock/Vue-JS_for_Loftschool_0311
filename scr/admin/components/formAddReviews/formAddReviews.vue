<template>
    <div class="form-reviews-component">
        <form @submit.prevent="handleSubmit" class="form">
            <card title="Новый отзыв" slot="content" >
                <div class="form-container" slot="content">
                    <div class="form-data">
                        <div class="upload-image">
                            <app-input :error-message="validation.firstError('newReview.preview')" />
                            <label 
                                :error-message="validation.firstError('newReview.preview')"
                                :style="{backgroundImage: `url(${newReview.preview})`}"
                                :class="[ 'uploader', {active: newReview.preview}, { hovered: hovered }]"
                                @dragover="handleDragOver"
                                @dragleave="hovered = false"
                                @drop="handleChange"
                            >
                            </label>
                            <div class="uploader-btn">
                                <app-button class="plain"
                                    title="Добавить фото"
                                    typeAttr="file" 
                                    @change="handleChange" />
                            </div>
                        </div>
                        <div class="form-inputs">
                            <div class="form-row-inputs">
                                <app-input 
                                    title="Имя автора" 
                                    v-model="newReview.author"
                                    :error-message="validation.firstError('newReview.author')"
                                />                            
                                <app-input
                                    title="Титул автора" 
                                    v-model="newReview.occ"
                                    :error-message="validation.firstError('newReview.occ')"
                                />
                            </div>
                            <div class="form-row">
                                <app-input 
                                    title="Отзыв" 
                                    field-type="textarea" 
                                    v-model="newReview.text"
                                    :error-message="validation.firstError('newReview.text')"
                                />                             
                            </div>
                        </div>
                    </div>
                    <div class="form-buttons">
                        <app-button title="Отмена" @click="$emit('close', $event)" class="plain" />
                        <app-button title="Сохранить" :disabled="isSubmitDisabled"/>
                    </div>  
                </div>
            </card> 
        </form>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import card from "../card";
import appButton from "../button";
import appInput from "../input";

export default {
    components: { 
        card, 
        appButton, 
        appInput
    },
    props: {
        currentReview: {
            type: Object | null,
            default: null
        }
    },
    mixins: [ValidatorMixin],
    validators: {
        "newReview.author": value => {
            return Validator.value(value).required("Введите имя");
        },
        "newReview.text": value => {
            return Validator.value(value).required("Введите текст отзыва");
        },
        "newReview.occ": value => {
            return Validator.value(value).required("Введите автора");
        } ,
        "newReview.preview": value => {
            return Validator.value(value).required("Загрузите картинку");
        }
    },
    data() {
        return {
            hovered: false,
            newReview: {
                author: "",
                occ: "",
                text: "",
                photo: {},
                preview: "",
            },
            isSubmitDisabled: false,
        };
    },
    watch: {
        currentReview() {
            this.setReview();
        }
    },
    created() {
        this.setReview();
    },
    methods: {
            ...mapActions({
            addNewReview: "reviews/add",
            editReview: "reviews/edit",
            showTooltip: "tooltips/show"
        }),
        setReview() {
            if(this.currentReview) {
                this.newReview = { ...this.currentReview };
            } else {
                this.newReview = {
                author: "",
                occ: "",
                text: "",
                photo: {},
                preview: "",
            }
            }
        },
        handleDragOver(e) {
            e.preventDefault();
            this.hovered = true;
        },
        async handleSubmit() {
            if(await this.$validate()) {
                if(!this.newReview.id) {
                    try {
                        await this.addNewReview(this.newReview);
                        this.showTooltip({
                            text: "Отзыв успешно добавлен",
                            type: "success"
                        });
                        this.$emit('close');
                    } catch (error) {
                        this.showTooltip({
                            text: "Произошла ошибка",
                            type: "error"
                        })
                    }
                } else {
                    await this.editReview(this.newReview);
                    this.showTooltip({
                            text: "Отзыв успешно изменен",
                            type: "success"
                        });
                    this.$emit('close');
                }
            }
        },
        handleChange(event) {
            event.preventDefault();
            const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

            this.newReview.photo = file;
            this.renderPhoto(file);
            this.hovered = false;
        },
        renderPhoto(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.newReview.preview = reader.result;
            };
        },
    },
};
</script>

<style lang="postcss" scoped>
.form-reviews-component {
    margin-bottom: 30px;
}
.form-data {
  display: flex;
  padding: 0 33px;
}

.form-col {
  width: 50%;
  margin-right: 30px;

  &:last-child {
    margin-right: 0;
  }
}

.upload-image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 30px;
}

.uploader {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    background: #dee4ed;
    border: 1px dashed #a1a1a1;
    position: relative;
    background-size: cover;
    margin-bottom: 30px;

    &.hovered {
        border-color: blue;
    }
}

.form-inputs {
    flex-grow: 1;
}

.form-row-inputs {
    display: flex;
    justify-content: space-between;
}

.form-row,
.form-row-inputs {
  margin-bottom: 30px;
}

.input {
    width: 48%;
}

.form-buttons {
    display: flex;
    justify-content: flex-end;
    padding-right: 33px;

    &.cancel {
        color: grey;
    }
}

.btn {
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
}

.upload-image>.input {
    height: 0;
    border: none;
}

.form-buttons .cancel-btn.default-btn-container {
    color: grey;
}
</style>