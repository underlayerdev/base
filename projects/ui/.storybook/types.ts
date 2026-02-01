import { InputSignal } from '@angular/core';
import { type Meta as OriginalMeta, type StoryObj as OriginalStoryObj } from '@storybook/angular';

/**
 * Utility type to convert InputSignal types to their underlying types for Storybook args
 */
export type InputSignalToValue<T> = T extends InputSignal<infer U> ? U : T;

/**
 * Recursively converts all InputSignal properties in an object to their underlying types
 */
export type ConvertInputSignalsToValues<T> = {
  [K in keyof T]: InputSignalToValue<T[K]>;
};

/**
 * Custom Meta type that automatically converts InputSignal args to their underlying types
 */
export type Meta<TComponent = {}> = Omit<OriginalMeta<TComponent>, 'args'> & {
  args?: Partial<ConvertInputSignalsToValues<TComponent>>;
};

/**
 * Custom StoryObj type that automatically converts InputSignal args to their underlying types
 */
export type StoryObj<TComponent = {}> = Omit<OriginalStoryObj<TComponent>, 'args'> & {
  args?: Partial<ConvertInputSignalsToValues<TComponent>>;
};
