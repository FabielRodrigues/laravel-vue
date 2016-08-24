/**
 * Created by fabielrodrigues on 11/08/2016.
 */

Vue.filter('doneLabel', function (value) {

    if (value == 0) {
        return "Não paga";
    } else {
        return "Paga";
    }

});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a pagar";
    } else {
        return "Existem "+ value +" contas a pagar";
    }
});

var menuComponent = Vue.extend({
    template: `<nav class="navbar navbar-default"">
                <ul class="nav navbar-nav">
                    <li v-for="o in menus">
                        <a v-on:click.prevent="showView(o.id)">{{ o.name }}</a>
                    </li>
                </ul>
            </nav>`,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Listar contas"},
                {id: 1, name: "Criar conta"}
            ],
        };
    },
    methods: {
        showView: function (id) {
            this.$parent.activedView = id;
            if (id == 1) {
                this.$parent.formType = 'insert';
            }
        },
    }
});


Vue.component('menu-component', menuComponent);

var appComponent = Vue.extend({
    template: `
     <section>
        <div class="container">

            <div class="row">
                <h1 class="text-center">{{ title }}</h1>
                <h3 class="{'status': vazio === false, 'status': pago === 0, 'status': status > 0 }">{{ status | statusGeneral }}</h3>
            </div>

            
            <menu-component></menu-component>
            <div class="row">
                <div v-if="activedView == 0">

                    <table class="table table-responsive table-striped" border="1" cellpadding="10">
                        <thead>
                        <tr>

                            <th>#</th>
                            <th>Vencimento</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Paga?</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(index, o) in bills">
                            <td>{{ index + 1 }}</td>
                            <td>{{ o.data_due }}</td>
                            <td>{{ o.name }}</td>
                            <td>{{ o.value | currency 'R$ ' 2 }}</td>
                            <td class="status text-center" :class="{ 'pago': o.done, 'nao-pago': !o.done }">{{ o.done | doneLabel }}</td>
                            <td>
                                <a href="#" @click.prevent="loadBill(o)" class="btn btn-warning btn-sm">Editar</a> |
                                <a href="#" @click.prevetn="deleteBill(o)" class="btn btn-danger btn-sm">Delete</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>

                <div v-if="activedView == 1">

                    <form name="form">
                        <div class="form-group">
                            <label>Nome:</label>
                            <select v-model="bill.name" class="form-control">
                                <option v-for="o in names">{{ o.name }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Vencimento:</label>
                            <input type="text" v-model="bill.data_due" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Valor:</label>
                            <input type="text" v-model="bill.value" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Pago?</label>
                            <input type="checkbox" v-model="bill.done">
                        </div>
                        <div class="form-group">
                            <input type="button" v-on:click="submit" class="btn btn-success" value="Enviar" >
                        </div>

                    </form>

                </div>

            </div>

        </div>

    </section>
`,
    data:  function(){
        return {
            title: "Contas a pagar",
            activedView: 0,
            formType: 'insert',
            bill: {
                data_due: '',
                name: '',
                value: 0,
                done: false
            }
            ,
            names: [
                {name: "Conta de luz"},
                {name: "Conta de Água"},
                {name: "Conta de Telefone"},
                {name: "Supermercado"},
                {name: "Cartão de crédito"},
                {name: "Empréstimo"},
                {name: "Gasolina"}
            ],
            bills: [
                {data_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
                {data_due: '21/08/2016', name: 'Conta de água', value: 40.99, done: false},
                {data_due: '22/08/2016', name: 'Conda de telefone', value: 76.99, done: false},
                {data_due: '23/08/2016', name: 'Supermercado', value: 713.99, done: false},
                {data_due: '24/08/2016', name: 'Cartão de crédito', value: 500.25, done: false},
                {data_due: '25/08/2016', name: 'Empréstimo', value: 200.99, done: false},
                {data_due: '26/08/2016', name: 'Gasolina', value: 400.99, done: false}
            ]
        };
    },
    computed: {
        status: function () {
            if (!this.bills.length) {
                return false;
            }
            var count = 0;
            for(var i in this.bills){
                if(!this.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },
    methods: {
        submit: function () {

            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            this.bill =  {
                data_due: '',
                name:     '',
                value: 0,
                done: false
            };

            this.activedView = 0;
        },
        loadBill: function (bill) {

            this.bill = bill;

            this.activedView = 1;

            this.formType = 'update';

        },
        deleteBill: function (bill) {

            var index = this.bills.indexOf(bill);

            var confirmBox = confirm("Você tem certeza que quer deletar?");

            if(confirmBox) {
                if (index !== -1) {
                    this.bills.splice(index, 1);
                }
            }

            this.activedView = 0;

        },
        pagarBill: function (bill) {

            this.bill = bill;

            this.bill =  {
                data_due: '',
                name:     '',
                value: 0,
                done: 0
            };

            this.activedView = 0;

        }
    }
});
Vue.component('app-component', appComponent);
var app = new Vue({
    el: "#app",
});






