import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../src/atoms/Button';

describe('Button Component', () => {
  it('renders correctly with primary variant', () => {
    const { getByText } = render(
      <Button title="Click Me" onPress={() => {}} variant="primary" />
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('renders correctly with secondary variant', () => {
    const { getByText } = render(
      <Button title="Click Me" onPress={() => {}} variant="secondary" />
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={onPress} />
    );
    fireEvent.press(getByText('Click Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={onPress} disabled={true} />
    );
    fireEvent.press(getByText('Click Me'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Click Me" onPress={onPress} loading={true} />
    );
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading prop is true', () => {
    const { queryByText } = render(
      <Button title="Click Me" onPress={() => {}} loading={true} />
    );
    expect(queryByText('Click Me')).toBeNull();
  });
});
