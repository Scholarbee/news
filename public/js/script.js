let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
  let newIngredients = ingredeintDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});



$(function () {

  if ($('textarea#ta').length) {
      CKEDITOR.replace('ta');
  }

  $('a.confirmDeletion').on('click', function () {
      if (!confirm('Confirm deletion'))
          return false;
  });

  if ($("[data-fancybox]").length) {
      $("[data-fancybox]").fancybox();
  }

});