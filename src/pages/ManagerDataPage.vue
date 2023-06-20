<template>
  <!-- таблица товара -->
  <v-data-table
    :headers="gridColumns"
    :items="products"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>База данных</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <!-- изменение товара -->
        <v-dialog
          v-model="dialogChange"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Карточка товара</span>
            </v-card-title>
            
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.id"
                      label="Артикул"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Товар"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.category"
                      label="Категория"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.img"
                      label="Изображение"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      label="Цена"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.quantity"
                      label="Колличество"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.body"
                      label="Описание"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Отмена
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- добавление товара -->
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              dark
              class="mb-2"
              v-bind="props"
            >
              Добавить товар
            </v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="text-h5">Карточка товара</span>
            </v-card-title>
            
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Товар"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.category"
                      label="Категория"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.img"
                      label="Изображение"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      label="Цена"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.quantity"
                      label="Колличество"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.body"
                      label="Описание"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Отмена
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="postData"
              >
                Добавить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Удаление товара -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Вы точно хотите удалить товар?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Отмена</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Удалить</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- Изменение или дулание продукта -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon 
        size="small"
        class="me-2"
        @click="changeProduct(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteProduct(item.raw)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { VDataTable } from 'vuetify/lib/labs/VDataTable';
import { useManagerStore } from '../stores/ManagerStore.js';
import { useProductStore } from '../stores/ProductStore.js';
import { mapState, mapActions } from 'pinia';

  export default {
    components: {
      VDataTable
    },
    data: () => ({
      isLoaded: false,
      dialogChange: false,
      dialog: false,
      dialogDelete: false,
      dialogId: null,
      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        category: '',
        img: '',
        price: null,
        quantity: null,
        body: ''
      },
      defaultItem: {
        id: '',
        name: '',
        category: '',
        price: '',
        quantity: '',
      },
    }),
    computed: {
      ...mapState(useManagerStore, ['gridColumns']),
      ...mapState(useProductStore, ['products']),
    },
    // модальные окна
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods: {
      ...mapActions(useProductStore, ['getData', 'pushProduct', 'saveProduct', 'delProduct' ]),
      // изменение товара
      changeProduct(item) {
        this.editedItem = Object.assign({}, item);
        this.dialogChange = true;
      },
      // удалить товар
      deleteItemConfirm () {
        this.delProduct(this.dialogId);
        this.closeDelete();
        this.dialogId = null;
      },
      //вызов модального окна удаление товара
      async deleteProduct(item) {
        this.dialogId = item.id;
        this.dialogDelete = true;
      },  
      close () {
        this.dialogChange = false;
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      // закрыть диалог
      closeDelete () {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      // сохранить товар
      async save () {
        this.saveProduct(this.editedItem);
        this.dialogChange = false;
        this.close();
      },
      // добавление товара
      async postData() {
        this.pushProduct(this.editedItem);
        this.close();
      },
    },
    async mounted() {
        this.isLoaded = true;
        this.getData();
        this.isLoaded = false;
    },
    
  }
</script>