<template>
    <!-- модальное окно при покупке товара -->
    <div  class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div style="width: 100%;" v-show="!purchase">
            <div class="modal-header">
              <h2>Заполните данные</h2>
            </div>
            <!-- полля для ввода информации клиента -->
            <div class="modal-body">
              <v-text-field 
              v-model="name" 
              :rules="[rules.required, rules.counter]" 
              clearable 
              label="Ваше ФИО" 
              variant="outlined" 
              autofocus 
              class="mb-2"
               ></v-text-field>
                <v-select
                v-model="delivery"
               :items="items"
                label="Способ доставки"
                variant="outlined"
                ></v-select>
              <v-text-field 
              v-model="tel" 
              :rules="[rules.phone, rules.required]" 
              clearable 
              label="Номер телефона" 
              variant="outlined" 
              type="tel"
              prefix="+7"
              ></v-text-field>

              <v-text-field 
              v-model="email" 
              :rules="[rules.email, rules.required]" 
              clearable 
              label="Email" 
              variant="outlined" 
              placeholder="johndoe@gmail.com"
              ></v-text-field>

              <v-text-field 
              v-model="adress" 
              :rules="[rules.required, rules.counter]"
              clearable label="Адрес" 
              variant="outlined"
              ></v-text-field>

                            
            </div>
            <!-- кнопки для отмены покупки и для покупки товара -->
            <div class="modal-footer">
              <v-btn @click="openModel">
                Отмена
              </v-btn>
              <v-btn @click="postData">
                Оплатить
              </v-btn>
            </div>
          </div>
          <!-- диалоговое окно при успешной покупке -->
          <v-container v-show="purchase">
            Cпасибо, что выбрали нас!
          </v-container>
        </div>
        
      </div>
    </div>
</template>

<script>
import { useProductStore } from '../../stores/ProductStore.js';
import { mapActions } from 'pinia';
import axios from 'axios';

    export default {
        name: 'modal-window',
        data()  {
          return {
            items: ['Самовывоз', 'При доставке'],
            purchase: false,
            name: '',
            tel: '',
            email: '',
            adress: '',
            delivery: '',
            // правила для заполнения форм
            rules: {
              required: value => !!value || 'Поле обязательно к заполнению',
              counter: value => value.length <= 30 || 'Максимальное число символов 30',
              email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Должен быть действующий адрес электронной почты.'
              },
              phone: value => {
                if (value?.length > 9 && /[0-9-]+/.test(value)) return true
                return 'Номер телефона должен состоять не менее чем из 9 цифр.'
              },
            },
          }
        },
        props: {
          optionShow: {
            type: Boolean
          },
          productCard: {
            type: Array,
            default: () => []
          }
        },
        methods: {
          openModel() {
            this.$emit('showModalWindow', this.optionShow)
          },
          ...mapActions(useProductStore, ['clearCard']),
          // функция отвечающая за отправку формы на сервер
          async postData() {
            if (this.name !== '' && this.email !== '' && this.adress !== '') {
              await axios.post('http://localhost:3000/zakaz', {
                name: this.name,
                tel: this.tel,
                email: this.email,
                adress: this.adress,
                prod: this.productCard,
                state: false,
                delivery: this.delivery,
              });
              setTimeout(this.modalClose)
              setTimeout(this.openModel, 2000)
              setTimeout(this.clearCard, 2000)
              

            } else {
              alert('Вы не заполнили поле!')
            }
          },
          // функция отвечающая за открытие или закрытие модального окна
          modalClose() {
            this.purchase = !this.purchase
          }
        }
    }
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h2 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
}
/* .modal-body input {
  height: 30px;
  margin: 20px 0px;
} */
/* .modal-default-button {
  float: right;
} */
.modal-enter {
  opacity: 0;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>