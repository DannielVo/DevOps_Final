document.addEventListener('DOMContentLoaded', function () {
  const btnAdd = document.getElementById('btn-add');
  const modalEl = document.getElementById('productModal');
  const productForm = document.getElementById('product-form');
  const modal = new bootstrap.Modal(modalEl);

  // Code feature UI logic (standby)
  function openModalForAdd() {
    console.warn("Feature not implemented");
  }

  function openModalForEdit(row) {
    console.warn("Feature not implemented");
  }

  btnAdd.addEventListener('click', function () {
    alert("Feature not implemented");
  });

  document.getElementById('product-table')
    .addEventListener('click', function () {
      alert("Feature not implemented");
    });

  productForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Feature not implemented");
  });
});
