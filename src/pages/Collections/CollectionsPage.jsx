import ProductList from '../../components/Products/ProductList';

export default function CollectionsPage() {
  return (
    <ProductList
      title="All Collections"
      seo={{
        title: 'All Collections | CoreX Nutrition',
        description:
          'Browse our complete collection of premium sports nutrition supplements and fitness products. Find the perfect supplements to support your fitness goals.',
        keywords:
          'sports nutrition, supplements, protein powder, pre-workout, fitness products, CoreX Nutrition',
      }}
      bannerImage={null}
      bannerAlt="All products banner"
    />
  );
}
