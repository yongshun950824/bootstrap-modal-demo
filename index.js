$(document).ready(function () {
  $('#btnPopout').click(function () {
    submit();
  });
});

function submit() {
  $.ajax({
    method: 'GET',
    url: 'https://vodus-api-uat.azurewebsites.net/v1/test/hello-world',
    dataType: 'json',
  })
    .done(function (data) {
      showModal(data);
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
