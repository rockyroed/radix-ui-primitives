import * as Select from '@radix-ui/react-select';
import { render, fireEvent } from '@testing-library/react';

describe('Select', () => {
  const renderSelect = (enableFormControl?: boolean) => {
    let changeCount = 0;
    const { getByTestId } = render(
      <form>
        <Select.Root enableFormControl={enableFormControl} onValueChange={() => changeCount++}>
          <Select.Trigger data-testid="trigger">Label</Select.Trigger>
          <Select.Portal>
            <Select.Content>
              <Select.Item value="1" data-testid="option" />
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </form>
    );

    fireEvent.click(getByTestId('trigger'));
    fireEvent.click(getByTestId('option'));

    return changeCount;
  };

  it('fires once if enableFormControl is false', () => {
    expect(renderSelect(false)).toBe(1);
  });

  it('fires twice if enableFormControl is true', () => {
    expect(renderSelect(true)).toBe(2);
  });

  it('fires twice if enableFormControl is not set', () => {
    expect(renderSelect()).toBe(2);
  });
});
