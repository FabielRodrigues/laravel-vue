/**
 * Created by fabielrodrigues on 11/08/2016.
 */
var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        menus: [
            {id: 0, name:"Listar contas"},
            {id: 1, name:"Criar conta"}
        ],
        activedView: 0,
        formType: 'insert',
        bill: {
          data_due: '',
            name:     '',
            value: 0,
            done: 0
        },
        names: [
            { name: "Conta de luz" },
            { name: "Conta de Água" },
            { name: "Conta de Telefone" },
            { name: "Supermercado" },
            { name: "Cartão de crédito" },
            { name: "Empréstimo" },
            { name: "Gasolina" }
        ],
        bills: [
            { data_due: '20/08/2016', name: 'Conta de luz', value: 70.99 , done: 1},
            { data_due: '21/08/2016', name: 'Conta de água', value: 40.99 , done: 0},
            { data_due: '22/08/2016', name: 'Conda de telefone', value: 76.99 , done: 0},
            { data_due: '23/08/2016', name: 'Supermercado', value: 713.99 , done: 0},
            { data_due: '24/08/2016', name: 'Cartão de crédito', value: 500.25 , done: 0},
            { data_due: '25/08/2016', name: 'Empréstimo', value: 200.99 , done: 0},
            { data_due: '26/08/2016', name: 'Gasolina', value: 400.99 , done: 0}
        ]
    },
    computed: {
        status: function () {
            var count = 0;
            for(var i in this.bills){
                if(!this.bills[i].done) {
                    count++;
                }
            }
            return !count?"Nenhuma conta a pagar":"Existem " + count+ " contas a serem pagas.";
        }
    },
    methods: {
        showView: function (id) {
            this.activedView = id;
            if(id == 1) {
                this.formType = 'insert';
            }
        },
        submit: function () {

            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            this.bill =  {
                data_due: '',
                name:     '',
                value: 0,
                done: 0
            };

            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        }
    }
});

    Vue.filter('doneLabel', function (value) {

        if (value == 0) {
            return "Não paga";
        } else {
            return "Paga";
        }

    });

app.$watch('teste', function (novoValor, velhoValor) {
    console.log("velhoValor: "+ velhoValor +", novo valor:", + novoValor);
});


