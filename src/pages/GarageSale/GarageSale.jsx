import ProductList from '../../components/Products/ProductList';
import garageSaleImage from '../../assets/garagesale/garagesale-banner.webp';

export default function GarageSale() {
  // filterFn returns true when product is on sale
  const saleFilter = (p) => !!p.onSale || Number(p.sale || 0) > 0;

  return (
    <>
      <ProductList
        title="Garage Sale"
        filterFn={saleFilter}
        saleOnly={true}
        seo={{
          title: 'Garage Sale | CoreX Nutrition',
          description:
            'Discover amazing deals on premium sports nutrition supplements. Find discounted protein powders, pre-workouts, and fitness products.',
          keywords:
            'garage sale, deals, supplements, CoreX, discount, sale, protein powder, pre-workout, fitness products',
        }}
        bannerImage={garageSaleImage}
        bannerAlt="Garage Sale promotional banner"
      />
    </>
  );
}
