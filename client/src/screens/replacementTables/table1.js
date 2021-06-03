import * as React from 'react';
import { DataTable } from 'react-native-paper';

const itemsPerPage = 12;
const items = [{
  title: 'Bulvė',
  calories: '75 g',
  fat: 15,
}, {
  title: 'Duona',
  calories: '30 g',
  fat: 15,
}, {
  title: 'Batonas',
  calories: '30 g',
  fat: 15,
}, {
  title: 'Kruopų košė',
  calories: '0,5 stiklinės',
  fat: 15,
}, {
  title: 'Virti makaronai',
  calories: '0,5 stiklinės',
  fat: 15,
}, {
  title: 'Bulvių košė',
  calories: '0,5 stiklinės',
  fat: 15,
}, {
  title: 'Miltai',
  calories: '2 valg. šaukštai',
  fat: 15,
}, {
  title: 'Sausi pusryčiai',
  calories: '2 valg. šaukštai',
  fat: 15,
}, {
  title: 'Virti žirniai',
  calories: '1/3 stiklinės',
  fat: 15,
}, {
  title: 'Virtos pupos',
  calories: '1/3 stiklinės',
  fat: 15,
}, {
  title: 'Obuolys',
  calories: '150 g',
  fat: 15,
}, {
  title: 'Kriaušė',
  calories: '100 g',
  fat: 15,
}, {
  title: 'Apelsinas',
  calories: '180 g',
  fat: 15,
}, {
  title: 'Kivis',
  calories: '200 g',
  fat: 15,
}, {
  title: 'Bananas',
  calories: '70 g',
  fat: 15,
}, {
  title: 'Vaisių sultys',
  calories: '0,5 stiklinės',
  fat: 15,
}, {
  title: 'Žalios daržovės',
  calories: '1 stiklinė',
  fat: 5,
}, {
  title: 'Virtos daržovės',
  calories: '0,5 stiklinės',
  fat: 5,
}, {
  title: 'Grybai',
  calories: '1 stiklinė',
  fat: 5,
}]

const pageCount = Math.ceil(items.length / itemsPerPage);

const MyComponent = () => {
  const [page, setPage] = React.useState(0);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Produktai</DataTable.Title>
        <DataTable.Title numeric>Kiekis</DataTable.Title>
        <DataTable.Title numeric>Angliavandeniai</DataTable.Title>
      </DataTable.Header>
      {
        items
          .filter((el, i) => i >= page * itemsPerPage && i < (page + 1) * itemsPerPage)
          .map(({ title, calories, fat }) => (
            <DataTable.Row key={title}>
              <DataTable.Cell>{title}</DataTable.Cell>
              <DataTable.Cell numeric>{calories}</DataTable.Cell>
              <DataTable.Cell numeric>{fat}</DataTable.Cell>
            </DataTable.Row>
          ))
      }

      <DataTable.Pagination
        page={page}
        numberOfPages={pageCount}
        onPageChange={(page) => setPage(page)}
        label={`page ${page + 1} of ${pageCount}`}
        itemsPerPage={itemsPerPage}
        showFastPagination
      />
    </DataTable>
  );
}

export default MyComponent;