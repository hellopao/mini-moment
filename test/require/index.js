requirejs.config({
    baseUrl: '',
    paths: {
        Moment: '../../dist/moment'
    }
});

requirejs(['Moment'], function (Moment) {
    var dateStr = new Moment().format();
    document.querySelector('#today').innerHTML = dateStr;
});