var $form_data = $("#wf-form-Calc-Form");
var $final_price = $('#FinalPrice');
var $base_price = $('#BasePrice');
var $comfort = $('#Tariff01Price');
var $maximum = $('#Tariff02Price');
var $gos_price = $('#GozPrice');
var send= true;

var $formMail = $("#wf-form-ModalContacts");

// Замыкание
(function() {
    /**
     * Корректировка округления десятичных дробей.
     *
     * @param {String}  type  Тип корректировки.
     * @param {Number}  value Число.
     * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
     * @returns {Number} Скорректированное значение.
     */
    function decimalAdjust(type, value, exp) {
      // Если степень не определена, либо равна нулю...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
      }
      value = +value;
      exp = +exp;
      // Если значение не является числом, либо степень не является целым числом...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // Сдвиг разрядов
      value = value.toString().split('e');
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
      // Обратный сдвиг
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }
  
    // Десятичное округление к ближайшему
    if (!Math.round10) {
      Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp);
      };
    }
    // Десятичное округление вниз
    if (!Math.floor10) {
      Math.floor10 = function(value, exp) {
        return decimalAdjust('floor', value, exp);
      };
    }
    // Десятичное округление вверх
    if (!Math.ceil10) {
      Math.ceil10 = function(value, exp) {
        return decimalAdjust('ceil', value, exp);
      };
    }
  })();
var calculate ={
    init:function(){
        console.log('init');
        // $(document).on('click','#tariff01',function(e){
        //     e.preventDefault();

        // })
        $('input[type=radio]').change(function() {
           calculate.render();
        });
        $('input[type=checkbox]').change(function() {
            
         });

        $('select').on('change', function() {
            calculate.render();
        });

        $('#GozOption').change(function() {
            calculate.render();
         });
        
        $('#tariff01').change(function() {
            $('#tariff02').prop('checked', false);
            calculate.render();
         });
         $('#tariff02').change(function() {
            $('#tariff01').prop('checked', false);
            calculate.render();
         });
         
         $('#Calc-Number').mask(
            "+7(999) 999 99 99"
        );
        $('#Phone').mask(
            "+7(999) 999 99 99"
        );
        $('#Phone-Lastform').mask(
            "+7(999) 999 99 99"
        );
        
        
         $(document).on('click','#Calc-ResultButton',function(e){
            e.preventDefault();
            console.log('Отправка ........');
            calculate.sendMail();
        });
        $(document).on('click','#Button-Calculator',function(e){
            console.log('open')
            $('#hmtl_free').val('0');
            $('#hmtl_null').val('0');
            $('#wf-form-ModalContacts').show();
            $('#wf-form-ModalContacts').next().hide();
            $('#wf-form-ModalContacts').next().next().hide();
        });
        
        $(document).on('click','#Callme-Button-LastForm',function(e){
            e.preventDefault();
            console.log('Отправка ........');
            calculate.sendMailContact();
        });
        
        $(document).on('click','#wf-form-Email-SendPrice a',function(e){
            e.preventDefault();
            console.log('Отправка ........');
            $form = $('#wf-form-Email-SendPrice')
            calculate.sendShortContact($form);
        });
        $(document).on('click','#wf-form-Email-SendPrice-1 a',function(e){
            e.preventDefault();
            console.log('Отправка ........');
            $form = $('#wf-form-Email-SendPrice-1')
            calculate.sendShortContact($form);
        });
        $(document).on('click','#wf-form-Email-SendPrice-2 a',function(e){
            e.preventDefault();
            console.log('Отправка ........');
            $form = $('#wf-form-Email-SendPrice-2')
            calculate.sendShortContact($form);
        });
        $(document).on('click','#wf-form-Email-SendPrice-3 a',function(e){
            e.preventDefault();
            console.log('Отправка ........');
            $form = $('#wf-form-Email-SendPrice-3')
            calculate.sendShortContact($form);
        });
        $(document).on('click','#wf-form-Email-SendPrice-4 a',function(e){
            e.preventDefault();
            console.log('Отправка ........');
            $form = $('#wf-form-Email-SendPrice-4')
            calculate.sendShortContact($form);
        });
        $(document).on('click','#Button-Express',function(e){
            console.log('Express');
            $('#hmtl_free').val('1');
            $('#hmtl_null').val('0');
        });
        $(document).on('click','#Button-Zero',function(e){
            console.log('Express');
            $('#hmtl_free').val('0');
            $('#hmtl_null').val('1');
        });


        calculate.render();
    },
    render:function(){
        ym(67584547,'reachGoal','calc');
        gtag('event', 'calc', {'event_category': 'click', 'event_action': 'calc'});

        var data = $form_data.serializeArray();  
        var _count_employer = 1;
        var _count_operation = '1-30';
        var _tax = "OSNO";
        var _tarif = "Baza";
        var _goz    = 0;

        var html = "<p>Указали в калькуляторе:</p>";
        $.each(data, function(key, val) {
            console.log(val);
            if(val.name === "EmployeesCount"){
                _count_employer =   val.value
            }
            if(val.name === "OperationsCount"){
                _count_operation =   val.value
            }
            if(val.name === "TaxType"){
                _tax =   val.value
            }
            if(val.name === "TariffPack"){
                _tarif =   val.value
            } 
            if(val.name === "TariffPack"){
                _tarif =   val.value
            } 
            if(val.name === "Goz"){
                _goz =  1
            } 
            
        });

        console.log('Количество сотрудников:' + _count_employer);
        console.log('Количество операций:' + _count_operation);
        console.log('Система налогооблажения:' + _tax);
        console.log('Тариф: :' + _tarif);
        console.log('Гос: :' + _goz);


        console.log(data);

        var final_price = 0;
        //A Комплексное бухгалтерское обслуживание (БАЗА) = 10450
        var _baza = 5950;
        var _OSNO = [   [10750, 11750, 13000], 
                        [17750, 18750, 20000],
                        [35250, 36250, 37500],
                        [70250, 71250, 72500],
                        []
                    ]
        var _USN6 = [   [5950, 6950, 8200], 
                        [9750, 10750, 12000],
                        [19250, 20250, 21500],
                        [38250, 39250, 40500],
                        []
                    ];
        var _USN15 =[   [6250, 7250, 8500], 
                        [10250, 11250, 12500],
                        [20250, 21250, 22500],
                        [40250, 41250, 42500],
                        []
                    ];
        
        //вычисляем базу
      

        
       
        switch (_count_employer) {
            case '0':
                html += '<p>Количество сотрудников: 1</p>';
                $('#hmtl_employee').val('1');
                break;
            case '1':
                html += '<p>Количество сотрудников: 2-5</p>';
                $('#hmtl_employee').val('2-5');
                    break;
            case '2':
                html += '<p>Количество сотрудников: 6-10</p>';
                $('#hmtl_employee').val('6-10');
                    break;
            case '3':
                html += '<p>Количество сотрудников: 10+</p>';
                $('#hmtl_employee').val('10+');
                    break;
            default:
                html += '<p>Количество сотрудников: 1</p>';
                $('#hmtl_employee').val('1');
                break;
        }
        switch (_count_operation) {
            case '0':
                html += '<p>Количество операций: 1-30 </p>';
                $('#hmtl_operation').val('1-30');
                break;
            case '1':
                html += '<p>Количество операций: 31-50 </p>';
                $('#hmtl_operation').val('31-50');
                    break;
            case '2':
                html += '<p>Количество операций: 51-100 </p>';
                $('#hmtl_operation').val('51-100');
                    break;
            case '3':
                html += '<p>Количество операций: 101-200 </p>';
                $('#hmtl_operation').val('101-200');
                    break;
            case '4':
                html += '<p>Количество операций: 200+ </p>';
                $('#hmtl_operation').val('200+');
                    break;
            default:
                html += '<p>Количество операций: 1-30 </p>';
                $('#hmtl_operation').val('1-30');
                break;
        }
        
        html += '<p>Система налогооблажения: ' + _tax + '</p>';
        $('#hmtl_tax').val(_tax);
        html += '<p>Тариф: ' + _tarif + '</p>';
        $('#hmtl_tarif').val(_tarif);
        $('#hmtl_gos').val(0);
        if(_goz){
            html += '<p>ГОЗ: включено</p>';
            $('#hmtl_gos').val(1);
        }
        //html

        



        console.log(html)    
        
        switch (_tax) {
            case 'OSNO':
               _baza = _OSNO[_count_operation][_count_employer];
                break;
            case 'USN6':
                _baza = _USN6[_count_operation][_count_employer];
                    break;
            case 'USN15':
                _baza = _USN15[_count_operation][_count_employer];
                    break;
            default:
                _baza = _OSNO[_count_operation][_count_employer];
                break;
        }
       
        //F1 открытие/закрытие счета, включено 3 операции
        var _F1 = 1550;
        switch (_tarif) {
            case 'Comfort':
                _F1 = 1550;
                break;
            case 'Maximum':
                _F1 = 1550;
                    break;
            default:
                _F1 = 0;
                break;
        }
       
        //F3 Ведение операций в системе "клиент-банк" по контрагентам (зависит от кол операций)
        var _F3 = [765,1275,2550,5100];
            _F3 = _F3[_count_operation];
        //если тариф "Включено"
        //E1 сбор первичных бухгалтерских документов от контрагентов клиента
        var _E1 = [2100,3500,7000,14000];
            _E1 = _E1[_count_operation];
        //E2 хранение и архивация документов в офисе Исполнителя
        var _E2 = 0;

        if(_tarif === 'Maximum'){
            _E2 = 1200;
        }
        

        //вычислим для отрисовки стоимости тарифов
        switch (_tarif) {
            case 'Comfort':
                final_price = _baza * .95  + _F1 + _F3;
                break;
            case 'Maximum':
                final_price = _baza * .95  + _F1 + _F3 + _E1 +_E2;
                break;
            default:
                final_price = _baza;
                break;
        } 
        
        var _amount_gos = .25*final_price;
        if(_goz){
            final_price+=_amount_gos;
        }

        _amount_gos = Math.round10(_amount_gos,1).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        if(_amount_gos === 'NaN'){
            _amount_gos = 'Под запрос';
            $gos_price.html(_amount_gos).next().css({'display':'none'});
        }else{
            $gos_price.html('+'+_amount_gos).next().css({'display':'block'});
        }
        
        
       
        
        console.log('==========================');
        _F1 = 1550;
        _E2 = 1200;
        var amount_comfort = _baza * .95  + _F1 + _F3;
        var amount_max = _baza * .95  + _F1 + _F3 + _E1 +_E2;
            console.log("_baza" +_baza);
            console.log("amount_comfort" + amount_comfort);
            console.log("amount_max" + amount_max);
            amount_comfort = amount_comfort - _baza;
            amount_max = amount_max - _baza;

        _baza = Math.round(_baza).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

        if(_baza === 'NaN'){
            _baza = 'Под запрос'
            $base_price.html(_baza).next().css({'display':'none'})
        }else{
            $base_price.html(_baza).next().css({'display':'block'})
        }
        

        // ---
       
        _comfort = Math.round10(amount_comfort,1).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
       
        if(_comfort === 'NaN'){
            _comfort = 'Под запрос'
            $comfort.html(_comfort).next().css({'display':'none'})
        }else{

            $comfort.html('+ '+_comfort).next().css({'display':'block'})
        }
        // ----
        _maximum = Math.round10(amount_max,1).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        if(_maximum === 'NaN'){
            _maximum = 'Под запрос'
            $maximum.html(_maximum).next().css({'display':'none'})
        }else{
            $maximum.html('+ '+_maximum).next().css({'display':'block'})
        }
        

        // ----
        console.log(final_price);

        if(_tarif === 'Baza'){
            final_price = Math.round(final_price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        }else{
            final_price = Math.round10(final_price,1).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
        }
       
        if(final_price === 'NaN'){
            final_price = 'Под запрос'
            $final_price.html(final_price).next().css({'display':'none'})
        }else{
            $final_price.html(final_price).next().css({'display':'block'})
        }
        
    },
    sendMail:function(){
        var data = $('#wf-form-ModalContacts').serialize();
        var url = 'https://vediverno.ru/send.php';
        // var _this = $form_vote;
       
        if (send) {
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                beforeSend: function() {
                    send = false;
                },
                complete: function() {

                },
                success: function(obj) {
                    send = true;
                    $('#wf-form-ModalContacts').next().hide();
                    $('#wf-form-ModalContacts').next().next().hide();
                    //очишаем все help-block
                    //_this.find('.validate-js').removeClass('is-invalid').addClass('is-valid').next().empty();
                    if (obj['success']) {
                        ym(67584547,'reachGoal','zayavka');
                        gtag('event', 'zayavka', {'event_category': 'zayavka', 'event_action': 'sent'});
                        // if(obj['phone']){
                        //     _this.addClass('d-none').next().removeClass('d-none');
                        // }else{
                        //     _this.addClass('d-none').next().next().removeClass('d-none');
                        // }
                        $('#wf-form-ModalContacts').hide().next().show()

                    } else {
                        $('#wf-form-ModalContacts').next().next().show()
                        //обкат ошибок
                        // $.each(obj['error'], function(key, val) {
                        //     //console.log(obj['error'][key]);
                        //     if (obj['error'][key]) {
                        //         _this.find('#' + key).removeClass('is-valid').addClass('is-invalid').next().html(val);
                        //     }
                        // });
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText + "\r\n" + xhr);
                }
            });
        }
    },
    sendMailContact:function(){
        
        var data = $('#wf-form-Feedback-Form').serialize();
        var url = 'https://vediverno.ru/contact.php';
        // var _this = $form_vote;
       
        if (send) {
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                beforeSend: function() {
                    send = false;
                },
                complete: function() {

                },
                success: function(obj) {
                    send = true;
                    $('#wf-form-Feedback-Form').next().hide();
                    $('#wf-form-Feedback-Form').next().next().hide();
                    //очишаем все help-block
                    //_this.find('.validate-js').removeClass('is-invalid').addClass('is-valid').next().empty();
                    if (obj['success']) {
                        // if(obj['phone']){
                        //     _this.addClass('d-none').next().removeClass('d-none');
                        // }else{
                        //     _this.addClass('d-none').next().next().removeClass('d-none');
                        // }
                        $('#wf-form-Feedback-Form').hide().next().show()
                        ym(67584547,'reachGoal','zayavka');
gtag('event', 'zayavka', {'event_category': 'zayavka', 'event_action': 'sent'});

                    } else {
                        $('#wf-form-Feedback-Form').next().next().show()
                        //обкат ошибок
                        // $.each(obj['error'], function(key, val) {
                        //     //console.log(obj['error'][key]);
                        //     if (obj['error'][key]) {
                        //         _this.find('#' + key).removeClass('is-valid').addClass('is-invalid').next().html(val);
                        //     }
                        // });
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText + "\r\n" + xhr);
                }
            });
        }
    },
    sendShortContact:function($form){
        console.log($form);
        var data = $form.serialize();
        var url = 'https://vediverno.ru/short.php';
        // var _this = $form_vote;
       
        if (send) {
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                beforeSend: function() {
                    send = false;
                },
                complete: function() {

                },
                success: function(obj) {
                    send = true;
                    $form.next().hide();
                    $form.next().next().hide();
                    //очишаем все help-block
                    //_this.find('.validate-js').removeClass('is-invalid').addClass('is-valid').next().empty();
                    if (obj['success']) {
                        // if(obj['phone']){
                        //     _this.addClass('d-none').next().removeClass('d-none');
                        // }else{
                        //     _this.addClass('d-none').next().next().removeClass('d-none');
                        // }
                        $form.hide().next().show()
                        ym(67584547,'reachGoal','zayavka');
gtag('event', 'zayavka', {'event_category': 'zayavka', 'event_action': 'sent'});

                    } else {
                        $form.next().next().show()
                        //обкат ошибок
                        // $.each(obj['error'], function(key, val) {
                        //     //console.log(obj['error'][key]);
                        //     if (obj['error'][key]) {
                        //         _this.find('#' + key).removeClass('is-valid').addClass('is-invalid').next().html(val);
                        //     }
                        // });
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText + "\r\n" + xhr);
                }
            });
        }
    }

};


/**
 * section init
 */
$(document).ready(function() {
    calculate.init();
   
});


$(window).resize(function() {
   
});
