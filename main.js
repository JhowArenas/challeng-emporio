
let apijson = [];

const fetchData = function (fq = null) {
  $('#products-list').html('Loading...');
  const url = 'https://emporiodev.com/general-support-develop/BRA/edc/qaemporiodacerveja/proxy/'
  let params = {
    targetUrl: 'https://qaemporiodacerveja.vtexcommercestable.com.br/api/catalog_system/pub/products/search',
    _from: 1,
    _to: 12
  }

  if (fq) {
    params.fq = fq
  }
  // console.log(`fq`, fq)
  // console.log(` params.fq = fq`, params.fq)
  // console.log(params)

  $.ajax({
    url: url,
    data: params,
    headers: {
      'x-api-key': '456asd852wsx951qsc753esz'
    },
    success: (data) => {
      apijson = data;
      console.log('data', data)
      $('#products-list').html('');
      const productCardTemplate = $('#product-card').html();
      $.each(data, (key, product) => {
        let card = $(productCardTemplate);
        let imageUrl = product.items[0].images[0].imageUrl;
        const imageId = product.items[0].images[0].imageId;
        card.find('.product-card-wishlist').attr('data-id', product.productId)
        imageUrl = imageUrl.replace(imageId, `${imageId}-150-150`);
        card.find('.product__image img').attr('src', imageUrl);
        card.find('.product__title h4').html(product.productTitle);
        card.find('.product__title a').attr('href', product.link);
        card.find('#product__price-value').html(product.items[0].sellers[0].Price)

        $('#products-list').append(card);

      });
    }
  });
};

const openwishlist = function () {
  $('.wishlist-content').addClass('show');
};

const closewishlist = function () {
  $('.wishlist-content').removeClass('show')
};

const bindActions = function () {
  $(document).on('click', '.product-card-wishlist', function () {
    const id = $(this).attr('data-id');
    $(this).css('display', 'none')
    console.log($(this))
    $(this).parent('.product-card-delete').css('display', 'block')
    let prod = apijson.find(c => c.productId == id)
    console.log(prod)

    let imageUrl = prod.items[0].images[0].imageUrl;
    const imageId = prod.items[0].images[0].imageId;
    let productCardTmplt = $('#product-card').html();
    let card = $(productCardTmplt);
    imageUrl = imageUrl.replace(imageId, `${imageId}-150-150`);
    $(card).find('.product__image img').attr('src', imageUrl);
    $(card).find('.product__title h4').html(prod.productTitle);
    $(card).find('.product__title a').attr('href', prod.link);
    $(card).find('#product__price-value').html(prod.items[0].sellers[0].Price)
    console.log(card)
    addToWishlist(card);

  });
  $(document).on('click', '.product .product-card-delete', function () {
    $(this).closest('.product').remove()
  });
  $('#wishlist-button').click(openwishlist);
  $('#close-wishlist-button').click(closewishlist)
  $('#beer-category-button').click(fetchData.bind(null, 'C:/3/'))
  $('#accessories-category-button').click(fetchData.bind(null, 'C:/5/'))
  $('#home-button').click(fetchData.bind(null, null))

};

const addToWishlist = function (node) {
  $('#wishlist-products').append(node);
  const counter = $('#wishlist-products').children().length;
  $('#wishlist-button span').html(counter);
};

// const mockData = function () {
//   let productCardTemplate = $('#product-card').html();
//   addToWishlist($(productCardTemplate));
// };


(function () {
  fetchData();
  bindActions();
})()