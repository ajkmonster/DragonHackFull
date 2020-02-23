$(document).ready(() => {
    $('#input').on("change", (evt) => {
        let text = $('#input').val();
        $.get('/shout', {text:text})
            .done((data) => {
                console.log(data);
                $('#results').prepend('<li>' +data['result'] + '</li>');
                $('#input').val('');
            })
            .fail((xhr) => {
                alert('Problem contacting server');
                console.log(xhr);
            });
    });

});