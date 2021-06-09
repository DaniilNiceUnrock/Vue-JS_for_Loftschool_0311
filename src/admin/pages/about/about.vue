<template>
  <div class="about-page-component">
    <div class="page-content">
      <div class="container" v-if="categories.length >= 0">
        <div class="header">
          <div class="title">Блок "Обо мне"</div>
          <iconedbutton
            type="iconed"
            v-if="emptyCatIsShown === false"
            @click="emptyCatIsShown = true"
            title="Добавить группу"
          />
        </div>
        <ul class="skills">
          <li class="item" v-if="emptyCatIsShown">
            <category 
              @remove="emptyCatIsShow = false"
              @approve="createCategory"
              empty 
            />
          </li>
          <li class="item" v-for="category in categories" :key="category.id">
            <category 
              :title="category.category" 
              :skills="category.skills" 
              @remove="deleteCategory(category.id)"
              @approve="editCategory($event, category)"
              @create-skill="createSkill($event, category.id)"
              @edit-skill="editSkill"
              @remove-skill="removeSkill"
            />
          </li>
        </ul>
      </div>
      <div class="container" v-else>
        loading...
      </div>
    </div>
  </div>
</template>


<script>
import button from "../../components/button";
import category from "../../components/category";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    iconedbutton: button,
    category,
  },
  data() {
    return {
      emptyCatIsShown: false,
    };
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.data
    })
  },
  methods: {
    ...mapActions({
      fetchCategoriesAction: "categories/fetch",
      createCategoryAction: "categories/create",
      deleteCategoryAction: 'categories/deleteCategory',
      editCategoryAction: 'categories/editCategory',
      addSkillAction: "skills/add",
      removeSkillAction: "skills/remove",
      editSkillAction: "skills/edit",
      showTooltip: "tooltips/show"
    }),
    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId
      }
      try {
          await this.addSkillAction(newSkill);

          skill.title = "Новый навык";
          skill.percent = "0";
          
          this.showTooltip({
              text: "Навык успешно добавлен",
              type: "success"
          })
      } catch (error) {
          this.showTooltip({
              text: error.response.data.error,
              type: "error"
          })
      }
    },
    async removeSkill(skill) {
      try {
          await this.removeSkillAction(skill);          
          this.showTooltip({
              text: "Навык успешно удалён",
              type: "success"
          })
      } catch (error) {
          this.showTooltip({
              text: error.response.data.error,
              type: "error"
          })
      }
     
    },
    async editSkill(skill) {
      try {
          await this.editSkillAction(skill);   
          skill.editmode = false;      
          this.showTooltip({
              text: "Навык успешно изменён",
              type: "success"
          })
      } catch (error) {
          this.showTooltip({
              text: "Ошибка изменения скилла",
              type: "error"
          })
      }
      
    },
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCatIsShown = false;
        this.showTooltip({
              text: "Категория успешно создана",
              type: "success"
          })
      } catch (error) {
        this.showTooltip ({
              text: "Ошибка создания категории",
              type: "error"
        })
      }
    },
    async deleteCategory(id) {
        try {
            await this.deleteCategoryAction(id);
            this.showTooltip({
                text: "Категория успешно удалена",
                type: "success"
            })
        } catch (error) {
            this.showTooltip({
                text: "Ошбика Удаления категории",
                type: "error"
            })
        }            
    },
    async editCategory(title, category) {
        try {
            category.title = title;
            await this.editCategoryAction(category);
            this.editmode = false;

            this.showTooltip({
                text: "Категория успешно изменена",
                type: "success"
            })
        } catch (error) {
            this.showTooltip({
                text: error.response.data.error,
                type: "error"
            })
        }
    },
  },
  created() {
    this.fetchCategoriesAction();
  },
};
</script>

<style lang="postcss" scoped src="../../app.pcss">
</style>