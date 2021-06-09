import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import $axios from "./requests";
import header from "./components/header";
import about from "./pages/about";
import works from "./pages/works";
import reviews from "./pages/reviews";
import login from "./pages/login";
import store from "./store";


const routes = [
  {
    path: "/login",
    component: login,
    meta: {
        public: true
    }
  },
  {
    path: "/",
    components: {
      default: about,
      header: header
    },
    meta: {
        title: "Обо мне"
    }
  },
  {
    path: "/works",
    components: {
        default: works,
        header: header
    },
    meta: {
        title: "Работы"
    }
  },
  {
    path: "/reviews",
    components: {
        default: reviews,
        header: header
    },
    meta: {
        title: "Отзывы",
    }
  },
  
];

const router = new VueRouter({ routes });

 

router.beforeEach(async (to, from, next) => {   // router публичный, если есть  public

  const isPublicRoute = to.matched.some(record => record.meta.public); // записываем паблик
  const isUserLogged = store.getters["user/userIsLogged"]; //  в сторе выполняем запрос на производное состояние  и записываем его 
  
  console.warn(isPublicRoute); // должно быть true
  console.log('_____________');
  console.warn(isUserLogged);
  
  if (!isUserLogged) { // go prev();
    const token = localStorage.getItem('token'); // если пользователь авторизован то записываем в лс токен (получаем !false), то есть токен должен быть, если нет 
    
      console.warn('token:'+ token); // проверяем есть ли в токене token, если нет и адрес публичный true
     
      if (!token && isPublicRoute) {  
          console.warn('isPublicRoute:'+ isPublicRoute);
          next();
      } else if (token) {  // если же токен у нас есть
          console.warn('ТОКЕН ЕСТЬ! переход на страницу админки');

          $axios.defaults.headers['Authorization'] = `Bearer ${ token }`; // проходим авторизцию
      
          try { // при успешной 
              const response = await $axios.get('/user');  // получаем по запросу {user_id} - можно получить из запроса на /user (предоставив токен) (он у нас есть)

              store.commit("user/SET_USER", response.data.user); // добавляем юзера и если всё ок ->

              console.warn('Пользователь добавлен успешно'); //(путь )

              next();

              if(from.path === "/login")  {
                next()
              }
              else {
                next({ path: from.path });
              }
              // если же пользователь захочет нажать назад и попасть на авторизацию, можно по сути и пушить, но пускай так
          } catch (error) {  // если ошибка, то перекидываем пользователя на авторизацю предварительно удалив токен
              console.warn('перекидываем пользователя на авторизацю предварительно удалив токен');
              localStorage.removeItem('token');
              next('/login');
          }
      } else { // если нет токена
          console.warn('когда токен попросту не найден');
          next('/login'); //ведём на авторизацию  
      }
  } else if (isPublicRoute && isUserLogged) { // если всё норм, то пускай переходы по страницам будут !
      next({ path: from.path });
  } else {
      next();
  }
});

export default router;