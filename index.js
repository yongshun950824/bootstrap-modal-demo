// Import stylesheets
import './style.css';

$(document).ready(function () {
  $('#btnPopout').click(function () {
    console.log('1');

    var data = {
      successful: false,
      code: 0,
      message: 'Create a popup modal with the tags and properties given',
      data: [
        {
          TextColor: '#222',
          BackgroundColor: '#ff0000',
          Message: 'This is a sample title 1',
          Tag: 'h1',
        },
        {
          TextColor: '#fff',
          BackgroundColor: '#ff0000',
          Message: 'This is a sample title 2',
          Tag: 'h2',
        },
        {
          TextColor: '#000',
          BackgroundColor: '#ff0000',
          Message: 'This is a sample title 2',
          Tag: 'p',
        },
      ],
    };

    showModal(data);
  });
});

function submit() {
  $.ajax({
    method: 'GET',
    url: 'https://vodus-api-uat.azurewebsites.net/v1/test/hello-world',
    dataType: 'json',
  })
    .done(function (data) {
      console.log(data);
    })
    .fail(function (err) {
      console.log('error:', err);
    });
}

function showModal(data) {
  // Set title to modal-title
  $('#modal .modal-dialog .modal-content .modal-header .modal-title').html(
    data.message
  );

  // Create inner HTML template for modal-body
  let parentElem = $(`<div"></div>`);
  for (let item of data.data) {
    let elem = $(document.createElement(item.Tag));

    elem.text(item.Message);
    elem.css('color', item.TextColor);
    elem.css('background-color', item.BackgroundColor);

    elem.appendTo(parentElem);
  }

  // Set inner HTML for modal-body
  $('#modal .modal-dialog .modal-content .modal-body').html(parentElem);

  // Show modal
  $('#modal').modal('show');
}
