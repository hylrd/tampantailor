'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('Shirts', [
          {
          name: 'dasi',
          price: 30000,
          url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/14/46442125/46442125_244559d4-1f4b-47c0-ab79-588d15479ef2_650_921.jpg'
        },
        {
          name: 'kaos kaki',
          price: 40000,
          url: 'https://cf.shopee.co.id/file/e677cd11ebee0cbac197a1f46f8ce518'
        },
        {
          name: 'bando',
          price: 200,
          url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-2995189/kids-fashion_kids-fashion-ribbon-bando-anak---maroon_full03.jpg'
        },
        {
          name: 'singlet',
          price: 5000,
          url: 'http://static1.squarespace.com/static/5b46c23eee1759f9cb02062d/5b46e97a8a922da43c8909cc/5bd969280ebbe80db3b189f7/1566944415554/Supporters_Singlet_Mens_White.png'
        },
        {
          name: 'sempak',
          price: 75000,
          url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/5/18/21984348/21984348_12d2176a-a234-4a19-959e-4ef62098b1a9_300_300.jpg'
        },
        {
          name: 'agumon',
          price: 25000,
          url: 'http://dma.wtw-x.net/DMA/DigimonStands/Toei/HQ/Agumon.jpg'
        },
        {
          name: 'tempat pensil',
          price: 30000,
          url: 'https://asset-a.grid.id//crop/0x0:0x0/700x465/photo/2018/11/18/467720645.png'
        },
        {
          name: 'rok',
          price: 2000,
          url: 'https://images.news18.com/ibnlive/uploads/2019/08/Sports-61.png'
        },
        {
          name: 'baju cubitus',
          price: 7000,
          url: 'https://s4.bukalapak.com/img/9521558972/w-1000/kaos_anak_cubitus_original.jpg'
        },
        {
          name: 'kaos tangan',
          price: 30000,
          url: 'https://s0.bukalapak.com/img/5433536213/w-1000/Nu_kaos_tangan_musim_dingin_winter_gloves_sarung_tangan_musi.jpg'
        }

      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Shirts', null, {});
  }
};
