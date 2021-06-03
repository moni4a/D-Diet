import * as React from 'react';
import { DataTable } from 'react-native-paper';

const itemsPerPage = 12;
const items = [{
  title: 'Virta mėsa',
  calories: '30 g',
  fat: 0,
}, {
  title: 'Žuvis',
  calories: '50 g',
  fat: 0,
}, {
  title: 'Kiaušinis',
  calories: '1 vienetas',
  fat: 0,
}, {
  title: 'Varškė 9%',
  calories: '50 g',
  fat: 0,
}, {
  title: 'Virta dešra',
  calories: '50 g',
  fat: 0,
}, {
  title: 'Rūkyta dešra',
  calories: '25 g',
  fat: 0,
}, {
  title: 'Sūris',
  calories: '25 g',
  fat: 0,
}, {
  title: 'Riešutai',
  calories: '1  valg. šaukštas',
  fat: 0,
}, {
  title: 'Lašiniai',
  calories: '5 g',
  fat: 0,
},]

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