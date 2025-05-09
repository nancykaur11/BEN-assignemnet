import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, Title, Text, Loader, Container, Button, Image, Grid } from '@mantine/core';
import { fetchLaunchById } from '../api/spacexApi';

export default function LaunchDetailPage() {
  const { id } = useParams();
  const [launch, setLaunch] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchLaunchById(id)
        .then((data) => {
          setLaunch(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load launch details');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Container size="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Text color="red">{error}</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" style={{ marginTop: '20px' }}>
      <Card shadow="sm" padding="lg">
        <Title order={2}>{launch.name}</Title>
        <Text size="md" color="dimmed">
          Launch Date: {new Date(launch.date_utc).toLocaleString()}
        </Text>
        <Text size="sm" color="dimmed">
          Success: {launch.success ? 'Yes' : 'No'}
        </Text>
        <Text size="sm" color="dimmed">
          Details: {launch.details || 'No details available'}
        </Text>
      
        {launch.links.patch && launch.links.patch.small && (
          <Image src={launch.links.patch.small} alt="Launch Patch" width={200} height={200} />
        )}

        <Grid mt="md">
          <Grid.Col sm={6} md={4}>
            <Card shadow="sm" padding="lg">
              <Title order={3}>Rocket</Title>
              <Text>{launch.rocket.name}</Text>
            </Card>
          </Grid.Col>

          <Grid.Col sm={6} md={4}>
            <Card shadow="sm" padding="lg">
              <Title order={3}>Flight Number</Title>
              <Text>{launch.flight_number}</Text>
            </Card>
          </Grid.Col>

          <Grid.Col sm={6} md={4}>
            <Card shadow="sm" padding="lg">
              <Title order={3}>Rocket Type</Title>
              <Text>{launch.rocket.type}</Text>
            </Card>
          </Grid.Col>
        </Grid>

        <Button variant="outline" color="blue" style={{ marginTop: '20px' }} onClick={() => window.history.back()}>
          Back to Launches
        </Button>
      </Card>
    </Container>
  );
}
