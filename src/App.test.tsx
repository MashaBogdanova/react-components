import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pagination from "./components/pagination/Pagination";

describe('Accordion test', () => {
  test('Should show title', () => {
    render(
      <Pagination prevUrl="test-prev-url" nextUrl="test-next-url" currentPage={1} onPageChange={()=> {}}/>
    );
    expect(screen.getByTestId('pagination')).toBeDefined();
    expect(true).toBe(true);
  });
});
