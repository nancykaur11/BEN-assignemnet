import { useEffect, useState } from 'react';
import { Table, TextInput, Container, Title, Button, Select, Group, Pagination } from '@mantine/core';
import { Link } from 'react-router-dom';
import { fetchLaunches } from '../api/spacexApi';

export default function LaunchesPage() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'success'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10; 

 
  useEffect(() => {
    const getData = async () => {
      const launches = await fetchLaunches();
      setData(launches);
    };
    getData();
  }, []);


  const filteredData = data.filter((launch) =>
    launch.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? launch.success === (filter === 'success') : true)
  );


  const sortedData = filteredData.sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime()
        : new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime();
    } else {
      return sortOrder === 'asc' ? (a.success ? 1 : -1) : (b.success ? 1 : -1);
    }
  });

 
  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Container>
      <Title>SpaceX Launches</Title>

    
      <TextInput
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

  
      <Group mt="md">
        <Select
          label="Filter by success"
          placeholder="Choose"
          value={filter}
          onChange={setFilter}
          data={[
            { value: '', label: 'All' },
            { value: 'success', label: 'Success' },
            { value: 'failure', label: 'Failure' },
          ]}
        />
      </Group>

      <Group mt="md">
        <Button variant="outline" onClick={() => setSortBy('name')}>
          Sort by Name
        </Button>
        <Button variant="outline" onClick={() => setSortBy('date')}>
          Sort by Date
        </Button>
        <Button variant="outline" onClick={() => setSortBy('success')}>
          Sort by Success
        </Button>
        <Button variant="outline" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Toggle Order
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Success</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((launch) => (
            <tr key={launch.id}>
              <td><Link to={`/launch/${launch.id}`}>{launch.name}</Link></td>
              <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
              <td>{launch.success ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        value={page} 
        onChange={setPage} 
        total={Math.ceil(sortedData.length / pageSize)} 
        color="blue"
      />
    </Container>
  );
}
