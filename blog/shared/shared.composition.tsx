import React from 'react';
import { shared } from './shared';

export function ReturnsCorrectValue() {
  return <div>{shared()}</div>;
}
