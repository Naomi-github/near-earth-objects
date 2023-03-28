import { render, fireEvent } from '@testing-library/react';
import AsteroidTracker from './AsteroidTracker';

test('renders the AsteroidTracker component', () => {
  render(<AsteroidTracker />);
});

test('calls the getAsteroids function with the correct start and end dates', () => {
  const { getByPlaceholderText, getByText } = render(<AsteroidTracker />);
  const startDateInput = getByPlaceholderText('start date');
  const endDateInput = getByPlaceholderText('end date');
  const submitButton = getByText('Submit');

  fireEvent.change(startDateInput, { target: { value: '2023-03-01' } });
  fireEvent.change(endDateInput, { target: { value: '2023-03-31' } });
  fireEvent.click(submitButton);

  // assert that the getAsteroids function is called with the correct arguments
  expect(getAsteroids).toHaveBeenCalledWith('2023-03-01', '2023-03-31');
});

test('displays the asteroid data in a table', () => {
  const { getByText } = render(<AsteroidTracker />);
  const asteroidName = getByText('Asteroid 1');
  const estimatedDiameter = getByText('0.1 - 1.0');
  const isPotentiallyHazardous = getByText('No');
  const isSentryObject = getByText('Yes');

  expect(asteroidName).toBeInTheDocument();
  expect(estimatedDiameter).toBeInTheDocument();
  expect(isPotentiallyHazardous).toBeInTheDocument();
  expect(isSentryObject).toBeInTheDocument();
});

test('calls the handleAsteroidClick function when an asteroid is clicked', () => {
  const { getAllByRole } = render(<AsteroidTracker />);
  const asteroidRows = getAllByRole('row');
  const asteroidRow = asteroidRows[1];

  fireEvent.click(asteroidRow);

  // assert that the handleAsteroidClick function is called with the correct argument
  expect(handleAsteroidClick).toHaveBeenCalledWith(1);
});

test('displays the previous and next approaches in a table', () => {
  const approaches = [    {      close_approach_date: '2023-04-01',      relative_velocity: { kilometers_per_hour: '10000' },      miss_distance: { kilometers: '1000' },    },    {      close_approach_date: '2023-03-31',      relative_velocity: { kilometers_per_hour: '9000' },      miss_distance: { kilometers: '2000' },    },  ];

  const { getByText } = render(<>{renderApproaches(approaches)}</>);
  const firstApproachDate = getByText('2023-04-01');
  const secondApproachVelocity = getByText('9000');
  const secondApproachMissDistance = getByText('2000');

  expect(firstApproachDate).toBeInTheDocument();
  expect(secondApproachVelocity).toBeInTheDocument();
  expect(secondApproachMissDistance).toBeInTheDocument();
});



describe('AsteroidTracker', () => {
  test('getPreviousApproaches updates state correctly', () => {
    const testData = [
      {
        close_approach_date: '2023-03-29',
        relative_velocity: { kilometers_per_hour: '10000' },
        miss_distance: { kilometers: '1000' },
      },
      {
        close_approach_date: '2023-03-28',
        relative_velocity: { kilometers_per_hour: '5000' },
        miss_distance: { kilometers: '500' },
      },
      {
        close_approach_date: '2023-03-27',
        relative_velocity: { kilometers_per_hour: '2000' },
        miss_distance: { kilometers: '200' },
      },
      {
        close_approach_date: '2023-03-26',
        relative_velocity: { kilometers_per_hour: '1000' },
        miss_distance: { kilometers: '100' },
      },
      {
        close_approach_date: '2023-03-25',
        relative_velocity: { kilometers_per_hour: '500' },
        miss_distance: { kilometers: '50' },
      },
    ];

    const component = render(<AsteroidTracker />);

    // set initial state with test data
    component.rerender(<AsteroidTracker />);
    component.result.current.setPreviousApproaches(testData);
    component.result.current.setNextApproaches(testData.slice(0, 5).reverse());

    // call getPreviousApproaches
    component.result.current.getPreviousApproaches();

    // check that state was updated correctly
    expect(component.result.current.previousApproaches).toEqual(testData.slice(1));
    expect(component.result.current.nextApproaches).toEqual([testData[0], ...testData.slice(0, 4)]);
  });
});







